const Expense = require('../models/expense.model');
const { format, subMonths, startOfMonth, endOfMonth } = require('date-fns');

const getSpendingSummary = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.find({ user_id: userId });

        const totalSpent = expenses.reduce((sum, attr) => sum + attr.amount, 0);
        const avgSpent = expenses.length ? totalSpent / expenses.length : 0;
        const maxExpense = Math.max(...expenses.map(e => e.amount), 0);

        return res.status(200).json({
            message: "Spending Summary Fetched Successfully!",
            totalSpent,
            avgSpent,
            maxExpense,
            transactionCount: expenses.length,
            success: true
        });
    } catch (error) {
        console.error('Spending Summary Error:', error);
        return res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const getSpendingTrends = async (req, res) => {
    try {
        const userId = req.user.id;
        const months = 6;
        const trends = [];

        for (let i = months - 1; i >= 0; i--) {
            const monthStart = startOfMonth(subMonths(new Date(), i));
            const monthEnd = endOfMonth(monthStart);

            const expenses = await Expense.find({
                user_id: userId,
                date: { $gte: monthStart, $lte: monthEnd }
            });

            const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
            trends.push({
                month: format(monthStart, 'MMM yyyy'),
                amount: total
            });
        }

        return res.status(200).json({message: "User Spending Trends Fetched Successfully!",trends,success: true});
    } catch (error) {
        console.error('Spending Trends Error:', error);
        return res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const getCategoryBreakdown = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.find({ user_id: userId });

        const breakdown = expenses.reduce((acc, attr) => {
            acc[attr.category] = (acc[attr.category] || 0) + attr.amount;
            return acc;
        }, {});

        const data = Object.entries(breakdown).map(([category, amount]) => ({
            category,
            amount,
            percentage: ((amount / expenses.reduce((sum, e) => sum + e.amount, 0)) * 100).toFixed(2)
        }));

        return res.status(200).json({message: "Category Break Down Successfully!",break:data,success: true});

    } catch (error) {
        console.error('Category Break Down Error:', error);
        return res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const getPeriodComparison = async (req, res) => {
    try {
        const userId = req.user.id;
        const { period = 'month' } = req.query;

        const currentStart = period === 'month' ? startOfMonth(new Date()) : subMonths(new Date(), 1);
        const previousStart = subMonths(currentStart, 1);

        const currentExpenses = await Expense.find({
            userId,
            date: { $gte: currentStart }
        });

        const previousExpenses = await Expense.find({
            user_id: userId,
            date: { $gte: previousStart, $lt: currentStart }
        });

        const currentTotal = currentExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const previousTotal = previousExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const percentageChange = ((currentTotal - previousTotal) / previousTotal * 100).toFixed(2);

        return res.json({
            message: "User Periods Compared Successfully!",
            currentPeriod: currentTotal,
            previousPeriod: previousTotal,
            percentageChange,
            trend: currentTotal > previousTotal ? 'up' : 'down',
            success: true,
        });

    } catch (error) {
        console.error('Period Comparison Error:', error);
        return res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const getPredictions = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.find({ user_id: userId });

        const avgMonthly = expenses.length ? expenses.reduce((sum, exp) => sum + exp.amount, 0) / 6 : 0;
        const predictedNextMonth = (avgMonthly * 1.05).toFixed(2); // 5% increase assumption

        return res.json({
            message: "Predicted Expense Successfully!",
            predictedSpending: predictedNextMonth,
            confidence: '75%',
            recommendation: 'Based on current trends, maintain budget awareness',
            success: true,
        });
    } catch (error) {
        console.error('Analytical Prediction Error:', error);
        return res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

module.exports = {
    getSpendingSummary,
    getSpendingTrends,
    getCategoryBreakdown,
    getPeriodComparison,
    getPredictions
}