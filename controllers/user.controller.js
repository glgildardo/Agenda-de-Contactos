'user strict'

function prueba(req,res){
    res.status(200).send({message:"Ruta de acceso desde el controllador"});
}


var User = require('../models/user.model');
var Contact = require('../models/contact.model');

function saveUser (req, res){
    var user = new User();
    var params = req.body;

    if(params.name && params.lastname && params.username && params.password && params.email){
            
        User.findOne({username: params.username}, (err,usernameFind)=>{ // username: (Revisa en la columna de la base de datos que el dato siguiente no se repita) params.userna    me 
            if(err){
                res.status(500).send({message: 'Error generar'});
            }else if(usernameFind){
                res.status(200).send({message: 'Nombre de usuario existente'})
            }else{

            user.name = params.name;
            user.lastname = params.lastname;
            user.username = params.username;
            user.password = params.password;
            user.email = params.email;

            user.save((err, userSave)=>{
                if(err){
                    res.status(500).send({message: 'Error del servidor, Intente de nuevo más tarde'});
                }else{
                    if(userSave){
                        res.status(200).send({user: userSave});
                    }else{
                        res.status(200).send({err: 'Usuario no guardado'});
                    }
                }
            });

            }
        })

    }else{
        res.status(200).send({message: 'Ingresa todos los campos requeridos'});
    }

}

function getUsers(req,res){
    User.find({}).exec((err, users)=>{ // User tiene contenida la direccion del model y asi se hace referencia a el modela de la base de datos 
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(users){
                res.status(200).send({users: users});
            }else{
                res.status(200).send({message: 'No hay registros'});
            }
            
        }
    });

}

function getUser(req, res){
    var userId = req.params.id; // Consulta de postman o cualquir lado - params son los parametros - id es el id del registro solisitado

    User.findById(userId).exec((err, user)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(user){
                res.status(200).send({user:user});
            }else{
                res.status(404).send({message: 'No se encontro el usuario'});
            }
        }
    });

}

function updateUser(req, res){
        var userId = req.params.id;
        var update = req.body;

        User.findByIdAndUpdate(userId, update, {new: true},(err, userUpdate)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else{
                if(userUpdate){
                    res.status(200).send({userUpdate: userUpdate});
                }else{
                    res.status(404).send({message: 'No se actualizo'});
                }
            }
        });
}

function deleteUser(req,res){
    var userId = req.params.id;
    var deleteUser = req.body;

    User.findByIdAndRemove(userId, deleteUser ,(err,delet)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(delet){
                res.status(200).send({message: 'Eliminacion exitosa'});
            }else{
                res.status(404).send({message: 'No se pudo eliminar'});
            }
        }
    });
}


/* FUNCIONES DE USUARIO-CONTACTO (Documentos embedidos) = "Que un documento este dentro de otro"*/

function MeterContacto(req, res){
    let userId = req.params.id;    //Le meto a UserId la url 
    let paramsContact = req.body;  //Le meto a paramsContact el formulario que se esta llenando
    let contact = new Contact(); //Instancia de contactos en java script al modelo

    User.findById(userId, (err, userOk) =>{
        if(err){
            res.status(500).send({err: "Error general"});
        }else if(userOk){
            if(paramsContact.name && paramsContact.phone){
                contact.name = paramsContact.name;
                contact.lastname = paramsContact.lastname;
                contact.phone = paramsContact.phone;

                User.findByIdAndUpdate(userId, {$push:{contacts: contact}},{new: true}, (err, userUpdate) =>{
                    if(err){
                        res.status(500).send({err: "Error del servidor"});
                    }else if(userUpdate){
                        res.status(200).send({userUpdate: userUpdate});
                    }else{
                        res.status(404).send({message: "No se a podido actualizar"});
                    }
                })
            }else{
                res.status(200).send({message: "Ingrese los parametros necesarios"})
            }

        }else{
            res.status(404).send({message: "Usuario Inexistente"})
        }
    })
}

function actualizarContacto(req, res){
    let userId = req.params.idU;
    let contactId = req.params.idC;
    let update = req.body;

    User.findOne({_id:userId}, (err, userOk) =>{
        if(err){
            res.status(500).send({message: "Error general"});
        }else if(userOk){
            User.findOneAndUpdate({_id:userId, 'contacts._id': contactId}, {'contacts.$.name': update.name, 'contacts.$.lastname': update.lastname, 'contacts.$.phone': update.phone},
             {new: true}, (err, UserUpdate) =>{
                if(err){
                    res.status(500).send({err: 'Error general'});
                }else if(UserUpdate){
                    res.status(200).send({usuario: UserUpdate});
                }else{
                    res.status(404).send({message: "No se logro actualizar"});
                }
            });
        }else{
            res.status(200).send({err: 'Usuario no existente'});
        }
    })
}

function EliminarContacto(req, res){
    let userId = req.params.idU;
    let contactId = req.params.idC;

    User.findOneAndUpdate({_id: userId, 'contacts._id':contactId}, {$pull:{contacts:{_id:contactId}}}, {new:true}, (err,userUpdate) =>{
        if(err){
            res.status(500).send({err: "Error general"});
        }else if(userUpdate){
            res.send({user: userUpdate});
        }else{
            res.status(404).send({message: "Contacto no eliminado"});
        }
    });
}

function login(req, res){
    let contact = new Contact();
    let params = req.body

    User.findOne({username: params.username, password: params.password}, (err, success) =>{
        if(err){
            res.status(500).send({err: "Error general"});
        }else if(success){
            res.send({message: "Bienvenido !"});
        }else{
            res.status(404).send({message:"No se pudo ingresar"})
        }
    });
}

module.exports = {
    prueba,
    saveUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    MeterContacto,
    actualizarContacto,
    EliminarContacto,
    login
}

