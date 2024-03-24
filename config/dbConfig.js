// Requerir dotenv al inicio del archivo
require("dotenv").config({ path: "./datos.env" });

// Configuración de la base de datos usando variables de entorno
const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

module.exports = config;
