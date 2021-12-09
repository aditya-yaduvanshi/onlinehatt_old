const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: String,
  mainPic: Buffer,
  pictures: [Buffer],
  category: String,
  currency: String,
  price: Number,
  stock: Number,
  hatt: {
    type: mongoose.Types.ObjectId,
    ref: "Hatts",
  },
  description: String,
  specs: String,
  manufacture: {
    type: Date,
    default: new Date(),
  },
  expiry: {
    type: Date,
    default: new Date(),
  },
  warranty: Number,
  guarantee: Number,
  slug: {
    type: String,
    unique: true
  },
});

const UserPrefSchema = mongoose.Schema({
  user: mongoose.Types.ObjectId,
  category: [String],
  productSeen: [mongoose.Types.ObjectId],
});


module.exports = {
  ProductSchema: mongoose.model("Products", ProductSchema),
  UserPrefSchema: mongoose.model("Preference", UserPrefSchema)
};
