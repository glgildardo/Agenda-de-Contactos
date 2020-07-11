'use strict'

var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    lastname: String,
    phone: Number

});

module.exports = mongoose.model('contact', userSchema);    

