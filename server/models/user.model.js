
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

    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: 'URL or path to user avatar image',
    },

    avatarId: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Unique identifier for the avatar in the storage service',
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
          user.avatarId = null;
        }
      },
      afterCreate: (user, options) => {
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
