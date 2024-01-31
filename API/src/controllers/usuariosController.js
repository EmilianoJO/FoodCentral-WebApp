//Controller Usuarios
const { response } = require('express');
const { findById } = require('../models/usuarios');
const Usuario = require('../models/usuarios'); //Este es modelo "Usuario";
const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');
const googleCLient = new OAuth2Client(process.env.GOOGLE_ID);
const tareasController={
    listarU: function(req,res){
        Usuario.find({}).lean() //buscar por filtros adentro del parentesis
            //.lean() lo prepara para mandar un JSON y poder recibir los datos sin problema
            // y es funcion de mongoose
            .then(response=>{
                //console.log('respuesta', response);
                //res.render('tareas',{tareas: response});
                res.status(200).json(response);
            })     
            .catch(error=>{
                res.status(400).send('Error al ListarT'); //EN ANGULAR, regresamos UN OBJETO, no Texto
            });
        
    },
    verU: function(req,res){
        let idQ = req.params.id;
        console.log(idQ + " <- este fue el id");
        Usuario.findById({_id:idQ})
            .populate("negocios")
            .populate("negociosSeguidos")
            .then(response=>{
                console.log("VerT ejectudo correctamente");
                console.log(response);
                res.status(200).json(response);
            })
            .catch(error=>{
                res.status(400).send('Error al verT');
            });
    },
    loginU: function(req, res){
        console.log(req.body);
        let emailQ = req.body.email;
        let cryptPasswordQ = req.body.password;
        console.log(emailQ + " <- este fue el email");
        console.log(cryptPasswordQ + " <- este es el prospecto de password");
        Usuario.findOne({email:emailQ})
            .then(response =>{
                if(response.validPassword(cryptPasswordQ)){
                    const token = jwt.sign({
                        id: response._id,
                        email: response.email,
                        name: response.name,
                        role: response.userType
                    }, 'FoodCentral');
                    console.log(token);
                    res.status(200).send({token, response});
                } else {
                    res.status(400).send("password no valido");
                }
            }).catch(err => {
                res.status(400).send("No se pudo encontrar el usuario de fomra exitosa");
            });
    },
    googleLogIn: function(req, res){
        const idToken = req.body.googleToken;
        googleCLient.verifyIdToken({idToken: idToken})
            .then(response => {
                const user = response.getPayload();
                console.log("Google user:", user);
                //Search for the user
                Usuario.findOne({email: user.email})
                    .populate("negocios")
                    .then(response => {
                        const token = jwt.sign({
                            id: response.id,
                            email: response.email,
                            name: response.firstName,
                            role: "Normal"
                        }, 'FoodCentral');
                        console.log(token);
                        res.status(200).send({token: token});
                    })//Get the ID
                    .catch(err => {
                        console.log("No encontrado");
                        let newUserGoogle = new Usuario({
                            bName: user.given_name,
                            email: user.email,
                            password: "lk;jiusdvblhnoiuawrjbvlip",
                            userType: "Normal",
                            negocios: [],
                            negociosSeguidos: [], 
                            userStatus: "From Google",
                            fechaCreacion: new Date()
                        });
                        let cryptedPassword = newUserGoogle.generateHash(req.body.password);
                        console.log(cryptedPassword);
                        newUserGoogle['password'] = cryptedPassword;
                        console.log(newUserGoogle);
                        Usuario.insertMany(newUserGoogle)
                            .then(response=>{
                                console.log("crear ejecutado correctamente");
                                res.status(200).send({token:token});
                            })
                            .catch(error=>{
                                console.log("No creado");
                                console.log(error);
                                res.status(400).send('Error al crearT');
                            });
                    });//If the ID does not exist, create a new user with the google user data.
                //Generate JWT token

                //Respond that token
            })
            .catch(err => {
                res.status(401).send({msg: "Invalid token"});
            })
    },
    verUporMail: function(req,res){
        let emailQ = req.params.email;
        console.log(emailQ + " <- este fue el email");
        Usuario.findOne({email:emailQ})
            .populate("negocios")
            .then(response=>{
                console.log("VerT ejectudo correctamente");
                console.log(response);
                res.status(200).json(response);
            })
            .catch(error=>{
                res.status(400).send('Error al verT');
            });
    },
    crearU: function(req,res){
        /*
        const newUser= new Usuario({
            name:req.body.name,
            email: req.body.email,
            negocios: req.body.negocios
        })
        newUser.save()*/
        let newUser = new Usuario({
            bName: req.body.bName,
            email: req.body.email,
            password: req.body.password,
            userType: req.body.userType,
            negocios: req.body.negocios,
            negociosSeguidos: req.body.negociosSeguidos,
            userStatus: req.body.status,
            fechaCreacion: req.body.fechaCreacion
        })
        let cryptedPassword = newUser.generateHash(req.body.password);
        console.log(cryptedPassword);
        newUser['password'] = cryptedPassword;
        console.log(newUser);
        Usuario.insertMany(newUser)
        .then(response=>{
            console.log("crear ejecutado correctamente");
            console.log(response);
            res.status(200).json(response);
        })
        .catch(error=>{
            res.status(400).send('Error al crearT');
        });

    },
    actualizarU: function(req,res){
        const nuevoReemplazoDeUsuario = {
            bName: req.body.bName,
            email: req.body.email,
            password: req.body.password,
            userType: req.body.userType,
            negocios: req.body.negocios,
            negociosSeguidos: req.body.negociosSeguidos,
            userStatus : req.body.userStatus,
            fechaCreacion: req.body.fechaCreacion
        }
        Usuario.findByIdAndUpdate(req.params.id, nuevoReemplazoDeUsuario)
        .then(response=>{
            console.log("actualizarT ejectudo correctamente");
            console.log(response);
            res.status(200).json(response);
        })
        .catch(error=>{
            res.status(400).send('Error al actualizarT');
        });
    },
    eliminarU: function(req,res){
        Usuario.findByIdAndDelete({_id:req.params.id})
        .then(response=>{
            console.log("eliminarT ejectudo correctamente");
            console.log(response);
            res.status(200).json(response);
        })
        .catch(error=>{
            res.status(400).send('Error al eliminarT');
        });
    }
}

module.exports = tareasController;