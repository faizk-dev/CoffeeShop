# Coffee Shop Ordering System
This project is a backend system for a coffee shop that allows customers to place orders, receive notifications when their orders are ready, and view the available items on the menu.

# Architecture and Technologies Used
This project was built with Node.js and MongoDB. The system uses the following technologies:

- Express.js - A lightweight framework for building 
- RESTful APIs in Node.js
- MongoDB - A NoSQL database for storing and retrieving data
- Mongoose - An object modeling tool for MongoDB that provides schema validation and a higher-level API for querying the database
- Postman - A tool for testing and documenting APIs
The system architecture consists of two main components:

- Database: MongoDB is used to store information about the coffee shop's menu items and orders.
- Users receive a notification when their order is ready using Twilio service

Backend server: An Express.js server handles incoming requests, communicates with the database, and sends notifications to customers when their orders are ready.

# Note 
Project will prepopulate some items by default in Database using `populate-db.ts`

## Tech Stack

* Node.js
* Typescript
* Express
* Twilio
* MongoDB

# Installation
1. Clone this repository.
2. Install dependencies by running npm install.
3. Create a .env file and configure your MongoDB connection string.
4. Run the application by running npm start.

# Configure your twilio settings .env
    TWILIO_ACCOUNT_SID=<Your Twilio account SID>
    TWILIO_AUTH_TOKEN=<Your Twilio auth token>
    TWILIO_PHONE_NUMBER=<Your Twilio phone number>

# Endpoints
The system has 5 endpoints:

- GET /items: Returns a list of all the items available on the menu.

- PUT /items/:itemId: Updates an item's discount information.

- POST /orders: Creates a new order and returns the order details.

- PUT /orders/:id: Updates an order's status and sends a notification to the customer if the status is set to "Ready".

- GET /orders/:id: Retrieves the details of a specific order.

## How to Use
    Clone the repository: git clone https://github.com/yourusername/coffee-shop-ordering-system.git

## Install the dependencies: 
    npm install

## Start the server: 
    npm start

### Use Postman to send requests to the server at http://localhost:3000.


### GET /items
Sends a GET request to http://localhost:3000/items to retrieve a list of all the items available on the menu.

### PUT /items/:itemId
Sends a PUT request to http://localhost:3000/items/:itemId to update an item's discount information. The request body should contain a JSON object with the following properties:

discountItemId (required): The ID of the item that is eligible for a discount when ordered with the item specified by itemId.
    
### POST /orders
Sends a POST request to http://localhost:3000/orders to create a new order. The request body should contain a JSON array of objects representing the items to be ordered. Each object should have the following properties:

itemId (required): The ID of the item to be ordered.
quantity (required): The number of items to be ordered.

### PUT /orders/:id
Sends a PUT request to http://localhost:3000/orders/:id to update an order's status. 

The request body should contain a JSON object with the following properties: status (required): The new status of the order (e.g. "Pending", "Ready", etc.).

### GET /orders/:id
Sends a GET request to http://localhost:3000/orders/:id to retrieve the details of a specific order. The response will be a JSON object representing the order, including the following properties:

items: An array of objects representing the items in the order, with the following properties:
name: The name of the item.
price: The price of the item.
quantity: The number of items ordered.
totalPrice: The total price of the order.
discountApplied: Whether a discount was applied to the order.