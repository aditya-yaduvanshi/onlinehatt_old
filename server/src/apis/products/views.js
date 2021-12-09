const {ProductSchema, UserPrefSchema} = require("./models");

class Products {
  static async lists(data) {
    //
  }

  static async single(data) {
    //
  }

  static async create(data) {
    try {
      let product = ProductSchema({});
      product.save();
    } catch (err) {}
  }

  static async update(data) {
    //
  }

  static async delete(data) {
    //
  }
}

module.exports = {Products};
