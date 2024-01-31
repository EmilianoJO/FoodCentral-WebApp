const express = require('express');
const router = express.Router();
const controller = require('../controllers/negociosController');

/** 
 * @swagger
 * /negocios:
 *  get:
 *   description: Ver todos los negocios
 *   tags:
 *     - negocios
 *   responses:
 *     200:
 *       description: lista de negocios
 */
router.get('', controller.listarTodosLosNegocios);

/** 
 * @swagger
 * /negocios/{id}:
 *  get:
 *   description: Ver un negocio en concreto
 *   tags:
 *     - negocios
 *   parameters:
 *     - in: path
 *       name: id
 *       description: Ver negocio con ese ID
 *       type: string
 *   responses:
 *     200:
 *       description: lista de usuario específico
 *     400:
 *       description: No existe ese usuario
 */
router.get('/:id', controller.listaeNegocioPorID);

/**
 * @swagger
 * /negocios:
 *  post:
 *     description: crear un nuevo negocio
 *     tags:
 *       - negocios
 *     parameters: 
 *       - in: body
 *         name: nombre del negocio
 *         description: El esquema del nuevo negocio
 *         schema:
 *           type: object
 *             - name
 *             - averageNote
 *             - address
 *             - fechaCreacion
 *           properties:
 *             name:
 *               type: string
 *             averageNote:
 *               type: number
 *             address:
 *               type: string
 *             fechaCreacion:
 *               type: Date
 *     responses:
 *       200: 
 *         description: Agrega un negocio
 *       400: 
 *         description: No agrega un negocio
 * 
 */
router.post('', controller.subirNuevoNegocio);

/**
 * @swagger
 * /negocios/{id}:
 *  put:
 *     description: Actualizar un negocio ya guardado
 *     tags:
 *       - negocios
 *     parameters:
 *       - in: path
 *         name: id
 *       - in: body
 *         name: titulo
 *         description: El esquema de un nuevo negocio
 *         schema:
 *           type: object
 *             - name
 *             - averageNote
 *             - address
 *             - fechaCreacion
 *           properties:
 *             name:
 *               type: string
 *             averageNote:
 *               type: number
 *             address:
 *               type: string
 *             fechaCreacion:
 *               type: Date
 *     responses:
 *       200:
 *         description: Se pudo hacer el cambio en el negocio
 *       400:
 *         description: No se pudo cambiar el negocio
 *
 */
router.put('/:id', controller.modificarNegocioPorID);

/** 
 * @swagger
 * /negocios/{id}:
 *  delete:
 *   description: Eliminar un negocio concreto
 *   tags:
 *     - negocios
 *   parameters:
 *     - in: path
 *       name: id
 *       description: Eliminar negocio con ese ID
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: Eliminar un negocio concreto
 *     400:
 *       description: No se puede eliminar dicho negocio
 */
router.delete('/:id', controller.eliminarNegocioPorID);
module.exports = router;