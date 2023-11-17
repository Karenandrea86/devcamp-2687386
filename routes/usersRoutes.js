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
router.post('/login',(req,res) => {

    res.send('login')


})

module.exports=router