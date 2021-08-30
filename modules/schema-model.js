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
    id: String,
  });
const favResturantModel = mongoose.model("Restaurant", favResturantSchema);
module.exports=favResturantModel;