
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database.js');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      FOREIGNKEYS: true,
      // references: {
      //   model: 'User',
      //   key: 'id'
      // },
      // onDelete: 'CASCADE',
      // onUpdate: 'CASCADE',
    },

    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      // FOREIGNKEYS: true,
      // references: {
      //   model: 'Category',
      //   key: 'id',
      // },
      // onDelete: 'RESTRICT',
      // onUpdate: 'CASCADE',
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now,
    },
  },
  {
    freezeTableName: true,
  },
);

module.exports = Expense;
