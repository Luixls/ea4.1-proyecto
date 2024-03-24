const express = require("express");
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
require("dotenv").config({ path: "./config/datos.env" });

// Importar enrutadores
const profesoresRouter = require("./routes/profesores");
const materiasRouter = require("./routes/materias");
const seccionesRouter = require("./routes/secciones");
const eventosRouter = require("./routes/eventos");
const trimestresRouter = require("./routes/trimestres");

// Utilizar los enrutadores
app.use("/profesores", profesoresRouter);
app.use("/materias", materiasRouter);
app.use("/secciones", seccionesRouter);
app.use("/eventos", eventosRouter);
app.use("/trimestres", trimestresRouter);

// Para iniciar el servidor "npx nodemon app.js"
const puerto = process.env.PORT || 3000;
app.listen(puerto, () => console.log(`Servidor corriendo en puerto ${puerto}`));
