const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');
const otpController = require('../controllers/otpController')

router.post('/register', auth.ipAddress, otpController.genOTP);
router.post('/verifyOTP', auth.ipAddress, otpController.validateOTP);

router.all("*/", (req, res) => {
    return res.send({ status: "False", message: "Invalid URL" })
});


module.exports = router;
