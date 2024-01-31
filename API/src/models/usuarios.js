//Model usuarios
const {Schema, model} = require('mongoose');

const bcrypt = require('bcrypt-nodejs');

const today = new Date();
const usuarioSchema = new Schema({
    bName: {type: String, required: true},
    email: {type:String, required: true},
    password: {type: String, required: true},
    userType: {
        type: String,
        enum: ['Normal', 'Owner', 'SuperUser'],
        required: true
    },
    negocios:{
        type: [{
            type: Schema.ObjectId,
            ref: "negocios"
        }]
    },
    negociosSeguidos:{
        type: [{
            type: Schema.ObjectId,
            ref: "negocios"
        }]
    },
    userStatus :{type: String, default:'new'},
    fechaCreacion:{type:Date, default:today}
});

usuarioSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

usuarioSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

module.exports = model('usuarios',usuarioSchema);