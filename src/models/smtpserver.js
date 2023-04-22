//Nodemailer
const nodemailer = require('nodemailer');
const config = require('config');
const transporter  = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASS
    }
});

const Mail = function (response) {
    const email = {
        to: response.To,
        from: `"Etienne Kagaba" ${config.GMAIL_USER}`,
        subject: response.Subject,
        text: response.Body
    }
    transporter.sendMail(email)
        .catch(err => {
            console.log(err);
        })
};

module.exports = Mail;