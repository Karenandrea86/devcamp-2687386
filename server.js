const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')

//vincular en archivo .env
dotenv.config(
    { path : './config/.env' }
)

//construir objeto app

app = express()

//rutas de prueba
app.get('/prueba' , (request , response) => {
    response .send("Hola")
})

app.get('/prueba/:id' , (request , response) => {
    response .send(`Hola , ${ request.params.id } `)
})

//rutas de bootcamps
app.get('/bootcamps' , (req , res )=>{
    res.json({
        success: true,
        msg: "aqui se mostraran todos los bootcamps"
    })
})

//traer un bootcamp por id
app.get('/bootcamps/:id' , (req , res )=>{
    res.json({
        success: true,
        msg: `aqui se mostrara bootcamp cuyo id es ${ req.params.id}`
    })
})

//crear un bootcamps
app.post('/bootcamps' , (req , res )=>{
    res.json({
        success: true,
        msg: "aqui se creara un bootcamp"
    })
})

//actualizar un bootcamp por id
app.put('/bootcamps/:id' , (req , res )=>{
    res.json({
        success: true,
        msg: `aqui se actualizara bootcamp cuyo id es ${ req.params.id}`
    })
})

app.listen( process.env.PUERTO , () => {
    console.log(`Servidor en ejecucion: ${ process.env.PUERTO }`.bgYellow.green.bold )
})