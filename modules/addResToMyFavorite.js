const favResturantModel = require("./schema-model");
const cachMemory = require("./cashMansoor");
// let cachMemory = [];
console.log(cachMemory);
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
    latitude:req.body.latitude,
    longitude:req.body.longitude,
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
    latitude:obj.latitude,
    longitude:obj.longitude,
  });

  let found = await favResturantModel.findOne({ id: obj.id }).exec();
  console.log("id:", obj.id);
  if (found === null) {
    await newRestaurant.save();
    console.log("inside first if ");
    if (cachMemory.length !== 0) {
      cachMemory.push(newRestaurant);
      console.log("adding data to cash", cachMemory);
    } else {
      console.log("inside first condition else fffff");
    }
  }
 

  if (cachMemory.length !== 0) {
    console.log('secound if');
    res.send(cachMemory);
  } else {
    console.log('secound else');
    favResturantModel.find(
      { email: obj.email },
      function (err, myFavRestaurante) {
        if (err) {
          console.log(err);
        } else {
          cachMemory.push(myFavRestaurante);
          console.log("add data udirect", cachMemory);
          res.send(myFavRestaurante);
        }
      }
    );
  }
}

module.exports = addResToMyFavorite;
