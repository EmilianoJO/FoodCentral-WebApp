const express = require('express');
const router = express.Router();
const controller = require('../controllers/comentariosController');

/**
 * @swagger
 * tags:
  - name: comentarios
    description: Everything about your Pets
 */

/** 
 * @swagger
 * /comentarios:
 *  get:
 *   description: Ver todos los comentarios
 *   tags: 
 *     - comentarios
 *   responses:
 *     200:
 *       description: lista de comentarios
 */
router.get('', controller.listarTodosLosComentarios);

/** 
 * @swagger
 * /comentarios/{id}:
 *  get:
 *   description: Ver un comentario en concreto
 *   tags: 
 *     - comentarios
 *   parameters:
 *     - in: path
 *       name: id
 *       description: Ver comentario con ese ID
 *       type: string
 *   responses:
 *     200:
 *       description: lista de comentario específico
 *     400:
 *       description: No existe ese comentario
 */
router.get('/:id', controller.listaComentarioPorID);

/** 
 * @swagger
 * /comentarios/negocio/{idNegocio}:
 *  get:
 *   description: Ver comentarios de un negocio
 *   tags: 
 *     - comentarios
 *   parameters:
 *     - in: path
 *       name: idNegocio
 *       description: Ver comentario con ese ID de negocio
 *       type: string
 *   responses:
 *     200:
 *       description: lista de comentarios
 *     400:
 *       description: No existe ese comentario
 */
router.get('/negocio/:idNegocio', controller.listarComentariosPorIDdeNegocio);

/** 
 * @swagger
 * /comentarios/usuario/{idUsuario}:
 *  get:
 *   description: Ver comentarios de un usuario
 *   tags: 
 *     - comentarios
 *   parameters:
 *     - in: path
 *       name: idUsuario
 *       description: Ver comentario con ese ID de usuario
 *       type: string
 *   responses:
 *     200:
 *       description: lista de comentarios
 *     400:
 *       description: No existe ese comentario
 */
router.get('/usuario/:idUsuario', controller.listarComentariosPorIDdeUsuario);

/**
 * @swagger
 * /comentarios:
 *  post:
 *     description: crear un nuevo comentario
 *     tags: 
 *       - comentarios
 *     parameters: 
 *       - in: body
 *         name: comentario
 *         description: El esquema del nuevo comentario
 *         schema:
 *           type: object
 *             - fechaCreacion
 *           required: 
 *             - userId
 *             - comment
 *             - negocioId
 *           properties:
 *             userId:
 *               type: string
 *             comment:
 *               type: string
 *             negocioId:
 *               type: string
 *             fechaCreacion:
 *               type: Date
 *     responses:
 *       200: 
 *         description: Agrega un comentario
 *       400: 
 *         description: No agrega un comentario
 * 
 */
router.post('',express.json(), controller.subirNuevoComentario);

/**
 * @swagger
 * /comentarios/{id}:
 *  put:
 *     description: Actualizar un comentario ya guardado
 *     tags: 
 *       - comentarios
 *     parameters:
 *       - in: path
 *         name: id
 *       - in: body
 *         name: comentario
 *         description: El esquema de un nuevo comentario
 *         schema:
 *           type: object
 *             - fechaCreacion
 *           required: 
 *             - userId
 *             - comment
 *             - negocioId
 *           properties:
 *             userId:
 *               type: string
 *             comment:
 *               type: string
 *             negocioId:
 *               type: string
 *             fechaCreacion:
 *               type: Date
 *     responses:
 *       200:
 *         description: Se pudo hacer el cambio en el comentario
 *       400:
 *         description: No se pudo cambiar el comentario
 *
 */
router.put('/:id',express.json(), controller.modificarComentarioPorID);

/** 
 * @swagger
 * /comentarios/{id}:
 *  delete:
 *   description: Eliminar un comentario concreto
 *   tags: 
 *     - comentarios
 *   parameters:
 *     - in: path
 *       name: id
 *       description: Eliminar comentario con ese ID
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: Eliminar un comentario concreto
 *     400:
 *       description: No se puede eliminar dicho comentario
 */
router.delete('/:id', controller.eliminarComentarioPorID);
module.exports = router;