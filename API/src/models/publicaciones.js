// Schema de los negocios para guardar en mongoDB
const {Schema, model} = require('mongoose');

const today = new Date();
const publicacionesSchema = new Schema({
    title: {type: String},
    description: {type:String},
    likes: {type: Number, default: 0},
    id_negocio: {
        type: Schema.ObjectId,
        ref: "negocios",
        required: true
    },
    fechaCreacion:{type: Date, default: today},
    url: {type: String},
    id_user: {type: String}
});

module.exports = model('publicaciones',publicacionesSchema);