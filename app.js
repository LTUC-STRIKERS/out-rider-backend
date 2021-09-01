"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const getRestaurants = require("./modules/restaurants");
const getFavoriteRestaurents = require("./modules/getFavoriteRestaurents");
const addResToMyFavorite = require("./modules/addResToMyFavorite");

const app = new express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get("/", (req, res) => res.send("out rider"));
app.get("/restaurants", getRestaurants);
app.post("/addrestomyfavorite", addResToMyFavorite);

//Model
app.get("/favoriterestaurents", getFavoriteRestaurents);



app.listen(PORT, () => console.log(`app listening on port ${PORT}`));


