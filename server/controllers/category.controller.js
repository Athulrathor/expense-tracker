const Category = require('../models/category.model');

const registerCategory = async (req, res) => {

    const { } = req.body;

    try {

        
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

module.exports = { registerCategory };