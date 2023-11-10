const express = require('express')
const CourseModel = require('../models/courseModel')
const courseModel = require('../models/courseModel')
const mongoose = require('mongoose')
//definir el ruteador
const router = express.Router()

//traer todos los cursos
router.get('/' , async (req , res )=>{
    //utilizar el modelo
    //para seleccionar todos
    //los cursos en la bd

    try {
        const courses = await CourseModel.find()
        if(courses.length > 0){
            res.
            status(200).
            json({
                success: true,
                data: courses
            })
        }else{
            res.
            status(400).
            json({
                success: false,
                data: 'No hay cursos'
            })
        }
    } catch (error) {
        res.status(400)
        .json({
            success: false,
            message: error.message
        })
    }
})

//traer un curso por id
router.get('/:id' , async (req , res )=>{
    //extraer el id del curso
    //del parametro de la url
    try {
        courseId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(courseId)){
            res
            .status(500)
            .json({
                success: false,
                msg: "identificador invalido"
            })
        }else{
            const course = await courseModel.findById(courseId)
            if(course){
                res.
                status(200)
                .json({
                    success: true,
                    data: course
                })
            }else{
                res.
                status(400).
                json({
                    success: false,
                    message: `No hay curso cuyo id es: ${courseId}`
                })
            }
        }
    } catch (error) {
        res.status(400)
        .json({
            success: false,
            message: error.message
        })
    }
})

//crear un curso
router.post('/' , async (req , res )=>{
    //el nuevo curso vendra
    //a traves del body de la request
    try {
        const newCourse = await CourseModel.create(req.body)
        res.
        status(201)
        .json({
            success: true,
            data: newCourse
        })   
    } catch (error) {
        res.status(400)
        .json({
            success: false,
            message: error.message
        })
    }
})

//actualizar un curso por id
router.put('/:id' , async (req , res )=>{

    try {
        const courseId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(courseId)){
            res
            .status(500)
            .json({
                success: false,
                msg: "identificador invalido"
            })
        }else{
            const updCourse = await CourseModel.findByIdAndUpdate(courseId, req.body, {
                new: true
            })
            if(updCourse){
                res.
                status(200).
                json({
                    success: true,
                    data: updCourse
                })
            }else{
                res.
                status(400).
                json({
                    success: false,
                    message: `No hay curso cuyo id es: ${courseId}`
                })
            }
        }
    } catch (error) {
        res.status(400)
        .json({
            success: false,
            message: error.message
        })
    }
})

//eliminar un curso por id
router.delete('/:id' , async (req , res )=>{

    try {
        const courseId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(courseId)){
            res
            .status(500)
            .json({
                success: false,
                msg: "identificador invalido"
            })
        }else{
            const delCourse = await CourseModel.findByIdAndDelete(courseId, req.body, {
                new: true
            })
            if(delCourse){
                res.
                status(200).
                json({
                    success: true,
                    data: delCourse
                })
            }else{
                res.
                status(400).
                json({
                    success: false,
                    message: "Curso eliminado correctamente"
                })
            }
        }
    } catch (error) {
        res.status(400)
        .json({
            success: false,
            message: error.message
        })
    }
})
module.exports = router