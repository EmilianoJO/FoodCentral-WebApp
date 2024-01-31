const express = require('express');
const router = express.Router();
const controller = require('../controllers/publicacionesController');

/** 
 * @swagger
 * /publicaciones:
 *  get:
 *   description: Ver todas las publicaciones
 *   tags:
 *     - publicaciones
 *   responses:
 *     200:
 *       description: lista de publicaciones
 */
router.get('', controller.listarTodasLasPublicaciones);

/** 
 * @swagger
 * /publicaciones/{id}:
 *  get:
 *   description: Ver una publicacion en concreto
 *   tags:
 *     - publicaciones
 *   parameters:
 *     - in: path
 *       name: id
 *       description: Ver publicacion con ese ID
 *       type: string
 *   responses:
 *     200:
 *       description: lista de publicacion concreta
 *     400:
 *       description: No existe dicha publicacion
 */
router.get('/:id', controller.listarPublicacionPorID);

/**
 * @swagger
 * /publicaciones:
 *  post:
 *     description: crear un nuevo post
 *     tags:
 *       - publicaciones
 *     parameters: 
 *       - in: body
 *         name: nombre del post
 *         description: El esquema del nuevo post
 *         schema:
 *           type: object
 *             - fechaCreacion
 *             - likes
 *             - description
 *             - title
 *           required: 
 *             - id_negocio
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             likes:
 *               type: string
 *             id_negocio:
 *               type: string
 *             fechaCreacion:
 *               type: Date
 *     responses:
 *       200: 
 *         description: Agrega un post
 *       400: 
 *         description: No agrega un post
 * 
 */
router.post('', controller.subirNuevaPublicacion);

/**
 * @swagger
 * /publicaciones/{id}:
 *  put:
 *     description: Actualizar un post ya guardado
 *     tags:
 *       - publicaciones
 *     parameters:
 *       - in: path
 *         name: id
 *       - in: body
 *         name: titulo
 *         description: El esquema de un nuevo post
 *         schema:
 *           type: object
 *             - fechaCreacion
 *             - likes
 *             - description
 *             - title
 *           required: 
 *             - id_negocio
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             likes:
 *               type: string
 *             id_negocio:
 *               type: string
 *             fechaCreacion:
 *               type: Date
 *     responses:
 *       200:
 *         description: Se pudo hacer el cambio en el post
 *       400:
 *         description: No se pudo cambiar el post
 *
 */
router.put('/:id', controller.modificarPublicacionPorID);

/** 
 * @swagger
 * /publicaciones/{id}:
 *  delete:
 *   description: Eliminar un post concreto
 *   tags:
 *     - publicaciones
 *   parameters:
 *     - in: path
 *       name: id
 *       description: Eliminar post con ese ID
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: Eliminar un negocio post
 *     400:
 *       description: No se puede eliminar dicho post
 */
router.delete('/:id', controller.eliminarPublicacionPorID);

module.exports = router;
