const Product = require("../models/Product")

const getAllProductsStatic = async (req, res, next) => {
  
  const products = await Product.find({name: {$regex: 'Table', $options: 'i'}})

  res.send({products, count: products.length})


}
const getAllProducts = async (req, res, next) => {

  
  const { featured , company, name} = req.query;
  const queryObject = {};
  
  if (featured) queryObject.featured = featured
  if (company) queryObject.company = company;
  if (name) queryObject.name = {$regex: name, $options: 'i'}
  
  console.log(req.query);
  console.log(queryObject);

  const products = await Product.find(queryObject)

  res.send({ products, count: products.length })
  



}


module.exports = {
  getAllProductsStatic,
  getAllProducts
}