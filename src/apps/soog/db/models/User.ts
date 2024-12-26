


import {  DataTypes, Op } from 'sequelize';



import sequelizeSoog from "../sequelize.js";

const User = sequelizeSoog.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    adminUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isActivated: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    isDeleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    tableName: "users",
    indexes: [
      {
        unique: true,
        fields: ["email"], // Explicit unique index for the email field
      },
    ],
    // Define the default scope
    defaultScope: {
      where: {
        isDeleted: 0,
      },
    },
    // Additional scopes
    scopes: {
      withClosed: {}, // Include all records, even those where isClosed = 1
    },
  }
);

export default User;
