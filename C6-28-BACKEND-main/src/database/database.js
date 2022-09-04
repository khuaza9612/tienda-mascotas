import { Sequelize } from 'sequelize';

// SI VAS A EDITAR LAS SIGUIENTES LINEAS, CONSULTA CON JAMES NORIA.
export const sequelize = new Sequelize(
  'cnugzyep',
  'cnugzyep',
  'naXnq1RMdbaUf4YlKPuYpWrXlVCO1vCn',
  {
    host: 'rajje.db.elephantsql.com',
    dialect: 'postgres',
  }
);
