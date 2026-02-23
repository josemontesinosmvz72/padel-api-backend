const express = require('express');
const app = express();
const cors= require('cors');
const morgan = require('morgan');
const {mongoose} = require('./database');
require('dotenv').config();

// Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/articulos', require('./routes/articulo.route'));
app.use('', (req, res) => {res.status(404).json({message: 'API is in /api/v1/articulos'});});

// Start the server
app.listen(app.get('port'), () => {
    console.log('Listening on port ' + app.get('port'));
});