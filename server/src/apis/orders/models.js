const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  product: mongoose.Types.ObjectId,
  user: mongoose.Types.ObjectId,
  quantity: Number,
});

module.exports = {OrderSchema: mongoose.model("Orders", OrderSchema)};
