const express= require ('express')
const router  =express.Router()
const UserModel= require('../models/usersModel')
const mongoose=require('mongoose')

//registro de usuarios 
router.post('/register', async (req,res) => {
    try {
        const user = await UserModel.create(req.body)
        //crear token
        const token = user.generarJWT()
        res.status(201).json({
            succes: true,
            data: user,
            token_jwt: token
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: error.message
        })
    }
})

//Inicio de sesion 
router.post('/login', async (req,res) => {
    //1. NO LLEGA EMAIL O PASSWORD
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({
            succes: false,
            message: 'Faltan email o password'
        })
    }else{
        //2. SI LLEGA EMAIL, PERO EL USUARIO DE ESE EMAIL NO EXISTE
        const user = await UserModel.findOne({email}).
                                    select("+password")
        /*console.log(user)*/
        if(!user){
            return res.status(400).json({
                succes: false,
                message: 'El usuario no existe'
            })
        }else{
            //3. SI LLEGA EMAIL, Y EL USUARO EXISTE, PERO EL PASSWORD NO CORRESPONDE
            const isMatch = await user.compararPassword(password)
            if (isMatch){
                    const token =user.generarJWT()
                    //opciones para creacion de la cookie
                    const options ={
                        expires:new Date(
                                    Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 *60 *1000),
                        httpOnly: true,
                    }

                    return res.status(200).
                        cookie('token', token,  options).
                        json({
                            succes: true,
                            msg: "Usuario logeado correctamente",
                            data: user,
                            jwt_token: token
                })
            }else{
                return res.status(400).
                
                json({
                    succes: false,
                    message: "Credenciales incorrectas"
                })
            }
        }
    }
})

module.exports=router