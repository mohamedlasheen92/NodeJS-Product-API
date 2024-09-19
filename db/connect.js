const mongoose = require('mongoose')
const Product = require('../models/Product')

const initialProducts = require('../products.json')


mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected on Database Successfully!')
    await Product.deleteMany()
    await Product.create(initialProducts)
  })
  .catch((reason) => { 
    console.log(reason)
    process.exit(1)
  })