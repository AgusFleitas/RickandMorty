const fs = require("fs");

const forgotTemplate = fs.readFileSync(__dirname + '/forgot.html', 'utf8');

const passwordForgot = (email, token) => {
  const urlWithToken = `http://localhost:3001/resetpassword?token=${token}`;
  const forgotTemplateWithLink = forgotTemplate.replace(
    /{{reset_password_link}}/g,
    urlWithToken
  );

  return {
    to: email,
    subject: "Reset your password",
    html: forgotTemplateWithLink,
  };
};

module.exports = { passwordForgot };
