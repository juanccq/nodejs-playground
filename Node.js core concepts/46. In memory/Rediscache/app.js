const express = require('express');
const axios = require('axios');
const Redis = require('redis');
const cors = require('cors');

const app = express();

app.use(cors());
let redisClient;

(async () => {
    redisClient = Redis.createClient();
    redisClient.on('error', (err) => {
        console.log('Redis client error', err);
        process.exit(1);
    });

    await redisClient.connect();
    console.log('Redis client connect successfully');
    
})();

app.get('/users', async(req, res) => {
    try {
        const users = await redisClient.get('users');

        if(users) {
            console.log('served from redis');
            return res.json(JSON.parse(users));
        }
        else {
            console.log('Served from github');
            const {data} = await axios.get('https://raw.githubusercontent.com/iso1983/addresses/main/APIdatafiltered.json');

            redisClient.set('users', JSON.stringify(data), {EX:86400}); // let the variable for 1 day 86400

            return res.json(data);
        }
    } catch (error) {
        console.log(error);
    }
})

app.listen(5000,() => { console.log('running on port 5000'); });