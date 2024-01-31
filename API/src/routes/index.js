//index Routes
const router = require('express').Router();
const rutasUsuarios = require('./usuarios');
const rutasNegocios = require("./negocios");
const rutasComentarios = require("./comentarios");
const rutasPublicaciones = require('./publicaciones');
const rutasAuth = require('./auth');

router.use('', rutasAuth);
router.use('/usuarios',rutasUsuarios);
router.use('/negocios', rutasNegocios);
router.use('/comentarios', rutasComentarios);
router.use('/publicaciones', rutasPublicaciones);

module.exports = router;
