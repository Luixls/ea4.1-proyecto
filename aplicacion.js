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

// Enrutadores
const profesoresRouter = require("./routes/profesores");
const materiasRouter = require("./routes/materias");
const eventosRouter = require("./routes/eventos");
const seccionesRouter = require("./routes/secciones");
const calendarioRouter = require("./routes/calendario");
const usuariosRouter = require("./routes/usuarios"); // Nueva línea para los usuarios

// Indicar al sistema que estos son los enrutadores a utilizar
app.use("/profesores", profesoresRouter);
app.use("/materias", materiasRouter);
app.use("/eventos", eventosRouter);
app.use("/secciones", seccionesRouter);
app.use("/calendario", calendarioRouter);
app.use("/usuarios", usuariosRouter); // Nueva línea para los usuarios

// Para iniciar el servidor
const puerto = 3000;
app.listen(puerto, () => console.log("Servidor corriendo en puerto", puerto));
