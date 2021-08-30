
const favResturantModel=require('./schema-model');

function getFavoriteRestaurents(request, response) {
    let email = request.query.email;
    favResturantModel.find({ email: email }, function (err, ownerData) {
      if (err) {
        console.log(err);
      } else {
        response.send(ownerData);
      }
    });
  }

module.exports=getFavoriteRestaurents;