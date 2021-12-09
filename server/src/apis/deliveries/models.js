const mongoose = require("mongoose");

const DeliverySchema = mongoose.Schema({
  order: mongoose.Types.ObjectId,
  status: String,
});

module.exports = {DeliverySchema: mongoose.model("Deliveries", DeliverySchema)};
