const mongoose = require("mongoose");

const HattSchema = mongoose.Schema({
  mainPic: Buffer,
  pictures: [Buffer],
  name: String,
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "Accounts",
    required: true,
  },
  hattType: String,
  openTime: Date,
  closeTime: Date,
  started: Date,
  locality: String,
  area: String,
  city: String,
  state: String,
  country: String,
  joined: {
    type: Date,
    default: new Date(),
  },
});

const EmployeeSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Accounts",
    required: true,
  },
  hatt: {
    type: mongoose.Types.ObjectId,
    ref: "Hatts",
    required: true,
  },
  since: {
    type: Date,
    default: new Date(),
  },
});

module.exports = {
  HattSchema: mongoose.model("Hatts", HattSchema),
  EmployeeSchema: mongoose.model("Employees", EmployeeSchema),
};
