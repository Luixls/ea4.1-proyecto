const express = require("express");
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
require("dotenv").config({ path: "./config/datos.env" });

// Importar enrutadores
const profesoresRouter = require("./routes/profesores"); // Ejemplo de cómo importar tus rutas

// Utilizar los enrutadores
app.use("/profesores", profesoresRouter);

// Para iniciar el servidor
const puerto = process.env.PORT || 3000; // Usa el puerto del .env si está disponible
app.listen(puerto, () => console.log(`Servidor corriendo en puerto ${puerto}`));
