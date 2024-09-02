const express = require('express')
const mongoose = require('mongoose')

const ClothingItemSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        price: Number,
        image: String,
      }
)

const ClothingItem = mongoose.model('ClothingItem', ClothingItemSchema)
module.exports = ClothingItem