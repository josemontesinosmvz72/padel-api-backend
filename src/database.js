const mongoose = require('mongoose');
const router = require("./routes/articulo.route");
require('dotenv').config();

const URL = process.env.URL;

mongoose.connect(URL)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch ((err) => {
        console.error(err);
    })

module.exports = mongoose;
