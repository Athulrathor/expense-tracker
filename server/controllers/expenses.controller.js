const { Op } = require('sequelize');
const Expense = require('../models/expenses.model.js');

const registerExpense = async (req, res) => {

    const userId = req.user.id;
    const {amount,description} = req.body;

    try {

        if (!amount || !description) {
            return res.status(401).json({message: "Amount And Description Are Required!",success: false});
        }

        if (amount <= 0) {
            return res.status(200).json({message: "Amount Must Be Greater Zero!",success:false});
        }

        const expense = await Expense.create({
            user_id: userId,
            amount:amount,
            description: description,
        });

        res.status(200).json({message: "Expense Added Successfully!", expense:expense,success: true});
        
    } catch (error) {
        console.error('Expense Register Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const getAllExpense = async (req,res) => {
    
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

        const expenses = await Expense.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            order: [['date', 'DESC']]
        });

        res.status(200).json({
            total: expenses.count,
            page: parseInt(page),
            limit: parseInt(limit),
            data: expenses.rows
        });
        
    } catch (error) {
        console.error('Filtered Expense Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const UpdateExpense = async (req,res) => {

    const userId = req.user.id;
    const expenseId = req.params;
    const {amount,description} = req.body;

    try {

        if (!amount || !description) {
            return res.status(401).json({message: "Amount And Description Are Required!",success: false});
        }

        if (amount <= 0) {
            return res.status(200).json({message: "Amount Must Be Greater Zero!",success:false});
        }
           
        if (!expenseId) {
            return res.status(400).json({message: "Expense Id Not Found!",success: false});
        }

        const updateExpenseUser = await Expense.update({amount:amount,description:description},{where: {id: expenseId,user_id: userId}});

        if (!updateExpenseUser) {
            return res.status(500).json({message: "SomeTing Went Wrong",success: false});
        }

        return res.status(200).json({message: "User Expense Updated Successfully!",success: true});

    } catch (error) {
        console.error('Update Expense Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const deleteExpense = async (req,res) => {
    const userId = req.user.id;
    const expenseId = req.params;

    try {
        
        if (!expenseId) {
            return res.status(400).json({message: "Expense Id Not Found!",success: false});
        }

        const deleteExpenseUser = await Expense.delete({where: {id: expenseId,user_id: userId}});

        if (!deleteExpenseUser) {
            return res.status(400).json({message: "Error In Deleting Expernse!",success: false});
        }

        res.status(200).json({message: "User Expense Deleted Successfully!",success: true});

    } catch (error) {
        console.error('Delete Expense Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

module.exports = {
    registerExpense,
    getAllExpense,
    UpdateExpense,
    deleteExpense
};