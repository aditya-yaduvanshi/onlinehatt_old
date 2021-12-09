const {HattSchema, EmployeeSchema} = require("./models");

class Hatts {
  static async lists(data) {
    try {
      let hatts = await HattSchema.find();
      return hatts;
    } catch(err) {
      console.log(err);
      return 0;
    }
  }

  static async single(data) {
    try {
      let hatt = await HattSchema.findOne({...data});
      return hatt;
    } catch(err) {
      console.log(err);
      return 0;
    }
  }

  static async create(data) {
    try {
      let hatt = await HattSchema({
        ...data
      }).save();
      return 1;
    } catch(err){
      console.log(err)
      return 0;
    }
  }

  static async update(data) {
    try {
      let ok = await HattSchema.findOneAndUpdate({hattUrl: data.hattUrl},{...data});
      if(ok)
      return 1;
    } catch(err){
      console.log(err);
      return 0;
    }
  }

  static async delete(data) {
    //
  }
}

class Employees {
  static async lists(data) {
    //
  }

  static async single(data) {
    //
  }

  static async create(data) {
    //
  }

  static async update(data) {
    //
  }

  static async delete(data) {
    //
  }
}

module.exports = {
  Hatts,
  Employees,
};
