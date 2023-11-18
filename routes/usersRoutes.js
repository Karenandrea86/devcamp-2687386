const express= require ('express')
const router  =express.Router()
const UserModel= require('../models/usersModel')
const mongoose=require('mongoose')

//registro de usuarios 
router.post('/register', async (req,res) => {
    try {
        const user = await UserModel.create(req.body)
        res.status(201).json({
            succes: true,
            data: user
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
        const user = await UserModel.findOne({email}).select("+password")
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
                return res.status(200).json({
                    succes: true,
                    msg: "Usuario logeado correctamente",
                    data: user
                })
            }else{
                return res.status(400).json({
                    succes: false,
                    message: "Credenciales incorrectas"
                })
            }
        }
    }
})

module.exports=router