//usuarios Routes
const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariosController');
//Docuemntacion para Swagger

/** 
 * @swagger
 * /usuarios:
 *  post:
 *   description: Crear un nuevo usuario
 *   tags: 
 *     - usuarios
 *   parameters:
 *     - in: body
 *       name: Crear un usuario
 *       description: Crear un usuario y agregar body
 *       schema:
 *           type: object
 *             - userStatus
 *             - fechaCreacion
 *             - negocios
 *           required: 
 *             - userType
 *             - email
 *             - bName
 *           properties:
 *             bName:
 *               type: string
 *             email:
 *               type: string
 *             userType:
 *               type: string
 *             negocios:
 *               type: string
 *             status:
 *               type: string
 *             fechaCreacion:
 *               type: Date  
 *   responses:
 *     200:
 *       description: lista de usuarios
 */
router.post('',express.json(),controller.crearU);
/** 
 * @swagger
 * /usuarios/{id}:
 *  get:
 *   description: Ver uusuario específico
 *   tags: 
 *     - usuarios
 *   parameters:
 *     - in: path
 *       name: id
 *       description: Ver usuario con ese ID
 *       type: string
 *   responses:
 *     200:
 *       description: lista de usuario específico
 *     400:
 *       description: No se pudo encontrar el usuario
 */
router.get('/:id',controller.verU);

/** 
 * @swagger
 * /usuarios/mail/{email}:
 *  get:
 *   description: Ver uusuario específico
 *   tags: 
 *     - usuarios
 *   parameters:
 *     - in: path
 *       name: email
 *       description: Ver usuario con ese mail
 *       type: string
 *   responses:
 *     200:
 *       description: lista de usuario específico
 *     400:
 *       description: No se pudo encontrar el usuario
 */
router.get('/mail/:email',controller.verUporMail);
/** 
 * @swagger
 * /usuarios:
 *  get:
 *   description: Ver los usuarios
 *   tags: 
 *     - usuarios
 *   parameters:
 *     - in: params
 *       name: Ver Usuarios
 *       description: Ver las usuarios
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: lista de usuarios
 */
router.get('',controller.listarU);

/** 
 * @swagger
 * /usuarios/{id}:
 *  put:
 *   description: Actualizar un usuario específica
 *   tags: 
 *     - usuarios
 *   parameters:
 *     - in: path
 *       name: id
 *       description: actualizar usuario con ese ID
 *       type: string
 *     - in: body
 *       name: Crear un usuario
 *       description: Crear un usuario y agregar body
 *       schema:
 *           type: object
 *             - userStatus
 *             - fechaCreacion
 *             - negocios
 *           required: 
 *             - userType
 *             - email
 *             - bName
 *           properties:
 *             bName:
 *               type: string
 *             email:
 *               type: string
 *             userType:
 *               type: string
 *             negocios:
 *               type: string
 *             status:
 *               type: string
 *             fechaCreacion:
 *               type: Date 
 *   responses:
 *     200:
 *       description: actualizar usuario específico
 */
router.put('/:id',express.json(),controller.actualizarU);
/** 
 * @swagger
 * /usuarios/{id}:
 *  delete:
 *   description: Eliminar una usuario específica
 *   tags: 
 *     - usuarios 
 *   parameters:
 *     - in: path
 *       name: id
 *       description: Eliminar usuario con ese iD
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: Eliminar de usuario específica
 */
router.delete('/:id',controller.eliminarU);



module.exports = router;