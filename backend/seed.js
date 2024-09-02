// seed.js
const mongoose = require('mongoose');
const ClothingItem = require('../models/index')
require('dotenv').config();
const {connectToMongoDB} = require('./connection')



const items = [
  {
    name: 'Classic White T-Shirt',
    description: 'A comfortable and stylish white t-shirt.',
    price: 19.99,
    image: 'https://example.com/images/classic-white-tshirt.jpg'
  },
  {
    name: 'Blue Denim Jacket',
    description: 'A trendy blue denim jacket for casual outings.',
    price: 49.99,
    image: 'https://example.com/images/blue-denim-jacket.jpg'
  },
  {
    name: 'Red Summer Dress',
    description: 'A beautiful red dress perfect for summer.',
    price: 29.99,
    image: 'https://example.com/images/red-summer-dress.jpg'
  },
  {
    name: 'Black Leather Boots',
    description: 'Durable and stylish black leather boots.',
    price: 89.99,
    image: 'https://example.com/images/black-leather-boots.jpg'
  }
];

const seedDB = async () => {
  try {

    await connectToMongoDB(`${process.env.MONGO_URI}/cloth_shop`)
    .then(()=> console.log("mongodb connected"))
    .catch((err) => console.log("error..." , err))
    
    await ClothingItem.deleteMany({});

    await ClothingItem.insertMany(items);
    
    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding the database:', error.message);
    process.exit(1);
  }
};

seedDB();
