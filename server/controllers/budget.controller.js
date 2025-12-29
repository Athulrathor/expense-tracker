const { Op } = require('sequelize');
const Budget = require('../models/budget.model.js');
const Expense = require('../models/expenses.model.js');

const getAllBudget = async (req, res) => {
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

        const budgets = await Budget.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            order: [['date', 'DESC']]
        });

        res.status(200).json({
            total: budgets.count,
            page: parseInt(page),
            limit: parseInt(limit),
            data: budgets.rows
        });

    } catch (error) {
        console.error('Filtered Budget Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const getBudgetById = async (req, res) => {
    const budgetId = req.params;

    try {

        if (!budgetId) {
            return res.status(401).json({ message: "Budget Id Missing!", success: false });
        }

        const userBudgetById = await User.findByPk(budgetId);

        if (!userBudgetById) {
            return res.status(401).json({ message: "User Budget Not Found!", success: false });
        }

        return res.status(200).json({ message: "User Budget Fetched Successfully!", userBudget: userBudgetById, success: true });

    } catch (error) {
        console.error('Get By Id Budget Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const registerBudget = async (req, res) => {

    const userId = req.user.id;
    const { amount, periodType, startDate, endDate } = req.body;

    try {

        if (!amount || !periodType || !startDate || !endDate) {
            return res.status(401).json({ message: "All Field Are Required!", success: false });
        }

        if (amount <= 0) {
            return res.status(200).json({ message: "Amount Must Be Greater Zero!", success: false });
        }

        const budget = await Budget.create({
            user_id: userId,
            amount: amount,
            period_type: periodType,
            start_date: startDate,
            end_date: endDate
        });

        res.status(200).json({ message: "Budget Added Successfully!", budget, success: true });

    } catch (error) {
        console.error('Budget Register Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const UpdateBudget = async (req, res) => {

    const userId = req.user.id;
    const budgetId = req.params;
    const { amount, periodType, startDate, endDate } = req.body;

    try {

        if (!amount || !periodType || !startDate || !endDate) {
            return res.status(401).json({ message: "All Field Are Required!", success: false });
        }

        if (amount <= 0) {
            return res.status(200).json({ message: "Amount Must Be Greater Zero!", success: false });
        }

        if (!budgetId) {
            return res.status(400).json({ message: "Budget Id Not Found!", success: false });
        }

        const updateBudgetUser = await Budget.update({
            amount: amount,
            period_type: periodType,
            start_date: startDate,
            end_date: endDate
        }, { where: { id: budgetId, user_id: userId } });

        if (!updateBudgetUser) {
            return res.status(500).json({ message: "Budget Update Error", success: false });
        }

        return res.status(200).json({ message: "User Budget Updated Successfully!", success: true });

    } catch (error) {
        console.error('Update Budget Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const deleteBudget = async (req, res) => {
    const userId = req.user.id;
    const budgetId = req.params;

    try {

        if (!budgetId) {
            return res.status(400).json({ message: "budget Id Not Found!", success: false });
        }

        const deleteBudgetUser = await Budget.delete({ where: { id: budgetId, user_id: userId } });

        if (!deleteBudgetUser) {
            return res.status(400).json({ message: "Error In Deleting Budget!", success: false });
        }

        res.status(200).json({ message: "User Budget Deleted Successfully!", success: true });

    } catch (error) {
        console.error('Delete Budget Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const getBudgetProgress = async (req, res) => {
    const budgetId = req.params.id;
    const userId = req.user.id;

    try {

        if (!budgetId) {
            return res.status(400).json({ message: "budget Id Not Found!", success: false });
        }

        const budget = await Budget.findOne({ where: { id: budgetId, user_id: userId } });

        if (!budget) {
            return res.status(404).json({ message: "Budget not found!", success: false });
        }

        const expenses = await Expense.findAll({
            where: {
                user_id: userId,
                date: {
                    [Op.between]: [budget.start_date, budget.end_date]
                }
            }
        });

        const spent = expenses.reduce((sum, attr) => sum + attr.amount, 0);
        const remaining = budget.amount - spent;
        const percentageUsed = ((spent / budget.amount) * 100).toFixed(2);

        return res.status(200).json({ message: "Budget progress fetched successfully!", budget: { id: budget.id, name: budget.name, limit: budget.amount, spent, remaining, percentageUsed, status: spent > budget.amount ? "over" : "within" }, success: true });

    } catch (error) {
        console.error('Budget Progress Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }

};

module.exports = {
    getAllBudget,
    getBudgetById,
    registerBudget,
    UpdateBudget,
    deleteBudget,
    getBudgetProgress
}