const express = require('express');
const route = require('./routes/route');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI

app.use(express.json());

mongoose.connect(`${MONGO_URI}`, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB Connected");
    }).catch((err) => {
        console.log(err);
    });

app.use('/', route)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

// const express = require('express');
// const { IPinfoWrapper, LruCache } = require('node-ipinfo');

// const app = express();
// const port = 3000;

// // Create an LRU cache with custom options
// const cacheOptions = {
//     max: 5000, // Maximum number of items in the cache
//     maxAge: 24 * 60 * 60 * 1000, // Maximum age of items in milliseconds (1 day)
// };
// const cache = new LruCache(cacheOptions);

// // Create an IPinfoWrapper instance with your API token and the cache
// const ipinfo = new IPinfoWrapper('0dad3449568406', cache);

// // Define an API route to retrieve IP information and cache it
// app.get('/ipinfo/:ip', async (req, res) => {
//     const ip = req.params.ip;

//     try {
//         // Check if the data is already in the cache
//         let ipInfoData = cache.get(ip);
//         console.log("1", ipInfoData);

//         if (!ipInfoData) {
//             // If not in the cache, fetch the data from IPinfo API and store it in the cache
//             const response = await ipinfo.lookupIp(ip);
//             ipInfoData = response;

//             // Cache the data with the IP address as the key
//             cache.set(ip, ipInfoData);
//             console.log("2", ipInfoData);
//         }

//         // Respond with the IP information
//         res.json(ipInfoData);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });