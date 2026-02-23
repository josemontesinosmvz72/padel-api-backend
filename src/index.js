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
    res.json({
        endpoints: {
            all: {
                method: "GET",
                uri: "/api/v1/articulos"
            },
            oneArticulo: {
                method: "GET",
                uri: "/api/v1/articulos/:id"
            },
            articulosByCategoria: {
                method: "GET",
                uri: "/api/v1/articulos/categoria/:categoria"
            },
            articulosBySubcategoria: {
                method: "GET",
                uri: "/api/v1/articulos/subcategoria/:subcategoria"
            },
            insert: {
                method: "POST",
                uri: "/api/v1/articulos"
            },
            update: {
                method: "PUT",
                uri: "/api/v1/articulos/:id"
            },
            patch: {
                method: "PATCH",
                uri: "/api/v1/articulos/:id"
            },
            delete: {
                method: "DELETE",
                uri: "/api/v1/articulos/:id"
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