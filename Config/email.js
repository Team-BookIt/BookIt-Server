const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service : "gmail",
    host : "smtp.gmail.com",
    port : 3000,
    secure : false,
    auth : {
        user : process.env.EMAIL,
        pass : process.env.EMAIL_PWD
    },
    tls : {
        rejectUnauthorized : false
    }
});

module.exports = transporter;