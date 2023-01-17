require('dotenv').config()

// add swagger-ui express
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger')
swaggerJsdoc = require('swagger-jsdoc')

// add Express and Mongoose
const express = require('express')
const mongoose = require('mongoose')

const app = express()

// database connection
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString)
const database = mongoose.connection

// database connection is successful or fails.
database.on('error', error => {
  console.log(error)
})
database.once('connected', () => {
  console.log('Database Connected')
})

app.use(express.json())

// Create a folder called routes
const routes = require('./routes/routes')
app.use('/api', routes)
// Custom swagger options
const useBasePath = true

// setup swagger-ui server
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// server start in port
app.listen(process.env.PORT, () => {
  console.log('The server started', process.env.PORT)
})
