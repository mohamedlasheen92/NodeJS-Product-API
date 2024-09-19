require('dotenv').config()
require('./db/connect')
require('express-async-errors')

const express = require('express')
const app = express()

const notFound = require('./middlewares/not-found')
const errorHandler = require('./middlewares/error-handler')
const productsRouter = require('./routes/products')



app.use('/api/v1/products', productsRouter)


app.use(notFound)
app.use(errorHandler)


const PORT = 3000

app.listen(PORT, () => { 
  console.log(`Server is listening on PORT ${PORT}`);
 })