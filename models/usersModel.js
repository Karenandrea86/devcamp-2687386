const mongoose = require ('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require ('jsonwebtoken')

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nombre es requerido"]
     
    },
    email: {
        type: String,
        unique: [true, "email repetido"],
        required: [true, "email requerido"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "email inavalido"
        ]
    },
    password: {
        type: String,
        required: [true, "password requerido"],
        maxlength: [6, "password muy largo"],
        select: false
    },
    role: {
        type: String,
        enum: ["admin", "user","publisher"],
        default:"user"
    },


    createdAt: {
        type: Date,
        default:Date.now

    }

})

userShema.pre('save', async function(){

    //generar la sal 
    const sal=await bcryptjs.genSalt(10)
 //encriptar la password utilizando la sal 
    this.password=await bcryptjs.hash(this.password,sal)



})

//methodo para comparar password del usuario vs password del payload
userShema.methods.compararPassword = async function(password){
    return bcryptjs.compare(password, this.password)
}

module.exports = mongoose.model("User", userShema)