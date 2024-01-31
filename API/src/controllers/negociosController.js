const Negocio = require('../models/negocios');

const negociosController = {
    listarTodosLosNegocios: function(req, res) {
        Negocio.find({})
            .then(response => {
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200).send(response);
            })
            .catch(error => {
                res.status(400).send(error);
            })
    },
    listaeNegocioPorID: function(req, res) {
        Negocio.findById(req.params.id)
            .then(response => {
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200).send(response);
            })
            .catch(error => {
                res.status(400).send(error);
            })
    },
    subirNuevoNegocio: function(req, res) {
        const nuevoNegocio = new Negocio({
            name: req.body.name,
            averageNote: req.body.averageNote,
            address: req.body.address,
            description: req.body.description,
            openTime: req.body.openTime,
            closeTime: req.body.closeTime,
            mediaPieceFormat: req.body.mediaPieceFormat,
            id_user: req.body.id_user,
            fechaCreacion: req.body.fechaCreacion
        });

        nuevoNegocio.save()
            .then(response => {
                console.log(response)
                res.status(200).send(response);
            })
            .catch(error =>{
                res.status(400).send(error);
            })
    },
    modificarNegocioPorID: function(req, res){
        const nuevoReemplazoDeNegocio = {
            name: req.body.name,
            averageNote: req.body.averageNote,
            address: req.body.address,
            openTime: req.body.openTime,
            closeTime: req.body.closeTime,
            description: req.body.description,
            mediaPieceFormat: req.body.mediaPieceFormat,
            fechaCreacion: req.body.fechaCreacion
        }

        Negocio.findByIdAndUpdate(req.params.id, nuevoReemplazoDeNegocio)
            .then(response => {
                res.status(200).send(response);
            })
            .catch(error => {
                res.status(400).send(response);
            });
    },
    eliminarNegocioPorID: function(req, res){
        Negocio.findByIdAndRemove(req.params.id)
            .then(response => {
                res.status(200).send(response);
            })
            .catch(error => {
                res.status(400).send(response);
            });
    }
};

module.exports = negociosController;