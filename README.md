# Node.js Product API

This is a simple Node.js project that provides an API to retrieve product data from a MongoDB database. The API includes filtering, sorting, pagination, and numeric filtering options.

## Features

- Fetch all products with optional filters such as:
  - `featured`
  - `company`
  - `name`
  - Numeric filters on `price` and `rating`
  
- Sort products by any field (e.g., `price`, `name`, etc.)
- Select specific fields to display (e.g., `price`, `rating`)
- Pagination (supports `page` and `limit` queries)
  
## Endpoints

### Get All Products (Static)

**URL**: `/api/v1/products/static`

Returns products with hardcoded filters (`price` greater than 50 and `rating` greater than 4.5).

**Example Request**:
```bash
GET /api/v1/products/static
```

**Response**:
```json
{
  "products": [
    {
      "_id": "60a6f9f92570d20c34b5e234",
      "price": 75.99,
      "rating": 4.8
    },
    ...
  ],
  "count": 10
}
```

### Get All Products (Dynamic)

**URL**: `/api/v1/products`

Supports filtering, sorting, field selection, and pagination through query parameters.

**Query Parameters**:
- `featured`: boolean filter for featured products.
- `company`: filter by product company.
- `name`: search by name with partial matches.
- `sort`: sort products by field(s). Use `,` for multiple fields.
- `fields`: select specific fields to return.
- `page`: page number for pagination.
- `limit`: number of products per page.
- `numericFilters`: filter on `price` or `rating` with operators (`>`, `<`, `>=`, `<=`, `=`).

**Example Request**:
```bash
GET /api/v1/products?featured=true&company=Apple&sort=price,rating&fields=name,price&numericFilters=price>50,rating>=4.5&page=1&limit=10
```

**Response**:
```json
{
  "products": [
    {
      "_id": "60a6f9f92570d20c34b5e234",
      "name": "iPhone 12",
      "price": 799
    },
    ...
  ],
  "count": 10
}
```

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mohamedlasheen92/NodeJS-Product-API.git
   cd NodeJS-Product-API
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following:
   ```bash
   MONGO_URI=<your-mongodb-uri>
   PORT=5000
   ```

4. **Run the project**:
   ```bash
   npm start
   ```

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database used to store product data.
- **Mongoose**: MongoDB object modeling for Node.js.
