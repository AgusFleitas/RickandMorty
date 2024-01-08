require("dotenv").config();
const nodemailer = require("nodemailer");

const { MAIL_USER, MAIL_PASS } = process.env;

const transporter = nodemailer.createTransport(
  {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    }
  },
  {
    from: '"RickAndMorty Web" <register@rickandmorty.com>',
  }
);

module.exports = { transporter };
