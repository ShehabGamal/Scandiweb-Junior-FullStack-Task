# E-Commerce Shop
This project is a full-featured **E-Commerce Web Application** built using **React** for the frontend, **PHP** for backend APIs, and **GraphQL** for data querying. The shop offers a range of products in the categories of **Clothing** and **Technology** and supports key e-commerce functionality, including product browsing, cart management, and order placement.

## Table of Contents
- Project Overview
- Features
- Tech Stack
- Installation and Setup
- GraphQL API
- Components

## Project Overview
The E-Commerce Shop is designed to provide a seamless online shopping experience. Users can browse through a curated selection of Clothing and Tech products, view product details, customize attributes (like color or size), add items to a cart, and place an order. The application is built using a React frontend and a PHP backend with GraphQL to efficiently manage data queries and mutations.

## Features
- Product Browsing: Users can view products by categories such as Clothing and Tech.
- Product Details: Detailed views for each product, including descriptions, price, and customizable attributes (e.g., size, color).
- Cart Management: Add, update, and remove items in the cart.
- Order Placement: Place orders with selected cart items.

## Tech Stack
- Frontend: React (JavaScript), CSS
- Backend: PHP, GraphQL
- Database: MySQL
- APIs: GraphQL APIs for data fetching and mutation

## Installation and Setup
### Prerequisites
 - Node.js (for React frontend)
 - PHP (for backend server)
 - MySQL
### Steps
 1. Clone the repository:
  ```bash
  Copy code
  git clone https://github.com/your-username/e-commerce-shop.git
  cd Scandiwen Test Task
```
2.Install frontend dependencies:
  ```bash
Copy code
cd frontend
npm install
```
3. Set up the backend:
 - Ensure PHP is installed and configured.
 - Import the SQL database provided in /backend/database.sql (or create tables based on the schema).
 - Configure the database connection in backend/config.php.
 - Start the PHP server:
```bash
Copy code
cd ../backend
php -S localhost:8000
Configure GraphQL endpoints:
```
4. Set up GraphQL schema and resolvers in the backend (backend/graphql).
 - Specify the GraphQL endpoint in the frontend environment variables.
5. Run the frontend:
```bash
Copy code
cd ../frontend
npm start
```
6.Access the application:
 - Frontend: `http://localhost:3000`
 - Backend GraphQL API:`http://localhost:8000/graphql`

## GraphQL API
The backend uses GraphQL to manage queries and mutations. Key operations include:

- getProducts: Retrieves all products with their details.
- getProduct(id: ID!): Fetches a single product by ID.
- createOrder(items: String!, total_price: Float!): Places an order with the items and total price.

Sample GraphQL Query:

```graphql
Copy code
query {
  getProducts {
    id
    name
    category
    price
    attributes {
      name
      value
    }
  }
}
```
```Sample Mutation:

graphql
Copy code
mutation {
  createOrder(items: "Product1, Product2", total_price: 150.0) {
    items
    total_price
  }
}
```
