// Importar mysql y la configuración de la base de datos
const mysql = require("mysql");
const dbConfig = require("./dbConfig");

// Crear el pool de conexiones con la configuración importada
const pool = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexiones en el pool
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

// Comprobar conexión
pool.getConnection((err, connection) => {
  if (err) {
    console.error("CONEXIÓN FALLIDA AL POOL, BD MySQL", err);
    return;
  }
  console.log("CONEXIÓN AL POOL DE LA BD MYSQL EXITOSA");
  connection.release(); // Devolver la conexión al pool
});

module.exports = pool;
