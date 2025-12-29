
const { DataTypes, ENUM } = require('sequelize');
const { sequelize } = require('../config/database.js');

const Budget = sequelize.define(
  'Budget',
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
    },

    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

    period_type: {
        type: DataTypes.ENUM['MONTHLY', 'YEARLY', 'CUSTOM'],
        allowNull: false,
    },

    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    alert_threshold: {
        type: DataTypes.DECIMAL(5,2),
        defaultValue: 80.00,
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  },
);

module.exports = Budget;
