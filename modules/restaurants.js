'use strict';
const yelp = require('yelp-fusion');
const axios =require('axios');
const caching = require('./caching')

const getRestaurants = (req,res)=>{

    // const cityName = req.query.searchQuery;
    // const cityNameYelp = `yelp-${cityName}`;
    const yelpURL = `https://api.yelp.com/v3/businesses/search?`;
    if(caching['cityNameYelp']!== undefined){
      res.send(caching['cityNameYelp']);
    }else{

      axios.get(yelpURL,
        {
            headers: {
              Authorization: `Bearer ${process.env.YELP_API_KEY}`,
            },
            params: {
              term: 'restaurants',
              // location:cityName,
              // categories:'bagels',
              latitude: 51.509865,              
              longitude:-0.118092

            },
          },
        ).then((cityYelpData) => {
        let restaurants = cityYelpData.data.businesses.map(restaurant =>{
          // console.log(restaurant);
          let rest = new Restaurant(restaurant);
          return rest;
        })
        caching['cityNameYelp'] = restaurants;
        res.send(restaurants);

    }).catch(error => {
        res.send(error)
    })
    }


}


class Restaurant{
  constructor(restaurant){
    this.name = restaurant.name;
    this.image_url = restaurant.image_url;
    this.price = restaurant.price;
    this.rating = restaurant.rating;
    this.url=restaurant.url;
    this.coordinates=restaurant.coordinates;
    
  }
}

module.exports = getRestaurants;
