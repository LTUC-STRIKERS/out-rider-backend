const mongoose = require("mongoose");
mongoose.connect(`${process.env.MONGODB_LINK}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
const favResturantSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    image_url: String,
    email: String,
    phone: Number,
    review_count: Number,
    url: String,
    id_res: String,
    longitude:Number,
    latitude:Number
  });
const favResturantModel = mongoose.model("Restaurant", favResturantSchema);
module.exports=favResturantModel;