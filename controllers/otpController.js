const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
require('dotenv').config();
const otpModel = require('../models/otpModel');
const getISOCountryCode = require('../config/getISOCountryCode');
const valid = require('../validations/validation');
const { IPinfoWrapper, LruCache } = require('node-ipinfo');

//Connecting To Twilio To Send Real Time OTP
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendOTP = (otp, countryCode, phoneNumber) => {

    client.messages.create({
        body: `Your OTP for verification is ${otp}`,
        to: `${countryCode}${phoneNumber}`,
        from: `+17543335979`,
    })
        .then((message) => console.log(message.sid))
        .catch((error) => {
            console.log(error);
        });
}

//Implementing Cache To Store User Information For Some Time
const IPINFO_TOKEN = process.env.IPINFO_TOKEN
const cacheOptions = {
    max: 5000,
    maxAge: 24 * 60 * 60 * 1000,
};
const cache = new LruCache(cacheOptions);
const ipinfo = new IPinfoWrapper(IPINFO_TOKEN, cache);

const genOTP = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const { ip } = req.userInfo;

        if (!valid.validMobile(phoneNumber)) {
            return res.status(400).send({ status: 'false', message: "Invalid Number" })
        }

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        let userData = cache.get(ip);

        if (!userData) {

            userData = await ipinfo.lookupIp(ip);

            const hashedOTP = await bcrypt.hash(otp, 10);

            cache.set(ip, { ...userData, otp: hashedOTP, phoneNumber: phoneNumber });
        }
        console.log(userData);

        const countryCode = getISOCountryCode(userData.countryCode);

        sendOTP(otp, countryCode, phoneNumber);

        return res.status(200).send({ status: 'true', message: "OTP Sent Successfully" });
    } catch (error) {
        console.error("Error Sending SMS : ", error);
        return res.status(500).send({ status: 'false', message: "Internal Server Error" });
    }
}

const validateOTP = async (req, res) => {
    try {
        const { otp } = req.body;

        

        return res.status(200).send({ status: 'true', message: "OTP Verification Successfully" });
    } catch (error) {
        console.error("Error Validating OTP : ", error);
        return res.status(500).send({ status: 'false', message: "Internal Server Error" });
    }
}

module.exports = { genOTP, validateOTP }