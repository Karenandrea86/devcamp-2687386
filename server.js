const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const conectarDB = require('./config/db')
const cookieParser =require('cookie-parser')

//dependencias de rutas
const bootcampRoutes = require('./routes/bootcampRoutes')
const courseRoutes = require('./routes/coursesRoutes')
const reviewRoutes = require('./routes/reviewsRoutes')
const userRoutes = require('./routes/usersRoutes')

//vincular en archivo .env
dotenv.config(
    { path : './config/.env' }
)

//CONECTAR A LA BD
conectarDB()

//construir objeto app
const app = express()
app.use(express.json())
app.use(cookieParser())




//conectar las rutas
//al objeto
app.use('/api/v1/devcamp/bootcamps',
bootcampRoutes)

app.use('/api/v1/devcamp/courses',
courseRoutes)

app.use('/api/v1/devcamp/reviews',
reviewRoutes)

app.use('/api/v1/devcamp/auth',
userRoutes)



app.listen( process.env.PUERTO , () => {
    console.log(`Servidor en ejecucion: ${ process.env.PUERTO }`.bgYellow.green.bold )
})