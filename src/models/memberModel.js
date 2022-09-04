import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

const Member = sequelize.define(
  'member',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    github: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }
);

export default Member;
