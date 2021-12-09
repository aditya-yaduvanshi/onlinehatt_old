const {Accounts} = require("./views"),
  {redisClient} = require("../../dbconfig"),
  {Validate, Encrypt, Verify} = require("./utils");

class Query {
  static async signin(parent, args) {
    if (
      (!(await Validate.email(args.email)) ||
        !(await Validate.phone(args.phone)) ||
        !(await Validate.username(args.username))) &&
      !(await Validate.password(args.password))
    )
      return {
        status: 400,
        msg: "Invalid credentials.",
      };

    let acc = await Accounts.read(args);
    if (!acc) return {status: 400, msg: "Invalid credentials."};
    else if (acc == 2) return {status: 500, msg: "Request cannot process!"};
    if (!acc.verified || !acc.active)
      return {status: 403, msg: "Account not active or verified!"};
    let access = await Encrypt.createAccess(acc.identifier),
      refresh = await Encrypt.createRefresh(acc.identifier),
      stored = await redisClient.hmset(`signin:${acc.identifier}`, {
        ID: acc.identifier,
        access,
        refresh,
      });
    if (!stored)
      return {
        status: 500,
        msg: "Request cannot process!",
      };
    return {
      status: 200,
      msg: "Signed In!",
      access,
      refresh,
      user: {
        id: acc.id,
        name: acc.name,
        avatar: acc.avatar,
        identifier: acc.identifier,
        username: acc.username,
        merchant: acc.merchant,
      },
    };
  }

  static async getOtp(parent, args) {}

  static async getRefresh(parent, args) {
    let token = args.split(" ")[1];
    if (!token)
      return {
        status: 400,
        msg: "Invalid credentials",
      };
    try {
      let valid = await Encrypt.verifyRefresh(token);
      if (!valid)
        return {
          status: 400,
          msg: "Invalid credentials",
        };
      let same = await redisClient.hget(`signin:${valid.cred}`, "refresh");
      if (same !== token)
        return {
          status: 400,
          msg: "Invalid credentials",
        };
      let access = await Encrypt.createAccess(valid.cred),
        refresh = await Encrypt.createRefresh(valid.cred),
        stored = await redisClient.hmset(`signin:${valid.cred}`, {
          access,
          refresh,
        });
      if (!stored)
        return {
          status: 502,
          msg: "Something went wrong! Please try later.",
        };
      return {
        status: 200,
        msg: "Signedin successfully!",
        access,
        refresh,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        msg: "Something went wrong! Please try again later.",
      };
    }
  }
}

class Mutation {
  static async register(parent, args) {
    if (
      (!(await Validate.phone(args.phone)) &&
        !(await Validate.email(args.email))) ||
      !(await Validate.password(args.password)) ||
      args.password !== args.password2
    )
      return {status: 400, msg: "Invalid credentials!"};
    let user = await redisClient.hgetall(
      `user:${args.email ? args.email : args.phone}`
    );
    if (!user || user.verified !== "true")
      return {
        status: 403,
        msg: "Invalid credentials or account not verified!",
      };
    let ok = await Accounts.register(args);
    if (!ok) return {status: 400, msg: "Invalid credentials!"};
    else if (ok == 2)
      return {
        status: 500,
        msg: "Request cannot be processed! Please try again later.",
      };
    else {
      await redisClient.hdel(
        `user:${data.email ? data.email : data.phone}`,
        "Id",
        "otp",
        "verified"
      );
      return {
        status: 201,
        msg: "Registered!",
      };
    }
  }
}

module.exports = {
  Query,
  Mutation,
};
