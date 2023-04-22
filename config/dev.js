const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DB_URI: process.env.DB_URI,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,
    SECRET: process.env.SECRET,
    NODE_ENV_CUSTOM: "dev",
    TOKEN: process.env.TOKEN,
}