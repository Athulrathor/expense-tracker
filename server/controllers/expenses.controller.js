const { Op } = require('sequelize');
const Expense = require('../models/expenses.model.js');
const fs = require("fs");
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");

const registerExpense = async (req, res) => {

    const userId = req.user.id;
    const { amount, description } = req.body;

    try {

        if (!amount || !description) {
            return res.status(401).json({ message: "Amount And Description Are Required!", success: false });
        }

        if (amount <= 0) {
            return res.status(200).json({ message: "Amount Must Be Greater Zero!", success: false });
        }

        const expense = await Expense.create({
            user_id: userId,
            amount: amount,
            description: description,
        });

        res.status(200).json({ message: "Expense Added Successfully!", expense: expense, success: true });

    } catch (error) {
        console.error('Expense Register Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const getExpenseById = async (req, res) => {
    const expenseId = req.params;

    try {

        if (!expenseId) {
            return res.status(401).json({ message: "Expense Id Missing!", success: false });
        }

        const userExpenseById = await User.findByPk(expenseId);

        if (!userExpenseById) {
            return res.status(401).json({ message: "User Expense Not Found!", success: false });
        }

        return res.status(200).json({ message: "User Expense Fetched Successfully!", userExpense: userExpenseById, success: true });

    } catch (error) {
        console.error('Get By Id Expense Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const getAllExpense = async (req, res) => {

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

const UpdateExpense = async (req, res) => {

    const userId = req.user.id;
    const expenseId = req.params;
    const { amount, description } = req.body;

    try {

        if (!amount || !description) {
            return res.status(401).json({ message: "Amount And Description Are Required!", success: false });
        }

        if (amount <= 0) {
            return res.status(200).json({ message: "Amount Must Be Greater Zero!", success: false });
        }

        if (!expenseId) {
            return res.status(400).json({ message: "Expense Id Not Found!", success: false });
        }

        const updateExpenseUser = await Expense.update({ amount: amount, description: description }, { where: { id: expenseId, user_id: userId } });

        if (!updateExpenseUser) {
            return res.status(500).json({ message: "SomeTing Went Wrong", success: false });
        }

        return res.status(200).json({ message: "User Expense Updated Successfully!", success: true });

    } catch (error) {
        console.error('Update Expense Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const deleteExpense = async (req, res) => {
    const userId = req.user.id;
    const expenseId = req.params;

    try {

        if (!expenseId) {
            return res.status(400).json({ message: "Expense Id Not Found!", success: false });
        }

        const deleteExpenseUser = await Expense.delete({ where: { id: expenseId, user_id: userId } });

        if (!deleteExpenseUser) {
            return res.status(400).json({ message: "Error In Deleting Expernse!", success: false });
        }

        res.status(200).json({ message: "User Expense Deleted Successfully!", success: true });

    } catch (error) {
        console.error('Delete Expense Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const bulkCreateExpense = async (req, res) => {
    const { expenses } = req.body;

    try {

        if (expenses === null || expenses === undefined) {
            return res.status(200).json({ message: "Expense Array Missing!", success: false });
        }

        const userBulkCreate = await Expense.bulkCreate(expenses, { validate: true });

        if (!userBulkCreate) {
            return res.status(401).json({ message: "Bulk Create Error", success: false });
        }

        return res.status(200).json({ message: "Bulk Expense Created Successfully!", expense: userBulkCreate, success: true });

    } catch (error) {
        console.error('Bulk Create Expense Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const searchExpense = async (req, res) => {
    const {
        q,
        category,
        minAmount,
        maxAmount,
        startDate,
        endDate,
        page = 1,
        limit = 10,
        sortBy = "expenseDate",
        order = "DESC"
    } = req.query;

    try {

        const where = {
            userId: req.user.id
        };

        if (q) {
            where[Op.or] = [
                { title: { [Op.iLike]: `%${q}%` } },
                { category: { [Op.iLike]: `%${q}%` } }
            ];
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
            where.expenseDate = {};
            if (startDate) where.expenseDate[Op.gte] = startDate;
            if (endDate) where.expenseDate[Op.lte] = endDate;
        }

        const offset = (page - 1) * limit;

        const {rows,count} = await Expense.findAndCountAll({where,
            limit: Number(limit),
            offset,
            order: [[sortBy, order]]
        });

        return res.status(200).json({message: "Expense Search Filter Query Successfully!",total: count,page: Number(page),pages: Math.ceil(count / limit),data: rows,success: true});

    } catch (error) {
        console.error('Search Query Expense Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const getReceipt = async (req,res) => {
    const expenseId = req.params;
    const receipt = req.file;

    try {

        if (!receipt) {
            return res.status(401).json({message: "Receipt Not Found!",success: false});
        }

        const expense = await Expense.findByPk(expenseId);

        if (!expense) { 
            return res.status(404).json({ message: "Expense not found!",success: false });
        }

        expense.receipt = receipt.path;
        await expense.save();

        return res.status(200).json({message: "Receipt Upload Successfully!",receipt,success: true});
        
    } catch (error) {
        console.error('Get Expense Receipt Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const exportExpenseDoc = async (req,res) => {

    const {format} = req.query || 'csv';
    const userId = req.user.id;

    try {
        
        const expenses = await Expense.findAll({where: {user_id: userId}});

        if (!expenses) return res.status(401).json({message: "Expense Not Found!",success: false});

        if (format === 'csv') {
            const fields = ["id", "title", "amount", "category", "date", "receipt"];
            const parser = new Parser({fields});
            const csv = parser.parse(expenses.map(attr => attr.toJSON()));

            res.header("Content-Type","text/csv");
            res.attachment("expense.csv");

            return res.send(csv);
        }

        if (format === 'pdf') {
            const doc = new PDFDocument();

            res.header("Content-Type", "application/pdf");
            res.attachment("expense.pdf");

            doc.pipe(res);
            doc.fontSize(18).text("Expense Report",{align: "center"});
            doc.moveDown();

            expenses.forEach(attr => {
                doc.fontSize(12).text(`#${attr.id} | ${attr.title} | ₹${attr.amount} | ${attr.category} | ${attr.date.toDateString()}`)
            });

            doc.end();
            return;
        }

        return res.status(400).json({message: "Invalid format. Use ?format=csv or ?format=pdf",success: false});

    } catch (error) {
        console.error('Expense Export Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

module.exports = {
    registerExpense,
    getExpenseById,
    getAllExpense,
    UpdateExpense,
    deleteExpense,
    bulkCreateExpense,
    searchExpense,
    getReceipt,
    exportExpenseDoc
};