const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
  avatar: String,
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  identifier: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  emails: [String],
  phones: [String],
  verified: false,
  active: false,
  merchant: {
    type: Boolean,
    default: false,
  }
});

const MerchantSchema = mongoose.Schema({
  accountId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
  },
  aadhar: {
    type: Number,
    required: true,
    unique: true,
  },
  pan: {
    type: Number,
    required: true,
    unique: true,
  },
  bankAccNo: {
    type: String,
    required: true
  },
  bankIfsc: {
    type: String,
    required: true
  },
  bank: {
    type: String,
    required: true
  },
  eligible: false,
});

module.exports = {
  AccountSchema: mongoose.model("accounts", AccountSchema),
};
