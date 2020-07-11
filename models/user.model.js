// Le pongo al archivo user.model para no confundirme con una vista o controlador
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Datos del modelo
var userSchema = Schema({
    name: String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    phone: Number,
    contacts: [{
        name: String,
        lastname: String,
        phone: Number
    }]
}) 

//Crear modelo
module.exports = mongoose.model('user', userSchema);