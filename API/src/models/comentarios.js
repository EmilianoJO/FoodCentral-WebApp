// Schema de los negocios para guardar en mongoDB
const {Schema, model} = require('mongoose');

const today = new Date();
const comentarioSchema = new Schema({
    userId: {
        type: [{
            type: Schema.ObjectId,
            ref: "usuarios"
        }]
    },
    comment: {type: String, required: true},
    response: {type: String, default:' '},
    negocioId: {
        type: [{
            type: Schema.ObjectId,
            ref: "negocios"
        }]
    },
    fechaCreacion:{type:Date, default:today}
});

module.exports = model('comentarios',comentarioSchema);