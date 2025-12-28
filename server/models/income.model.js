const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database.js');

const Income = sequelize.define(
  'Income',
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

    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      // references: {
      //   model:'Category',
      //   key: 'id',
      // }
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    source: {
      type: DataTypes.STRING,
      allowNull: false,
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

module.exports = Income;