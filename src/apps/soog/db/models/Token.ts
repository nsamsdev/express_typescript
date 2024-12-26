


import {  DataTypes, Op } from 'sequelize';


import sequelizeSoog from "../sequelize.js";

const Token = sequelizeSoog.define(
  "Token",
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    for: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    tableName: "tokens",
    indexes: [
      {
        unique: true,
        fields: ["token"], 
      },
    ],
    // Define the default scope
    defaultScope: {
      where: {
        isDeleted: 0,
        createdAt: {
          [Op.gt]: sequelizeSoog.literal("NOW() - INTERVAL 1 HOUR"),
        },
      },
    },
    // Additional scopes
    scopes: {
      withDeleted: {}, // Include all records, even those where isDeleted = 1
      recentOnly: {
        where: {
          createdAt: {
            [Op.gt]: sequelizeSoog.literal("NOW() - INTERVAL 1 HOUR"),
          },
        },
      },
    },
  }
);

export default Token;
