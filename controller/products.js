const Product = require("../models/Product")

const getAllProductsStatic = async (req, res, next) => {
  
  const products = await Product.find({}).sort('-name -price')

  res.send({products, count: products.length})


}
const getAllProducts = async (req, res, next) => {

  
  const { featured , company, name, sort, fields } = req.query;
  const queryObject = {};
  
  if (featured) queryObject.featured = featured
  if (company) queryObject.company = company;
  if (name) queryObject.name = { $regex: name, $options: 'i' }
  
  let result = Product.find(queryObject)
  
  if (sort) {
    const filters = sort.split(',').join(' ')
    result = result.sort(filters)
  }
  if (fields) {
    const targets = fields.split(',').join(' ')
    result = result.select(targets)
  }
  
  const page = req.query.page || 1 
  const limit = req.query.limit || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  console.log(queryObject);
  console.log(req.query);
  
  
  
  const products = await result;
  res.json({ products, count: products.length })


}


module.exports = {
  getAllProductsStatic,
  getAllProducts
}