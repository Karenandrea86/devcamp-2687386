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
        maxlenght: [50, "No debe de contener mas de 50 caracteres"],
        minlenght: [10, "Texto muy corto"]
    },
    rating: {
        type: Number,
        required: [true, "clasificación requerida"],
        maxlenght: [10, "clasificación correcta"],
        minlenght: [1, "clasificacion muy corta"]
    },
   
    createdAt: Date
})

module.exports = mongoose.model("Review", ReviewSchema)