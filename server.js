'use strict'

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();
const server = express();
server.use(cors());
server.use(express.json());
const yelp = require('yelp-fusion');
const PORT = process.env.PORT;

// const caching = require('./caching')

//database
mongoose.connect(`${process.env.MONGODB_LINK}`, { useNewUrlParser: true, useUnifiedTopology: true });

//localhost:3004/search?term=food&location=london,uk 
const getSearch = (req, res) => {

    // Place holder for Yelp Fusion's API Key. Grab them
    // from https://www.yelp.com/developers/v3/manage_app
    const apiKey = `${process.env.YELP_API_KEY}`;
    const searchRequest = {
        term: req.query.term,
        location: req.query.location
    };
    const client = yelp.client(apiKey);
    client.search(searchRequest).then(response => {
        const firstResult = response.jsonBody.businesses;
        const prettyJson = JSON.stringify(firstResult, null, 4);
        console.log(prettyJson);
        res.send(prettyJson);
    }).catch(e => {
        console.log(e);
        res.send(e);
    });

}


server.get('/search', getSearch);


//Schema
const favResturantSchema = new mongoose.Schema({
    name: String,
    rating:Number,
    image_url:String,
    email:String,
    phone:Number,
    review_count:Number,


});

//Model
const favResturantModel = mongoose.model('Restaurant', favResturantSchema);


function seedDataCollection() {
    const Restaurant1 = new favResturantModel({
        name: "nammmme",
        rating:5,
        image_url:'image_url',
        email:'email',
        phone:6666,
        review_count:555,
    })

    const Restaurant2 = new favResturantModel({
        name: "nammmme",
        rating:5,
        image_url:'image_url',
        email:'email',
        phone:6666,
        review_count:555,
    })


    const Restaurant3 = new favResturantModel({
        name: "nammmme",
        rating:5,
        image_url:'image_url',
        email:'email',
        phone:6666,
        review_count:555,
    })


    const Restaurant4 = new favResturantModel({
        name: "nammmme",
        rating:5,
        image_url:'image_url',
        email:'email',
        phone:6666,
        review_count:555,
    })

    Restaurant1.save();
    Restaurant2.save();
    Restaurant3.save();
    Restaurant4.save();

}
// seedDataCollection();

server.get('/favoriteplace', getfavoriteplace);
function getfavoriteplace(request,response) {

    let email = request.query.email;

    favResturantModel.find({email:email},function(err,ownerData){

        if(err){
            console.log('Error in getting data')
        }else {
            console.log(ownerData);
            response.send(ownerData)
        }

    })

}

class Restaurant {
    constructor(restaurant) {
        this.name = restaurant.name;
        this.image_url = restaurant.image_url;
        this.price = restaurant.price;
        this.rating = restaurant.rating;
        this.url = restaurant.url;

    }
}
























//listening on
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);

})


