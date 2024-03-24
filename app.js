const express = require("express");
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
require("dotenv").config({ path: "./datos.env" });

// Importar las credenciales...
const mysql = require("mysql");
const dbConfig = require("./dbConfig");

// Crear el pool de conexiones
const pool = mysql.createPool({
  connectionLimit: 10, // Por ahora 10 conexiones, no importa mucho
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

// Comprobar conexión inicial
pool.getConnection((err, connection) => {
  if (err) {
    console.error("CONEXIÓN FALLIDA AL POOL, BD MySQL", err);
    return;
  }
  console.log("CONEXIÓN AL POOL DE LA BD MYSQL EXITOSA");
  connection.release(); // Devolver la conexión al pool
});

// Para iniciar el servidor
const puerto = 3000;
app.listen(puerto, () => console.log("Servidor corriendo en puerto", puerto));
