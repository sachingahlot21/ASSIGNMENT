const ClothingItem = require('../models/index')

async function handleSearch(req, res) {
    const query = req.query.query || '';
    try {
      const items = await ClothingItem.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ],
      });
      res.json({ items });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {handleSearch}