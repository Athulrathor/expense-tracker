const { Op } = require('sequelize');
const Income = require('../models/income.model.js');

const registerIncome = async (req, res) => {

    const {amount,source } = req.body;
    const userId = req.user.id;

    try {

        if (!amount || !source) {
            return res.status(400).json({message: "All Credential Are Required!",success: false});
        }

        if (amount <= 0) {
            return res.status(200).json({message: "Amount Must Be Greater Zero!",success:false});
        }

        const income = await Income.create({
            user_id: userId,
            amount:amount,
            source: source
        });

        if (!income) {
            return res.status(400).json({message: "Create Error!",success: false});
        }

        return res.status(200).json({message: "Income Added Successfully!",income: income,success: true});

    } catch (error) {
        console.error('Income Add error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const getAllIncome = async (req,res) => {

    const {
      userId,
      category,
      minAmount,
      maxAmount,
      startDate,
      endDate,
      page = 1,
      limit = 10
    } = req.query;

    try {

        const where = {};

        if (userId) {
            where.userId = userId;
        }

        if (category) {
            where.category = category;
        }

        if (minAmount || maxAmount) {
            where.amount = {};
            if (minAmount) where.amount[Op.gte] = minAmount;
            if (maxAmount) where.amount[Op.lte] = maxAmount;
        }

        if (startDate || endDate) {
            where.date = {};
            if (startDate) where.date[Op.gte] = startDate;
            if (endDate) where.date[Op.lte] = endDate;
        }

        const incomes = await Income.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            order: [['date', 'DESC']]
        });

        return res.status(200).json({
            total: incomes.count,
            page: parseInt(page),
            limit: parseInt(limit),
            data: incomes.rows
        });
        
    } catch (error) {
        console.error('Income Get error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }

};

const updateIncome = async (req,res) => {
    const {amount,source} = req.body;
    const userId = req.user.id;
    const incomeId = req.params;

    try {

        if (!incomeId) return res.status(400).json({message: "Income Id Not Found!",success: false});

        if (!amount || !source) {
            return res.status(400).json({message: "All Amount and Source Are Compulsary!",success: false});
        }

        if (amount <= 0) {
            return res.status(200).json({message: "Amount Must Be Greater Zero!",success:false});
        }

        const updateIncomeUser = await Income.update({amount: amount,source: source},{where: {id: incomeId,user_id: userId}});

        if (!updateIncomeUser) {
            return res.status(400).json({message: "Error In Updating User Income!",success: false});
        }

        return res.status(200).json({message: "User Income Updated Successfully!",success: true});
        
    } catch (error) {
        console.error('Income Update Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const deleteIncome = async (req,res) => {
    const userId = req.user.id;
    const incomeId = req.params;

    try {

        if (!incomeId) return res.status(400).json({message: "Income Id Not Found!",success: false});

        const deleteIncomeUser = await Income.delete({where: {id: incomeId,user_id: userId}});

        if (!deleteIncomeUser) {
            return res.status(401).json({message: "Error in deleting User Income!",success: false});
        }

        return res.status(200).json({message: "User Income Deleted Successfully!",success: true});
        
    } catch (error) {
        console.error('Income Delete Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

module.exports = { 
    registerIncome,
    getAllIncome,
    updateIncome,
    deleteIncome
 };