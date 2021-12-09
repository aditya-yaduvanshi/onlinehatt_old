require("dotenv").config();
const bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  axios = require("axios").default,
  otp = require("otp-generator"),
  saltRounds = Number(process.env.saltRounds),
  {
    jwtAccessSecret,
    jwtRefreshSecret,
    jwtAudience,
    jwtIssuer,
    mailUser,
    mailPass,
    twilioPhone,
    twilioAuthToken,
    twilioAccountSid,
    fast2smsApiKey,
  } = process.env,
  twilioClient = require("twilio")(twilioAccountSid, twilioAuthToken),
  transporter = require("nodemailer").createTransport({
    service: "hotmail",
    host: "smtp-mail.outlook.com",
    secure: false,
    port: 587,
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });

class Validate {
  static async email(email) {
    let mail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mail.test(String(email));
  }

  static async phone(num) {
    let phone = /^(\+[0-9]{10,16})$/;
    return phone.test(String(num));
  }

  static async username(name) {
    let user = /^[a-z0-9_\-\.]+$/;
    return user.test(String(name));
  }

  static async password(word) {
    let pass =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,64}$/;
    return pass.test(String(word));
  }
}

class Encrypt {
  static async createHash(pass) {
    let hash = await bcrypt.hash(pass, saltRounds);
    return hash;
  }

  static async verifyHash(pass, hash) {
    let ok = await bcrypt.compare(pass, hash);
    return ok;
  }

  static async createAccess(cred) {
    let access = jwt.sign({cred}, jwtAccessSecret, {
      expiresIn: "2h",
      issuer: jwtIssuer,
      audience: jwtAudience,
    });
    return access;
  }

  static async verifyAccess(token) {
    let ok = jwt.verify(token, jwtAccessSecret, {
      expiresIn: "2h",
      issuer: jwtIssuer,
      audience: jwtAudience,
    });
    return ok;
  }

  static async createRefresh(cred) {
    let refresh = jwt.sign({cred}, jwtRefreshSecret, {
      expiresIn: "12h",
      issuer: jwtIssuer,
      audience: jwtAudience,
    });
    return refresh;
  }

  static async verifyRefresh(token) {
    let ok = jwt.verify(token, jwtRefreshSecret, {
      expiresIn: "12h",
      issuer: jwtIssuer,
      audience: jwtAudience,
    });
    return ok;
  }

  static async createOtp() {
    return otp.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
  }
}

class Verify {
  static async mail(address, otp) {
    const info = await transporter.sendMail({
      from: mailUser,
      to: address,
      subject: "OnlineHatt: Confirm OTP",
      text: `Please confirm your account by entering OTP: ${otp}`,
      html: `<p>Please confirm your account by entering OTP: ${otp}</p>`,
    });
    return info;
  }

  static async phone(number, otp) {
    let sms = await twilioClient.messages.create({
      body: `Your OnlineHatt account otp is: ${otp}`,
      from: twilioPhone,
      to: number,
    });
    /*let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: fast2smsApiKey,
      },
    };
    let sms = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2", 
      JSON.stringify({
        route: "v3",
        sender_id: "TXTIND",
        message: `Please confirm account by entering otp: ${otp}`,
        language: "english",
        flash: 0,
        numbers: number,
      }), config
    );*/
    return sms;
  }

  static async access(req, res, next) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      if (!token) throw new Error();
      let ok = await Encrypt.verifyAccess(token);
      if (!ok) throw new Error();
      next(req, res);
    } catch (err) {
      return res.status(401).json({msg: "Token expired or not specified."});
    }
  }

  static async refresh(req, res, next) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      if (!token) throw new Error();
      let ok = await Encrypt.verifyRefresh(token);
      if (!ok) throw new Error();
      next();
    } catch (err) {
      return res.status(401).json({msg: "Token expired or not specified."});
    }
  }
}

module.exports = {
  Validate,
  Verify,
  Encrypt,
};
