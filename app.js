"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = new express();
const mongoose = require("mongoose");
const yelp = require('yelp-fusion');


app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get("/", (req, res) => res.send("out rider"));

//mongoose.connect('mongodb://localhost:27017/');
//localhost:27017/test
// mongodb://localhost:27017/test
mongoose.connect(`${process.env.MONGODB_LINK}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const getSearch = (req, res) => {


  // Place holder for Yelp Fusion's API Key. Grab them
  // from https://www.yelp.com/developers/v3/manage_app
  const apiKey = `${process.env.YELP_API_KEY}`;
  const searchRequest = {
    term: req.query.term,
    location: req.query.location,
  };
  const client = yelp.client(apiKey);
  client
    .search(searchRequest)
    .then((response) => {
      const firstResult = response.jsonBody.businesses;
      const prettyJson = JSON.stringify(firstResult, null, 4);
      res.send(prettyJson);
    })
    .catch((e) => {
    //   console.log(e);
      res.send(e);
    });
};
app.get("/search", getSearch);

//Schema
const favResturantSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  image_url: String,
  email: String,
  phone: Number,
  review_count: Number,
  url: String,
  id: String,
});
//Model
const favResturantModel = mongoose.model("Restaurant", favResturantSchema);
app.get("/favoriterestaurents", getFavoriteRestaurents);
function getFavoriteRestaurents(request, response) {
  let email = request.query.email;
  favResturantModel.find({ email: email }, function (err, ownerData) {
    if (err) {
    //   console.log("Error in getting data");
    } else {
      response.send(ownerData);
    }
  });
}

app.post("/addrestomyfavorite", addResToMyFavorite);

async function addResToMyFavorite(req, res) {

  let obj = {
    name: req.body.name,
    rating: req.body.rating,
    image_url: req.body.image_url,
    email: req.body.email,
    phone: req.body.phone,
    review_count: req.body.review_count,
    url: req.body.url,
    id: req.body.id,
  };
  const newRestaurant = new favResturantModel({
    name: obj.name,
    rating: obj.rating,
    image_url: obj.image_url,
    email: obj.email,
    phone: obj.phone,
    review_count: obj.review_count,
    url: obj.url,
    id: obj.id,
  });
//   await Adventure.findOne({ country: 'Croatia' }).exec();
  
  let found= await favResturantModel.findOne({ id: obj.id }
     ).exec();
  if (found ===null){
    await newRestaurant.save();
  }
  console.log('founf',found);
  

  favResturantModel.find(
    { email: obj.email },
    function (err, myFavRestaurante) {
      if (err) {
        // console.log("error in getting the data");
      } else {
        // console.log(myFavRestaurante);


        res.send(myFavRestaurante);
      }
    }
  );
}
// app.get('/favoriterestaurants',favoriteRestaurants);
// async function favoriteRestaurants(req,res){
//     console.log('renser',req.query);
//    let userEmail=req.query.email;
//     favResturantModel.find({ email: userEmail }, function (err, restaurents) {
//         if (err) {
//           console.log("error in getting the data");
//         } else {
//           console.log(restaurents);
//           res.send(restaurents);
//         }
//       });
// }
//

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
