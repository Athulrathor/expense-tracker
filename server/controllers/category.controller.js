const Category = require('../models/category.model');

const registerCategory = async (req, res) => {

    const { name,type} = req.body;
    const userId = req.user.id;

    try {

        if (!name || !type) {
            return res.status(401).json({message: "Name And Type Are Required!",success: false});
        }

        const category = await Category.create({
            user_id: userId,
            name: name,
            type: type,
        });

        if (!category) {
            return res.status(402).json({message: "Category Error",success: false});
        }

        return res.status(200).json({message: "Category Added Successfully!",category:category,success: true});

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const getAllCategory = async (req,res) => {
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

        const categoryUser = await Income.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            order: [['date', 'DESC']]
        });

        return res.status(200).json({
            total: categoryUser.count,
            page: parseInt(page),
            limit: parseInt(limit),
            data: categoryUser.rows
        });
        
    } catch (error) {
        console.error('Category Get Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const updateCategory = async (req,res) => {
    const {name,type} = req.body;
    const userId = req.user.id;
    const categoryId = req.params;

    try {

        if (!categoryId) return res.status(400).json({message: "Income Id Not Found!",success: false});

        if (!name || !type) {
            return res.status(400).json({message: "Name and Type Are Compulsary!",success: false});
        }

        const updateCategoryUser = await Category.update({name: name,type: type},{where: {id: categoryId,user_id: userId}});

        if (!updateCategoryUser) {
            return res.status(400).json({message: "Error In Updating User Category!",success: false});
        }

        return res.status(200).json({message: "User Category Updated Successfully!",success: true});
        
    } catch (error) {
        console.error('Category Update Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const deleteCategory = async (req,res) => {
    const userId = req.user.id;
    const categoryId = req.params;

    try {

        if (!categoryId) return res.status(400).json({message: "Category Id Not Found!",success: false});

        const deleteCategoryUser = await Category.delete({where: {id: categoryId,user_id: userId}});

        if (!deleteCategoryUser) {
            return res.status(401).json({message: "Error in deleting User Category!",success: false});
        }

        return res.status(200).json({message: "User Category Deleted Successfully!",success: true});
        
    } catch (error) {
        console.error('Category Delete Error:', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

module.exports = { 
    registerCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
};