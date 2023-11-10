const mongoose = require('mongoose')

//definir Schema Course
const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [
            true,
            "Este atributo es requerido"
        ],
        maxlenght: [
            30, "Máximo 30 caracteres"
        ],
        min: [
            1111111111, "Mínimo 10 caracteres"
        ]
    },
    description: {
        type: String,
        required: [
            true,
            "Este atributo es requerido"
        ],
        min: [
            1111111111, "Mínimo 10 caracteres"
        ]
    },
    weeks: {
        type: Number,
        required: [
            true,
            "Este atributo es requerido"
        ],
        max: [
            999999999, "El número máximo de semanas para un curso es 9"
        ],
    },
    enroll_cost: {
        type: Number,
        required: [
            true,
            "Este atributo es requerido"
        ]
    },
    minimum_skill: {
        type: [
            String
        ],
        enum: [
            "Beginner",
            "Intermediate",
            "Advanced",
            "Expert"
        ]
    }
})

module.exports = mongoose.model("Course", CourseSchema)