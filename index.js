'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

// Cree una promesa la cual se quedara esperando un evento 
mongoose.Promise = global.Promise;

// Crear conexion a base de datos
mongoose.connect('mongodb://localhost:27017/DBGildardoAlvarado',{useNewUrlParser: true, useUnifiedTopology: true})   /*{nuevo tipo de conexion}*/ /*{topologia unificada}*/
    .then(()=>{

        console.log('Conexion a la base de datos fue correcta');
        
        //Montar el servidor
        app.listen(port,()=>{
            console.log('El servidor de express esta corriendo en el puerto: ', port);
        })
    })
    .catch(err=>{
    })
