'use strict'
//Importar express
var express = require('express');

//Importo el controllador de usuarios
var userController = require('../controllers/user.controller.js');

// propiedad para utilizar las rutas de express
var api = express.Router();// Indico que utilizo el enrutador de express


api.get('/testController', userController.prueba); //Hago la ruta para el controllador
api.post('/saveUser', userController.saveUser); // Hago la ruta para guardar el usuario en el controllador
api.get('/getUsers', userController.getUsers); // Muestro los usuarios
api.get('/getUser/:id', userController.getUser); // Muestro un usuario
api.put('/updateUser/:id', userController.updateUser);
api.delete('/deleteUser/:id', userController.deleteUser);

/* Rutas User-Contact  */

api.put('/MeterContacto/:id', userController.MeterContacto);
api.put('/:idU/actualizarContacto/:idC', userController.actualizarContacto);
api.put('/:idU/EliminarContacto/:idC', userController.EliminarContacto);
api.get('/login', userController.login);
module.exports = api;