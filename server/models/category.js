const mongoose = require("mongoose");
const Joi = require("joi");
require("joi-objectid")(Joi);
const CategorySchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true
  },
  type: {
    type: "String",
    required: true,
    enum: ["Income", "Expense", "Transfer"]
  },
  createdon: {
    type: "Date",
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  icon: {
    type: "String",
    default: "icon-eye",
    maxlength: 20
  }
});

const validate = category => {
  const categorySchema = {
    name: Joi.string()
      .required()
      .min(3)
      .max(20),
    createdBy: Joi.ObjectId(),
    icon: Joi.string.maxlength(20)
  };
  const { error } = Joi.validate(category, categorySchema);
  return error;
};

const CategoryModel = new mongoose.model("Category", CategorySchema);

module.exports = {
  Category: CategoryModel,
  validate: validate
};
