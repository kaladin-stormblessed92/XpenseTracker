const mongoose = require("mongoose");
const Joi = require("joi");
require("joi-objectid")(Joi);

const WalletSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
    unique: true,
    uppercase: true,
    minlength: 3,
    maxlength: 30
  },
  createdOn: {
    type: "Date",
    default: Date.now
  },
  initialbalance: {
    type: "Number",
    default: 0,
    required: true
  },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const WalletModel = new mongoose.model("Wallet", WalletSchema);

const validate = wallet => {
  const walletSchema = {
    name: Joi.string()
      .required()
      .min(3)
      .max(30),
    initialbalance: Joi.number().required(),
    createdby: Joi.ObjectId().required()
  };
  const { error } = Joi.validate(ledger, ledgerSchema);
  return error;
};

module.exports = {
  Wallet: WalletModel,
  validate: validate
};
