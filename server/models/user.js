const mongoose = require("mongoose");
const joi = require("joi");
const bcrypt = require("bcrypt");
require("joi-objectid")(joi);
const UserSchema = new mongoose.Schema({
  password: {
    type: "String",
    required: true
  },
  usertype: {
    type: "String",
    enum: ["basic", "plus", "premium"],
    default: "basic"
  },
  firstName: {
    type: "String",
    required: true,
    minlength: 3,
    maxlength: 50
  },
  lastName: {
    type: "String",
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: "String",
    required: true
  },
  registrationDate: {
    type: "Date",
    default: Date.now
  }
});

UserSchema.pre("save", async function(next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

//We'll use this later on to make sure that the user trying to log in has the correct credentials
UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const userModel = new mongoose.model("User", UserSchema);

const validate = function(user) {
  const userSchema = {
    _id: joi.objectId(),
    password: joi.string().required(),
    usertype: joi.string().required(),
    firstName: joi
      .string()
      .min(3)
      .max(50)
      .required(),
    lastName: joi
      .string()
      .min(3)
      .max(50)
      .required(),
    email: joi.email().required()
  };

  const { errors } = joi.validate(userSchema, user);
  return errors;
};

module.exports = {
  user: userModel,
  validateUser: validate
};
