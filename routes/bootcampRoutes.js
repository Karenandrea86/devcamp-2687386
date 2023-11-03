const express = require('express')
const BootcampModel = require('../models/bootcampModel')
const bootcampModel = require('../models/bootcampModel')
//definir el ruteador
const router = express.Router()

//traer todos los bootcamps
router.get('/' , async (req , res )=>{
    //utilizar el modelo
    //para seleccionar todos
    //los bootcamps en la bd
    const bootcamps = await BootcampModel.find()

    res.json({
        success: true,
        data: bootcamps
    })
})

//traer un bootcamp por id
router.get('/:id' , async (req , res )=>{
    //extraer el id del bootcamp
    //del parametro de la url
    bootcampId = req.params.id
    const bootcamp = await bootcampModel.findById(bootcampId)

    res.json({
        success: true,
        data: bootcamp
    })
})

//crear un bootcamps
router.post('/' , async (req , res )=>{
    //el nuevo bootcamp vendra
    //a traves del body de la request
    const newBootcamp = await BootcampModel.create(req.body)

    res.json({
        success: true,
        data: newBootcamp
    })
})

//actualizar un bootcamp por id
router.put('/:id' , async (req , res )=>{
    const bootcampId = req.params.id
    const updBootcamp = await BootcampModel.findByIdAndUpdate(bootcampId, req.body, {
        new: true
    })
    res.json({
        success: true,
        data: updBootcamp
    })
})

//eliminar un bootcamp por id
router.delete('/:id' , async (req , res )=>{
    const bootcampId = req.params.id
    const delBootcamp = await BootcampModel.findByIdAndDelete(bootcampId)
    res.json({
        success: true,
        data: delBootcamp
    })
})

module.exports = router