'use strict'

// Importancion del modelo de contacto
var Contact = require('../models/contact.model');

function saveContact(req, res){
// Instancias de contacto
    var contact = new Contact();
// Captura de datos 
    var params = req.body;
    //Validacion de que me lleguen los datos obligatorios
    if(params.name && params.phone){
        Contact.findOne({phone: params.phone}, (err,phoneExist) =>{
            if(err){
                res.status(500).send({message: 'Error al registrar'});
            }else if(phoneExist){
                res.status(200).send({message: 'Número ya registrado'});
            }else{
                contact.name = params.name;
                contact.lastname = params.lastname;
                contact.phone = params.phone;

                contact.save((err, contactSaved) =>{
                    if(err){
                        res.status(500).send({message: 'Error al registrar'});
                    }else if(contactSaved){
                        res.status(200).send({message: 'Guardado exitoso'});
                    }else{
                        res.status(404).send({message: 'No se pudo guardar'});
                    }
                })
            }
        })
    }else{
        res.status(200).send({message: 'Ingrese todos los campos obligatorios'});
    }
}

function listarContactos(req, res){
    Contact.find({}).exec((err, lista) =>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else if(lista){
            res.status(200).send({message: "Eliminacion exitosa"});
        }else{
            res.status(200).send({message: "No hay registros"});
        }    
    })
    
}

function buscarContacto(req, res){
    var userId = req.params.id;

    Contact.findById(userId).exec((err, busqueda) =>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else if(busqueda){
            res.status(200).send({busqueda: busqueda});
        }else{
            res.status(404).send({message:"No se encontro el usuario"});
        }
    })
}

function ActualizarContacto(req, res){
    var update = req.body;
    var userId = req.params.id;

    Contact.findByIdAndUpdate(userId, update, {new: true},(err,actualizado) =>{
        if(err){
            res.status(500).send({err: "Error general"});
        }else if(actualizado){
            res.status(200).send({actualizado: actualizado});
        }else{
            res.status(404).send({message: "No se pudo actualizar"});
        }

    });
}

function eliminarContacto(req, res){
    var userId = req.params.id;
    var remove = req.body;

    Contact.findByIdAndRemove(userId, remove, (err, Eliminado) =>{
        if(err){
            res.status(500).send({err: "Error en el servidor"});
        }else if(Eliminado){
            res.status(200).send({Eliminado: Eliminado} );
        }else{
            res.status(404).send({message: "No se encontraron registros"});
        }
    });
}

module.exports = {
    saveContact,
    listarContactos,
    buscarContacto,
    ActualizarContacto,
    eliminarContacto
}