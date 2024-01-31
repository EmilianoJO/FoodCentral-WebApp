// Schema de los negocios para guardar en mongoDB
const {Schema, model} = require('mongoose');

const today = new Date();
const negocioSchema = new Schema({
    name: {type: String},
    averageNote: {type:Number, default: 0},
    address: {type: String},
    description: {type: String, default: ''},
    openTime: {type: String, default:"No proporcionado"},
    closeTime: {type: String, default:"No proporcionado"},
    mediaPieceFormat: {type:String, default:"jpg"},
    id_user: {type:String},
    fechaCreacion:{type:Date, default:today}    
});

module.exports = model('negocios',negocioSchema);