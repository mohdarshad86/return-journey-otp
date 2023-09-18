const { IPinfoWrapper, LruCache } = require("node-ipinfo");
const axios = require('axios');
const ipLookupUrl = 'https://ipinfo.io/json';

const ipAddress = async (req, res, next) => {
    try {
        const response = await axios.get(ipLookupUrl);

        req.userInfo = response.data;

        next();
    } catch (error) {
        console.error("Error fetching IP info:", error);

        return res.status(500).send({ status: 'False', message: "Internal Server Error" });
    }
};

module.exports = { ipAddress };
