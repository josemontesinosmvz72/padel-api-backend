const express = require('express');
const app = express();
const cors = require('cors');
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

app.get('/', (req, res) => {
    const base = req.protocol + '://' + req.get('host') + '/api/v1/articulos';
    res.json({
        endpoints: {
            all: {
                method: "GET",
                uri: base + "/all"
            },
            paged: {
                method: "GET",
                uri: base + "/paged?page=1&limit=10"
            },
            detail: {
                method: "GET",
                uri: base + "/detail/:id"
            },
            byCategoria: {
                method: "GET",
                uri: base + "/categoria/:categoria"
            },
            addOne: {
                method: "POST",
                uri: base + "/addOne"
            },
            updateOne: {
                method: "PATCH",
                uri: base + "/updateOne/:id"
            },
            deleteOne: {
                method: "DELETE",
                uri: base + "/deleteOne/:id"
            }
        }
    });
});
app.use((req, res) => {
    res.status(404).json({message: 'Endpoint not found'});
});

// Start the server
app.listen(app.get('port'), () => {
    console.log('Listening on port ' + app.get('port'));
});