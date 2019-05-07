const request = require("supertest");
const UserModel = require("../../../models/user");
const bcrypt = require("bcrypt");
const pwdPlainTxt = "testapp";
const userObj = {
  email: "test@test.com",
  password: pwdPlainTxt,
  firstName: "abc",
  lastName: "cde",
  usertype: "basic"
};
describe("/v1/users/signup", () => {
  let server;
  beforeEach(() => {
    server = require("../../../../index");
  });
  it("sign up successful with all the details", async () => {
    const password = await bcrypt.hash(pwdPlainTxt, 10);
    userObj.password = password;
    const res = await request(server)
      .post("/v1/users/signup")
      .send(userObj);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id");
  });

  it("throws validation error if user is already registered.", async () => {
    await new UserModel.user(userObj).save();
    const res = await request(server)
      .post("/v1/users/signup")
      .send(userObj);
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
    await UserModel.user.remove({});
  });

  it("throws Joi validation error if user details are not proper.", async () => {
    userObj.firstName = "te";
    const res = await request(server)
      .post("/v1/users/signup")
      .send(userObj);
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
    await UserModel.user.remove({});
  });

  afterEach(async () => {
    userObj.password = pwdPlainTxt;
    userObj.firstName = "abc";
    await UserModel.user.remove({});
    server.close();
  });
});

describe("v1/users/login", () => {
  let server;
  beforeEach(() => {
    server = require("../../../../index");
  });
  it("signin with valid credentials returns JWT token", async () => {
    await new UserModel.user(userObj).save();
    const loginDtls = { email: userObj.email, password: userObj.password };
    const res = await request(server)
      .post("/v1/users/login")
      .send(loginDtls);
    expect(res.status).toBe(200);
    expect(res.body).not.toBeNull();
  });

  it("signin with invalid credentials returns Validation Error", async () => {
    await new UserModel.user(userObj).save();
    const loginDtls = { email: userObj.email, password: "test" };
    const res = await request(server)
      .post("/v1/users/login")
      .send(loginDtls);
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
  });

  it("signin with non-existing email returs validation errors", async () => {
    await new UserModel.user(userObj).save();
    const loginDtls = { email: "test1@test.com", password: "root" };
    const res = await request(server)
      .post("/v1/users/login")
      .send(loginDtls);
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
  });

  it("throws 404 for invalid route", async () => {
    const res = await request(server).get("/v1/users/invalid");
    expect(res.status).toBe(404);
  });

  afterEach(async () => {
    await UserModel.user.remove({});
    server.close();
    userObj.firstName = "abc";
  });
});
