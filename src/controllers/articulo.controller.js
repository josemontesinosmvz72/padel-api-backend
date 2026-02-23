const Articulo = require('../models/articulo.model');
const articuloController = {};

articuloController.getAllArticulos = async (req, res) => {
    await Articulo.find()
        .then(articulos => {
            res.status(200).json({
                status: true,
                articulos
            });
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })
};

articuloController.getArticulosPorCategoria = async (req, res) => {
    await Articulo.find({categoria: req.params.categoria})
        .then(data => {
            if (data) {
                res.status(200).json({
                    status: true,
                    articulos: data
                });
            } else {
                res.status(404).json({
                    status: false,
                    message: 'No se encontraron artículos en esta categoría'
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })
};
articuloController.getArticulosPorSubcategoria = async (req, res) => {
    await Articulo.find({subcategoria: req.params.subcategoria})
        .then(data => {
            if (data) {
                res.status(200).json({
                    status: true,
                    articulos: data
                });
            } else {
                res.status(404).json({
                    status: false,
                    message: 'No se encontraron artículos en esta subcategoría'
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })
};
articuloController.getArticuloPorId = async (req, res) => {
    await Articulo.findById(req.params.id)
        .then(data => {
            if (data) {
                res.status(200).json({
                    status: true,
                    articulo: data
                });
            } else {
                res.status(404).json({
                    status: false,
                    message: 'No se encontró ningún artículo con este ID'
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })
};
articuloController.addArticulo = async (req, res) => {
    const myArticulo = new Articulo(req.body);
    await myArticulo.save()
        .then(() => {
            res.status(201).json({
                status: true,
                message: 'Artículo creado correctamente'
            });
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })
};
articuloController.putArticulo = async (req, res) => {
    const articulo = req.body;
    await Articulo.findByIdAndUpdate(
        req.params.id,
        articulo,
        {new: true, overwrite: true}
    )
        .then(data => {
            if (data) {
                res.status(200).json({
                    status: true,
                    message: 'Artículo actualizado correctamente',
                    articulo: data
                });
            } else {
                res.status(404).json({
                    status: false,
                    message: 'No se encontró ningún artículo con este ID'
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })
};
articuloController.patchArticulo = async (req, res) => {
    const articulo = req.body;
    await Articulo.findByIdAndUpdate(
        req.params.id,
            {$set: articulo},
            {new: true}
    )
        .then(data => {
            if (data) {
                res.status(200).json({
                    status: true,
                    message: 'Artículo actualizado correctamente',
                    articulo: data
                });
            } else {
                res.status(404).json({
                    status: false,
                    message: 'No se encontró ningún artículo con este ID'
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })
};


articuloController.deleteArticulo = async (req, res) => {
    await Articulo.findByIdAndDelete(req.params.id)
        .then(data => {
            if (data) {
                res.status(200).json({
                    status: true,
                    message: 'Artículo eliminado correctamente'
                });
            } else {
                res.status(404).json({
                    status: false,
                    message: 'No se encontró ningún artículo con este ID'
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })
};

module.exports = articuloController;