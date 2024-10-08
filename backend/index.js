const express = require('express')

const {connectToMongoDB} = require('./connection')
require('dotenv').config();

const app = express()

const cors = require('cors')

const PORT = 8000

const clothingRoute = require('./routes/index')

app.use(cors())

connectToMongoDB(`${process.env.MONGO_URI}/cloth_shop`)
.then(()=> console.log("mongodb connected"))
.catch((err) => console.log("error..." , err))


app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use('/' , clothingRoute)

app.listen(PORT , () => console.log("APP STARTED AT PORT : " , PORT))