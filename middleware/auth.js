const jwt = require('jsonwebtoken');
const  usersModel = require('../models/usersModel');
const { request } = require('express');

//middleware para proteger rutas
//a usuarios no logeados

exports.protect = async(req, res, next) => {

    let token  
    //1. Verificar si existe el header 'Authorization'
    if( req.headers.authorization && 
        req.headers.authorization.
        startsWith('Bearer') ){
            token =req.
                headers.
                authorization.
                split(' ')[1]

    }
    if (!token){
        return res.status(401).json({
            success: false,
            msg:"Empty token "

        })
    } else {
        const decoded=jwt.verify(token,
            process.env.JWT_SECRET_KEY)
            //console.log(decoded)
            req.user =await  usersModel.findById(decoded.id)
            //redirigir a la ruta de crear bootcamps 
            next ()
    }
}

//middleware para proteger de ususarios
//que no tengan el rol especifico

exports.authorize = async(req, res, next) => {
    
}