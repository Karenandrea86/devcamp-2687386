const express = require('express')
const ReviewModel = require('../models/reviewModel')
const reviewModel = require('../models/reviewModel')
const mongoose = require('mongoose')
//definir el ruteador
const router = express.Router()

//traer todos los bootcamps
router.get('/' , async (req , res )=>{
    //utilizar el modelo
    //para seleccionar todos
    //los bootcamps en la bd

    try {
        const reviews = await ReviewModel.find()
        if(reviews.length > 0){
            res.
            status(200).
            json({
                success: true,
                data: reviews
            })
        }else{
            res.
            status(400).
            json({
                success: false,
                data: 'No hay reseñas'
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

//traer un bootcamp por id
router.get('/:id' , async (req , res )=>{
    //extraer el id del bootcamp
    //del parametro de la url
    try {
        reviewId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            res
            .status(500)
            .json({
                success: false,
                msg: "identificador invalido"
            })
        }else{
            const review = await reviewModel.findById(reviewId)
            if(review){
                res.
                status(200)
                .json({
                    success: true,
                    data: review
                })
            }else{
                res.
                status(400).
                json({
                    success: false,
                    message: `No hay reseñas cuyo id es: ${reviewId}`
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

//crear un bootcamps
router.post('/' , async (req , res )=>{
    //el nuevo bootcamp vendra
    //a traves del body de la request
    try {
        const newReview = await ReviewModel.create(req.body)
        res.
        status(201)
        .json({
            success: true,
            data: newReview
        })   
    } catch (error) {
        res.status(400)
        .json({
            success: false,
            message: error.message
        })
    }
})

//actualizar un bootcamp por id
router.put('/:id' , async (req , res )=>{

    try {
        const reviewId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            res
            .status(500)
            .json({
                success: false,
                msg: "identificador invalido"
            })
        }else{
            const updReview = await ReviewModel.findByIdAndUpdate(reviewId, req.body, {
                new: true
            })
            if(updReview){
                res.
                status(200).
                json({
                    success: true,
                    data: updReview
                })
            }else{
                res.
                status(400).
                json({
                    success: false,
                    message: `No hay reseñas cuyo id es: ${reviewId}`
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