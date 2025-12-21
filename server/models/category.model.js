
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database.js');

const Category = sequelize.define(
  'Category',
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
      // references: {
      //   model: 'User',
      //   key: 'id'
      // },
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM('income', 'expance'),
      allowNull: false,
    },

  },
  {
    freezeTableName: true,
  },
);

module.exports = Category;
