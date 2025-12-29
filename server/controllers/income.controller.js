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

const getIncomeById = async (req, res) => {
    const incomeId = req.params;

    try {

        if (!incomeId) {
            return res.status(401).json({ message: "Income Id Missing!", success: false });
        }

        const userIncomeById = await User.findByPk(incomeId);

        if (!userIncomeById) {
            return res.status(401).json({ message: "User Income Not Found!", success: false });
        }

        return res.status(200).json({ message: "User Income Fetched Successfully!", userIncome: userIncomeById, success: true });

    } catch (error) {
        console.error('Get By Id Income Error:', error);
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

const bulkCreateIncome = async (req, res) => {
    const { incomes } = req.body;

    try {

        if (incomes === null || incomes === undefined) {
            return res.status(200).json({ message: "Incomes Array Missing!", success: false });
        }

        const userBulkCreate = await Income.bulkCreate(incomes, { validate: true });

        if (!userBulkCreate) {
            return res.status(401).json({ message: "Bulk Create Error", success: false });
        }

        return res.status(200).json({ message: "Bulk Income Created Successfully!", income: userBulkCreate, success: true });

    } catch (error) {
        console.error('Bulk Create Income Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const searchIncome = async (req, res) => {
    const {
        q,
        category,
        minAmount,
        maxAmount,
        startDate,
        endDate,
        page = 1,
        limit = 10,
        sortBy = "incomeDate",
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
            where.incomeDate = {};
            if (startDate) where.incomeDate[Op.gte] = startDate;
            if (endDate) where.incomeDate[Op.lte] = endDate;
        }

        const offset = (page - 1) * limit;

        const {rows,count} = await Income.findAndCountAll({where,
            limit: Number(limit),
            offset,
            order: [[sortBy, order]]
        });

        return res.status(200).json({message: "Income Search Filter Query Successfully!!",total: count,page: Number(page),pages: Math.ceil(count / limit),data: rows,success: true});

    } catch (error) {
        console.error('Search Query Income Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const incomeSource = async (req,res) => {
    const userId = req.user.id;

    try {
        
        const sources = await Income.findAll({ attributes: ["source"], where: { user_id: userId }, group: ["source"] });

        res.status(200).json({ message: "Income sources fetched successfully!", sources, success: true });

    } catch (error) {
        console.error('Source Group Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const exportIncomeDoc = async (req,res) => {

    const {format} = req.query || 'csv';
    const userId = req.user.id;

    try {
        
        const incomes = await Income.findAll({where: {user_id: userId}});

        if (!expenses) return res.status(401).json({message: "Income Not Found!",success: false});

        if (format === 'csv') {
            const fields = ["id", "title", "amount", "category", "date", "receipt"];
            const parser = new Parser({fields});
            const csv = parser.parse(incomes.map(attr => attr.toJSON()));

            res.header("Content-Type","text/csv");
            res.attachment("income.csv");

            return res.send(csv);
        }

        if (format === 'pdf') {
            const doc = new PDFDocument();

            res.header("Content-Type", "application/pdf");
            res.attachment("income.pdf");

            doc.pipe(res);
            doc.fontSize(18).text("Income Report",{align: "center"});
            doc.moveDown();

            expenses.forEach(attr => {
                doc.fontSize(12).text(`#${attr.id} | ${attr.title} | ₹${attr.amount} | ${attr.category} | ${attr.date.toDateString()}`)
            });

            doc.end();
            return;
        }

        return res.status(400).json({message: "Invalid format. Use ?format=csv or ?format=pdf",success: false});

    } catch (error) {
        console.error('Income Export Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

module.exports = { 
    registerIncome,
    getIncomeById,
    getAllIncome,
    updateIncome,
    deleteIncome,
    bulkCreateIncome,
    searchIncome,
    incomeSource,
    exportIncomeDoc
 };