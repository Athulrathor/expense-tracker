const { sequelize } = require('../config/database');

// Import all models
const User = require('./User');
const Category = require('./Category');
const Expense = require('./Expense');
const Income = require('./Income');

// USER ASSOCIATIONS

User.hasMany(Category, {
    foreignKey: 'user_id',
    as: 'categories',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

User.hasMany(Expense, {
    foreignKey: 'user_id',
    as: 'expenses',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

User.hasMany(Income, {
    foreignKey: 'user_id',
    as: 'incomes',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// CATEGORY ASSOCIATIONS

Category.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
    onDelete: 'CASCADE'
});

Category.hasMany(Expense, {
    foreignKey: 'category_id',
    as: 'expenses',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Category.hasMany(Income, {
    foreignKey: 'category_id',
    as: 'incomes',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

// EXPENSE ASSOCIATIONS

Expense.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
    onDelete: 'CASCADE'
});

Expense.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',
    onDelete: 'RESTRICT'
});

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

module.exports = {
    sequelize,
    User,
    Category,
    Expense,
    Income
};