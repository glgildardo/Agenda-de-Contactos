'use strict'

var express = require('express');
var contactController = require('../controllers/contact.controller');

var api = express.Router();

api.post('/saveContact', contactController.saveContact);
api.put('/actualizar', contactController.ActualizarContacto);
api.get('/buscar/:id', contactController.buscarContacto);
api.get('/listar', contactController.listarContactos);
api.delete('/eliminar/:id', contactController.eliminarContacto);
module.exports = api;