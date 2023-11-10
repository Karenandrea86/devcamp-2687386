const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const conectarDB = require('./config/db')

//dependencias de rutas
const bootcampRoutes = require('./routes/bootcampRoutes')
const courseRoutes = require('./routes/coursesRoutes')
const reviewRoutes = require('./routes/reviewsRoutes')
//vincular en archivo .env
dotenv.config(
    { path : './config/.env' }
)

//CONECTAR A LA BD
conectarDB()

//construir objeto app
const app = express()
app.use(express.json())

//conectar las rutas
//al objeto
app.use('/api/v1/devcamp/bootcamps',
bootcampRoutes)

app.use('/api/v1/devcamp/courses',
courseRoutes)

app.use('/api/v1/devcamp/reviews',
reviewRoutes)



//rutas de prueba
app.get('/prueba' , (request , response) => {
    response .send("Hola")
})

app.get('/prueba/:id' , (request , response) => {
    response .send(`Hola , ${ request.params.id } `)
})

app.listen( process.env.PUERTO , () => {
    console.log(`Servidor en ejecucion: ${ process.env.PUERTO }`.bgYellow.green.bold )
})