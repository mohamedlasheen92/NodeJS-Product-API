const Product = require("../models/Product")

const getAllProductsStatic = async (req, res, next) => {
  
  const products = await Product.find({
    price: { $gt: 50 },
    rating: {$gt: 4.5}
  }).sort('name').select('price rating')

  res.send({products, count: products.length})


}
const getAllProducts = async (req, res, next) => {

  
  const { featured , company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  
  if (featured) queryObject.featured = featured
  if (company) queryObject.company = company;
  if (name) queryObject.name = { $regex: name, $options: 'i' }
  if (numericFilters) {
    const operatorMapper = {
      '>': '$gt',
      '>=': '$gte',
      '<': '$lt',
      '<=': '$lte',
      '=': '$eq',
    }
    const regEx = /(<=|>=|<|>|=)/g
    let filters = numericFilters.replace(regEx, (match) => `-${operatorMapper[match]}-`)
    
    const options = ['price', 'rating']

    filters.split(',').forEach(item => {      
      const [field, operator, value] = item.split('-')
      
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      } else console.log(`Field "${field}" Not Exist for Numeric Filter`);
    })
  }
  
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

  
  const products = await result;
  res.json({ products, count: products.length })


}


module.exports = {
  getAllProductsStatic,
  getAllProducts
}