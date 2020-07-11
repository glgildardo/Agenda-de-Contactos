'use strict'

var express = require('express');/*Importar express */
var bodyParser = require('body-parser');/*Importar bodyParcer*/
var userRoutes = require('./routes/user.route');
var contactRoutes = require('./routes/contact.route');

var app = express(); /*Instancia de modulo express*/


//Parseo de js a json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Ruta y metodo de prueba
app.get('/prueba', (req, res)=>{
    res.status(200).send({message: "Ruta de prueba, Hola mundo!"});
});


//Configuracion de CORSfs
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/v1', userRoutes);
app.use('/v2', contactRoutes);

module.exports = app;
