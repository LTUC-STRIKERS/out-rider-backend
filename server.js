// 'use strict'
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const axios = require('axios');
// require('dotenv').config();
// const app = express();
// app.use(cors());
// app.use(express.json());
// const yelp = require('yelp-fusion');
// const PORT = process.env.PORT;
// // const caching = require('./caching')
// //database
// mongoose.connect(`${process.env.MONGODB_LINK}`, { useNewUrlParser: true, useUnifiedTopology: true });
// //localhost:3004/search?term=food&location=london,uk 
// const getSearch = (req, res) => {
//     // Place holder for Yelp Fusion's API Key. Grab them
//     // from https://www.yelp.com/developers/v3/manage_app
//     const apiKey = `${process.env.YELP_API_KEY}`;
//     const searchRequest = {
//         term: 'restaurants',
//         location: req.query.location
//     };
//     const client = yelp.client(apiKey);
//     client.search(searchRequest).then(response => {
//         const firstResult = response.jsonBody.businesses;
//         const prettyJson = JSON.stringify(firstResult, null, 4);
//         console.log(prettyJson);
//         res.send(prettyJson);
//     }).catch(e => {
//         console.log(e);
//         res.send(e);
//     });
// }
// app.get('/search', getSearch);
// //Schema
// const favResturantSchema = new mongoose.Schema({
//     name: String,
//     rating:Number,
//     image_url:String,
//     email:String,
//     phone:Number,
//     review_count:Number,
//     url:String,
// });
// //Model
// const favResturantModel = mongoose.model('Restaurant', favResturantSchema);
// app.get('/favoriterestaurent', getFavoriteRestaurent);
// function getFavoriteRestaurent(request,response) {
//     let email = request.query.email;
//     favResturantModel.find({email:email},function(err,ownerData){
//         if(err){
//             console.log('Error in getting data')
//         }else {
//             console.log(ownerData);
//             response.send(ownerData)
//         }
//     })
// }

// app.post('/addrestomyfavorite',addResToMyFavorite);

// async function addResToMyFavorite (req,res){
//     console.log("hhhhhhhhhhhh", req.body);
   
//   let obj= { 
//       name:        req.body.name,
//      rating:       req.body.rating,
//      image_url:    req.body.image_url,
//      email:        req.body.email ,
//      phone:        req.body.phone,
//      review_count: req.body.review_count,
//      url:          req.body.url
//     };
//     console.log('wdffefeefefe',obj);
//   const newRestaurant = new favResturantModel({
//     name:obj.name,
//     rating:obj.rating,
//     image_url:obj.image_url,
//     email:obj.email,
//     phone:obj.phone,
//     review_count:obj.review_count,
//     url:obj.url,
//   })

//   await newRestaurant.save();

//   favResturantModel.find({ email: obj.email }, function (err, myFavRestaurante) {
//     if (err) {
//       console.log("error in getting the data");
//     } else {
//       console.log(myFavRestaurante);
//       res.send(myFavRestaurante);
//     }
//   });
// }
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
// // class Restaurant {
// //     constructor(restaurant) {
// //         this.name = restaurant.name;
// //         this.image_url = restaurant.image_url;
// //         this.rating = restaurant.rating;
// //         this.url = restaurant.url;
// //     }
// // }
// //listening on
// app.listen(PORT, () => {
//     console.log(`Listening on PORT ${PORT}`);
// })