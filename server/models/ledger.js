const mongoose = require("mongoose");
const Joi = require("joi");
require("joi-objectid")(Joi);

const LedgerSchema = new mongoose.Schema({
  description: {
    type: "String",
    required: true,
    maxlength: 100,
    trim: true
  },
  type: {
    type: "String",
    enum: ["Income", "Expense", "Transfer"],
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  date: {
    type: "Date",
    required: true
  },
  amount: {
    type: "Number",
    required: true
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: true
  },
  addedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  note: {
    type: "String",
    maxlength: 255
  }
});

const validate = ledger => {
  const ledgerSchema = {
    description: Joi.string()
      .required()
      .max(100),
    category: Joi.ObjectId().required(),
    wallet: Joi.ObjectId().required(),
    date: Joi.date().required(),
    amount: Joi.number().required(),
    addedby: Joi.ObjectId().required(),
    Note: Joi.string.maxlength(255),
    type: Joi.string.required().valid("Income", "Expense", "Transfer")
  };
  const { error } = Joi.validate(ledger, ledgerSchema);
  return error;
};

const LedgerModel = new mongoose.model("Category", LedgerSchema);

module.exports = {
  Ledger: LedgerModel,
  validate: validate
};
