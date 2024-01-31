//Imports
const express = require('express');
const routes = require('./src/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketio = require('socket.io');
const multerS3 = require('multer-s3');
const { S3Client } = require("@aws-sdk/client-s3");
const request = require('request');
const multer = require('multer');
const aws = require('aws-sdk');
//Config para .env
require('dotenv').config();

//const path = require('path'); //usar si se necesita agrega carpeta de assets
const mongoose = require('mongoose');

//S3 storage with buckets
//Authentication
const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
 });

const businessPicturesBucket = process.env.BUSINESS_BUCKET_NAME;

const s3StorageBusinessPictures = multerS3({
    s3: s3,
    bucket: businessPicturesBucket,
    metadata: (req, file, cb) => {
      cb(null, { ...file });
    },
    acl: 'public-read',
    key: (req, file, cb) => {
        const name = file.originalname;
        //const ext = file.originalname.split('.').pop();
        cb(null, `${name}`);
    }
 });
 
const uploadBusinessPics = multer({storage: s3StorageBusinessPictures});
  
//Configuracion de Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerConf = require('./swagger.config');

//app de Express
const app = express();

//URL de mongo en .env
const mongoUrl = process.env.MONGO_URL;
console.log(mongoUrl);

//tomara valor del puerto desplegado PERO en local tomara 3000
const port = process.env.PORT || 3000; 

//ruta de swagger
const swaggerDocs = swaggerJsDoc(swaggerConf);
app.use('/swagger',swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Evitar undefined a la hora de consultar el body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Ruteo
app.use(cors());
app.use('',routes);
app.get('/',(req,res)=>{
    res.send('Ruta default / ');
});

app.post('/uploadBusinessPictures', uploadBusinessPics.single('image'), (req, res) => {
    console.log('Body: ', req.body, req.file.data);
    res.status(200).send({'Value':"OK!"});
});

app.get('*', function (req, res) { //Ruta por si no existe //COMODIN siempre va al FINAL
    res.send('Pagina no Encontrada!');
});

//Conexion con Mongoose, usando la url de MongoUrl por ejemplo del mongo atlas.
mongoose.connect(mongoUrl)
    .then(()=>{
        console.log('Se conecto a la base de datos (mongoose)');
        
    })
    .catch( err =>{
        console.log('No se pudo conectar a la base ded datos',err);
    });

//Socket
const server = app.listen(port,function(){
    console.log('app is running in port: ' + port);
});
const io = socketio(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    socket.on('newComment', (data)=>{
        socket.broadcast.emit(data, data);
    })
})
