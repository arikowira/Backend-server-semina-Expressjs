const nodemailer = require("nodemailer");
const { serverEmail, password } = require("../../config");
const Mustache = require("mustache");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "587",
  secure: false,
  auth: {
    user: serverEmail,
    pass: password,
  },
});

const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/otp.html", "utf8");

    let message = {
      from: serverEmail,
      to: email,
      subject: "Otp for registration is :",
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

const orderMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/invoice.html", "utf8");

    let message = {
      from: serverEmail,
      to: email,
      subject: "Your ordered tickets",
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { otpMail, orderMail };
