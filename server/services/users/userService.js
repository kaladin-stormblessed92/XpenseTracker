const passport = require("passport");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user");
const signup = (req, res, next) => {
  const userObj = req.body;
  createUser(userObj, (err, user) => {
    if (err) {
      return next(err);
    }
    res.send(user);
  });
};

const login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("Username or Password is not found");
        return next(error);
      }
      req.login(user, { session: false }, async error => {
        if (error) return next(error);
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "top_secret");
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const createUser = async (userObj, done) => {
  try {
    const error = UserModel.validateUser(userObj);
    if (error) {
      return done(error.details[0].message);
    }
    let user = new UserModel.user();
    const checkUser = await UserModel.user.findOne({ email: userObj.email });
    if (checkUser) return done(new Error("User is already registered."));

    user.email = userObj.email;
    user.password = userObj.password;
    user.usertype = userObj.usertype;
    user.firstName = userObj.firstName;
    user.lastName = userObj.lastName;

    user = await user.save(function(err, user) {
      if (err) {
        throw err;
      }
      return done(null, { _id: user._id, email: user.email });
    });

    //Send the user information to the next middleware
  } catch (error) {
    done(error);
  }
};

const loginUser = async (email, password, done) => {
  try {
    const user = await UserModel.user.findOne({ email });
    if (!user) {
      return done(null, false, { message: "User not found" });
    }
    const validate = await user.isValidPassword(password);
    if (!validate) {
      return done(null, false, { message: "Wrong Password" });
    }
    return done(null, user, { message: "Logged in Successfully" });
  } catch (error) {
    return done(error);
  }
};

module.exports = {
  signup: signup,
  login: login,
  loginUser: loginUser,
  createUser: createUser
};
