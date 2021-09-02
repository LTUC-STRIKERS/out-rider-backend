const favResturantModel=require('./schema-model');

function getFavoriteRestaurents(request, response) {
    let email = request.query.email;
    favResturantModel.find({ email: email }, function (err, ownerData) {
      if (err) {
        log('fffffffff');
        console.log(err);
      } else {
        console.log("correct");
        response.send(ownerData);
      }
    });
  }


module.exports = getFavoriteRestaurents;