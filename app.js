"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const getRestaurants = require("./modules/restaurants");
const getFavoriteRestaurents = require("./modules/getFavoriteRestaurents");
const addResToMyFavorite = require("./modules/addResToMyFavorite");
const deleteRestaurantForOwnerEmail = require("./modules/deleteRestaurantForOwnerEmail");

const app = new express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

app.get("/", (req, res) => res.send("out rider"));
app.get("/restaurants", getRestaurants);
app.get("/favoriterestaurents", getFavoriteRestaurents);
app.post("/addrestomyfavorite", addResToMyFavorite);
app.delete('/restaurants/:restaurantID',deleteRestaurantForOwnerEmail);



// contact-us backend
const nodemailer = require("nodemailer");
const router = express.Router();
app.use("/", router);

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "outriderapp@gmail.com",
        pass: "OUTRIDERapp12345",
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
});

router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: "outriderapp@gmail.com",
        subject: "Contact Form Submission",
        html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "ERROR" });
        } else {
            res.json({ status: "" });
        }
    });
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));