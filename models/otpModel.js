const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('OTP', otpSchema);
