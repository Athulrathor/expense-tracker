const Income = require('../models/income.model.js');

const registerIncome = async (req, res) => {

    const { } = req.body;

    try {


    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

module.exports = { registerIncome };