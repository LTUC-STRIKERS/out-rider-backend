'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getRestaurants = require('./modules/restaurants')


const app = new express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;


app.get('/', (req, res) => res.send('out rider'));
app.get('/restaurants', getRestaurants);


app.listen(PORT,()=> console.log(`Server listening on port ${PORT}`));


