const ClothingItem = require('../models/index')

async function handleSearch(req, res) {
  try {
    const items = await ClothingItem.find({});
    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching items' });
  }
}

module.exports = {handleSearch}