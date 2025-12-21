
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database.js');
const { generateAvatarColor } = require('../utils/manageAvatarColor.utils.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    otpReset: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    otpExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: 'URL or path to user avatar image',
    },

    avatarColor: {
      type: DataTypes.STRING(7),
      allowNull: true,
      comment: 'Hex color code for avatar background',
    }
  },
  {
    freezeTableName: true,
    indexes: [
      { fields: ['email'] },
      { fields: ['username'] },
    ],

    hooks: {
      beforeCreate: (user, options) => {
        if (!user.avatar) {
          user.avatarColor = generateAvatarColor(user.id);
        }
      },
      beforeUpdate: (user, options) => {
        if (user.changed('avatar')) {
          if (user.avatar) {
            user.avatarColor = null;
          } else {
            user.avatarColor = generateAvatarColor(user.id);
          }
        }
      }
    }
  },
);

module.exports = User;
