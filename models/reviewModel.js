const mongoose = require('mongoose')

//definir Schema reviews
const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Titulo es requerido"],
        unique: [true, "Titulo esta repetido"]
    },
    text: {
        type: String,
        required: [true, "Texto es requerido"],
        maxlength: [50, "No debe de contener mas de 50 caracteres"],
        minlength: [10, "Texto muy corto"]
    },
    rating: {
        type: Number,
        required: [true, "clasificación requerida"],
        maxlength: [10, "clasificación correcta"],
        minlength: [1, "clasificacion muy corta"]
    },
   
    createdAt: Date
})

module.exports = mongoose.model("Review", ReviewSchema)