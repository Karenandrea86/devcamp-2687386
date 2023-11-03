const mongoose = require('mongoose')

const conectarDB = async() =>{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Mongodb Conectado".bgBlue.red)
}

module.exports = conectarDB