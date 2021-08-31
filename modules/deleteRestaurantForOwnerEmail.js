const favResturantModel=require('./schema-model');

async function deleteRestaurantForOwnerEmail(req,res){
    const restaurantID = req.params.restaurantID;
    const ownerEmail = req.query.ownerEmail;
    favResturantModel.deleteOne({_id:restaurantID},(error,deletedRestaurant)=>{
        if(error) {
            console.log('error in deleteing the restaurant')
        } else {
            console.log('restaurant has been deleted', deletedRestaurant)
            favResturantModel.find({ email:ownerEmail }, function (err, favRestaurants) {
                if (err) {
                    console.log('error in getting the fav restaurants')
                } else {
                    res.send(favRestaurants)
                }
            })
        }
    })


}

module.exports = deleteRestaurantForOwnerEmail;
