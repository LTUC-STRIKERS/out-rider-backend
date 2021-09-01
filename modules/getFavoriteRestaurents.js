const favResturantModel=require('./schema-model');
const cachMemory = require('./cashMansoor');
// const cache= require('./cachnod');


  function getFavoriteRestaurents(request, response) {
    if(cachMemory.length !==0)
{
  response.send(cachMemory);
  console.log('get from cash', cachMemory);
}else{
  let email = request.query.email;
    favResturantModel.find({ email: email }, function (err, ownerData) {
      if (err) {
        console.log(err);
      } else {
        console.log('add all data to cash first time',cachMemory);
        cachMemory.push(ownerData);
        response.send(ownerData);
        
      }
    });
}
    
  }



module.exports=getFavoriteRestaurents;