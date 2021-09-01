
const favResturantModel=require('./schema-model');

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
  
    
    let found= await favResturantModel.findOne({ id: obj.id }
       ).exec();
       console.log('id:',obj.id)

    if (found === null){

      await newRestaurant.save();
    }
    // await newRestaurant.save();

    // console.log('founf',found);
    
  
  
    favResturantModel.find(
      { email: obj.email },
      function (err, myFavRestaurante) {
        if (err) {
          console.log(err);
        } else {
          res.send(myFavRestaurante);
        }
      }
    );
  }

  module.exports=addResToMyFavorite;

