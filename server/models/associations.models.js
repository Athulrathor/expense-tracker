const { sequelize } = require('../config/database');

// Import all models

const User = require('./User.model.js');
const Category = require('./Category.model.js');
const Expense = require('./Expenses.model.js');
const Income = require('./Income.model.js');
const Budget = require('./Budget.model.js');

// USER ASSOCIATIONS

User.hasMany(Category, { foreignKey: 'user_id', as: 'categories', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Expense, { foreignKey: 'user_id', as: 'expenses', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Income, { foreignKey: 'user_id', as: 'incomes', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Budget, { foreignKey: 'user_id', as: 'budgets', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// CATEGORY ASSOCIATIONS 

Category.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' });
Category.hasMany(Expense, { foreignKey: 'category_id', as: 'expenses', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Category.hasMany(Income, { foreignKey: 'category_id', as: 'incomes', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Category.hasMany(Budget, { foreignKey: 'category_id', as: 'budgets', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// EXPENSE ASSOCIATIONS

Expense.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' }); 
Expense.belongsTo(Category, { foreignKey: 'category_id', as: 'category', onDelete: 'RESTRICT' });

// INCOME ASSOCIATIONS

Income.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
    onDelete: 'CASCADE'
});

Income.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',
    onDelete: 'RESTRICT'
});

// BUDGET ASSOCIATIONS

Budget.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Budget.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// EXPORT MODELS

module.exports = {
    sequelize,
    User,
    Category,
    Expense,
    Income,
    Budget
};