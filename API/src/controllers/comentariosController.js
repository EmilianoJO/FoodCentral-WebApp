const Comentario = require('../models/comentarios');

const comentariosController = {
    listarTodosLosComentarios: function(req, res) {
        Comentario.find({})
        .populate("negocioId")
        .populate("userId")
            .then(response => {
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200).send(response);
            })
            .catch(error => {
                res.status(400).send(error);
            })
    },
    listaComentarioPorID: function(req, res) {
        Comentario.findById(req.params.id)
            .populate("negocioId")
            .populate("userId")
            .then(response => {
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200).send(response);
            })
            .catch(error => {
                res.status(400).send(error);
            })
    },
    listarComentariosPorIDdeNegocio: function(req, res) {
        console.log(req.params.idNegocio)
        Comentario.find({negocioId:req.params.idNegocio})
            .populate("negocioId")
            .populate("userId")
            .then(response => {
                res.status(200).send(response);
            })
            .catch(error =>{
                res.status(400).send(error);
            });
    },
    listarComentariosPorIDdeUsuario: function(req, res) {
        //console.log(req.params.idUsuario)
        Comentario.find({userId:req.params.idUsuario})
            .populate("negocioId")
            .populate("userId")
            .then(response => {
                res.status(200).send(response);
            })
            .catch(error =>{
                res.status(400).send(error);
            });
    },
    subirNuevoComentario: function(req, res) {
        console.log(req);
        const nuevoComentario = new Comentario({
            userId: req.body.userId,
            comment: req.body.comment,
            response: req.body.response,
            negocioId: req.body.negocioId
        });

        nuevoComentario.save()
            .then(response => {
                console.log(response)
                res.status(200).send(response);
            })
            .catch(error =>{
                res.status(400).send(error);
            })
    },
    modificarComentarioPorID: function(req, res){
        const nuevoReemplazoDeComentario = {
            userId: req.body.userId,
            comment: req.body.comment,
            response: req.body.response,
            negocioId: req.body.negocioId,
            fechaCreacion: req.body.fechaCreacion
        }

        Comentario.findByIdAndUpdate(req.params.id, nuevoReemplazoDeComentario)
            .then(response => {
                res.status(200).send(response);
            })
            .catch(error => {
                res.status(400).send(response);
            });
    },
    eliminarComentarioPorID: function(req, res){
        Comentario.findByIdAndRemove(req.params.id)
            .then(response => {
                res.status(200).send(response);
            })
            .catch(error => {
                res.status(400).send(response);
            });
    }
};

module.exports = comentariosController;