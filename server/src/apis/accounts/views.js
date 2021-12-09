const {AccountSchema} = require("./models"),
  {Validate, Encrypt, Verify} = require("./utils"),
  {redisClient} = require("../../dbconfig");

class Accounts {
  static async create(data) {
    try {
      if (
        (!(await Validate.phone(data.phone)) &&
          !(await Validate.email(data.email))) ||
        !(await Validate.password(data.password)) ||
        data.password !== data.password2
      )
        return 0;
      let hash = await Encrypt.createHash(data.password),
        acc = await AccountSchema({
          identifier: data.Id,
          name: data.name,
          password: hash,
          [data.email ? emails : phones]: [
            data.email ? data.email : data.phone,
          ],
          verified: true,
          active: true,
        }).save();
      if (acc) return 1;
    } catch (err) {
      console.log(err);
      return 2;
    }
  }

  static async read(data) {
    try {
      if (
        (!(await Validate.email(data.email)) ||
          !(await Validate.phone(data.phone)) ||
          !(await Validate.username(data.username))) &&
        !(await Validate.password(data.password))
      )
        return 0;
      let acc = await AccountSchema.findOne({
        identifier: data.email ? data.email : data.phone,
        username: data.username,
      });
      if (!acc) return 0;
      let hash = acc.password,
        match = await Encrypt.verifyHash(data.password, hash);
      if (!match) return 0;
      return {
        id: acc._id,
        name: acc.name,
        avatar: acc.avatar,
        identifier: acc.identifier,
        username: acc.username,
        merchant: acc.merchant,
        verified: acc.verified,
        active: acc.active
      };
    } catch (err) {
      console.log(err);
      return 2;
    }
  }

  static async reset(data) {
    if (
      data.password !== data.password2 ||
      !(await Validate.password(data.password)) ||
      (!(await Validate.email(data.email)) &&
        !(await Validate.phone(data.phone)))
    )
      return {
        status: 400,
        msg: "Invalid credentials.",
      };
    try {
      let user = await redisClient.hgetall(
        `user:${data.email ? data.email : data.phone}`
      );
      if (!user || user[2])
        return {
          status: 400,
          msg: "You either kept window idle for long time or otp not verified!",
        };
      await redisClient.hdel(
        `user:${data.email ? data.email : data.phone}`,
        "Id",
        "otp",
        "verified"
      );
      let hash = await Encrypt.createHash(data.password),
        acc = await AccountSchema.findOneAndUpdate(
          {identifier: data.email ? data.email : data.phone},
          {password: hash}
        );
      if (acc)
        return {
          status: 205,
          msg: "Password resetted successfully!",
        };
    } catch (err) {
      return {
        status: 500,
        msg: "Something went wrong! Please try later.",
      };
    }
  }

  static async delete(data) {
    try {
      let acc = await AccountSchema.findOneAndDelete({
        [data.email ? email : phone]: data.email ? data.email : data.phone,
      });
      if (acc)
        return {
          status: 205,
          msg: "Account deleted successfully!",
        };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        msg: "Something went wrong! Please try later.",
      };
    }
  }
}

class Otps {
  static async send(data) {
    if (
      !(await Validate.phone(data.phone)) &&
      !(await Validate.email(data.email))
    ) {
      return {
        status: 400,
        msg: "Invalid credentials.",
      };
    }
    try {
      let otp = await Encrypt.createOtp(),
        sent,
        stored = await redisClient.hmset(
          `user:${data.phone ? data.phone : data.email}`,
          {Id: data.phone ? data.phone : data.email, otp, verified: false}
        );
      await redisClient.expire(
        `user:${data.phone ? data.phone : data.email}`,
        data.for === "reset-password" ? 60 * 5 : 60 * 60 * 60
      );
      if (!stored) return {status: 502, msg: "Cannot send otp at the moment!"};
      if (data.phone) {
        sent = await Verify.phone(data.phone, otp);
      } else {
        sent = await Verify.mail(data.email, otp);
      }
      if (sent)
        return {
          status: 200,
          msg: "Otp sent to the given credential.",
        };
    } catch (err) {
      console.log(err);
      return {
        status: 502,
        msg: "Something went wrong! Please try later.",
      };
    }
  }

  static async verify(data) {
    try {
      let user = await redisClient.hmget(
        `user:${data.email ? data.email : data.phone}`,
        "Id",
        "otp"
      );
      if (!user) return {status: 400, msg: "Otp expired!"};
      if (user[1] !== data.otp) {
        return {
          status: 400,
          msg: "Invalid otp!",
        };
      }
      let ok = await redisClient.hmset(
        `user:${data.email ? data.email : data.phone}`,
        {Id: data.email ? data.email : data.phone, verified: true}
      );
      if (!ok)
        return {
          status: 502,
          msg: "Cannot verify at the moment!",
        };
      if (data.for === "signin") {
        let user = await AccountSchema.findOne({
          identifier: data.email ? data.email : data.phone,
        });
        if (!user.verified || !user.active)
          return {
            status: 400,
            msg: "Invalid credentials.",
          };
        let access = await Encrypt.createAccess(
            data.email ? data.email : data.phone
          ),
          refresh = await Encrypt.createRefresh(
            data.email ? data.email : data.phone
          );
        return {
          status: 200,
          msg: "Otp verified & signedin successfully",
          access,
          refresh,
          merchant,
        };
      }
      return {
        status: 200,
        msg: "Otp verified successfully!",
      };
    } catch (err) {
      console.log(err);
      return {
        status: 502,
        msg: "Something went wrong Please try later!",
      };
    }
  }
}

module.exports = {
  Accounts,
  Otps,
};
