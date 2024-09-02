const express = require('express')
const router = express.Router()
const {handleSearch} = require('../controllers/index')

router.get('/search' , handleSearch)

module.exports = router 