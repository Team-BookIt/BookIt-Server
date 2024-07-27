const transporter = require("../../Config/email");

const sendEmail = (emailDetails) => {
    const mailOptions = {
        from : emailDetails.sender,
        to : emailDetails.receipient,
        subject : emailDetails.subject,
        text : emailDetails.text
    };

    transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error);
        } else {
            console.log("Email sent: ",  info.response);
        }
    })
}

module.exports = sendEmail;