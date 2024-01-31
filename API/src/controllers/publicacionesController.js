const Publicacion = require('../models/publicaciones');

const publicacionesController = {
    listarTodasLasPublicaciones: function(req, res) {
        Publicacion.find({})
            .then(response => {
                res.status(200).send(response);
            })
            .catch(error => {
                res.status(400).send(error);
            })
    },
    listarPublicacionPorID: function(req, res) {
        Publicacion.findById(req.params.id)
            .populate("id_negocio")
            .then(response => {
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200).send(response);
            })
            .catch(error => {
                res.status(400).send(error);
            })
    },
    subirNuevaPublicacion: function(req, res) {
        const nuevaPublicacion = new Publicacion({
            title: req.body.title,
            description: req.body.description,
            id_negocio: req.body.id_negocio,
            likes: req.body.likes,
            fechaCreacion: req.body.fechaCreacion,
            url: req.body.url,
            id_user: req.body.id_user
        });

        nuevaPublicacion.save()
            .then(response => {
                console.log(response)
                res.status(200).send(response);
            })
            .catch(error =>{
                res.status(400).send(error);
            })
    },
    modificarPublicacionPorID: function(req, res){
        const nuevoReemplazoDeNegocio = {
            title: req.body.title,
            description: req.body.description,
            id_negocio: req.body.id_negocio,
            likes: req.body.likes,
            fechaCreacion: req.body.fechaCreacion,
            url: req.body.url,
            id_user: req.body.id_user
        }

        Publicacion.findByIdAndUpdate(req.params.id, nuevoReemplazoDeNegocio)
            .then(response => {
                res.status(200).send(response);
            })
            .catch(error => {
                res.status(400).send(response);
            });
    },
    eliminarPublicacionPorID: function(req, res){
        Publicacion.findByIdAndRemove(req.params.id)
            .then(response => {
                res.status(200).send(response);
            })
            .catch(error => {
                res.status(400).send(response);
            });
    }
};

module.exports = publicacionesController;