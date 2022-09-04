/* eslint-disable no-console */
import app from './app.js';
import { sequelize } from './database/database.js';

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('✓ Se conectó a la base de datos');
});

app.listen(PORT, () => {
  console.log('✓ Servidor corriendo en el puerto ' + PORT);
});
