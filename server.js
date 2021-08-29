'use strict'

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();


const PORT = process.env.PORT;

const server = express();
server.use(cors());
server.use(express.json());
const yelp = require('yelp-fusion');
// const caching = require('./caching')

//database
// mongoose.connect(`${process.env.MONGODB_LINK}`, { useNewUrlParser: true, useUnifiedTopology: true });

//localhost:3004/search?term=food&location=london,uk 
const getSearch = (req, res) => {

    // Place holder for Yelp Fusion's API Key. Grab them
    // from https://www.yelp.com/developers/v3/manage_app
    const apiKey = `${process.env.YELP_API_KEY}`;
    const searchRequest = {
        term: 'restaurants',
        location: req.query.location
    };
    console.log(searchRequest)
    const client = yelp.client(apiKey);
    client.search(searchRequest).then(response => {
        const results = response.jsonBody.businesses;
        let array = [];
        results.map(restaurant => {
            array.push(new Restaurant(restaurant))
        })
        console.log(array);
        res.send(array);
    }).catch(e => {
        res.send(e);
    });
}

server.get('/search', getSearch);
class Restaurant {
    constructor(restaurant) {
        this.name = restaurant.name;
        this.image_url = restaurant.image_url;
        this.price = restaurant.price;
        this.rating = restaurant.rating;
        this.url = restaurant.url;
        this.coordinates = restaurant.coordinates;
        this.phone = restaurant.phone;
        this.review_count = restaurant.review_count;

    }
}
























//listening on
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);

})


