const express = require('express');
const router = express.Router();
const usuariosController = require('./../controllers/usuariosController');

/** 
 * @swagger
 * /usuarios/mail/logInByMail:
 *  post:
 *   description: Obtiene el usuario en base al correo y deja validar si la password coincide
 *   tags: 
 *     - usuarios
 *   parameters:
 *     - in: body
 *       name: Buscar user y comparar password
 *       description: Busca un usuario y compara la password
 *       schema:
 *           type: object
 *           required: 
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *   responses:
 *     200:
 *       description: Usuario con un correo
 */
router.post('/mail/logInByMail',express.json(),usuariosController.loginU);

/** 
 * @swagger
 * /usuarios/signUp:
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
router.post('/signUp',express.json(),usuariosController.crearU);

/** 
 * @swagger
 * /usuarios/signUp:
 *  post:
 *   description: Crear un nuevo usuario
 *   tags: 
 *     - usuarios
 *   parameters:
 *     - in: body
 *       name: Crear un usuario o iniciar sesion pero con google
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
router.post('/login/google', express.json(), usuariosController.googleLogIn);

module.exports = router;