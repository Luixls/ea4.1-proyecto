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
const usuariosRouter = require("./routes/usuarios");

// Utilizar los enrutadores
app.use("/profesores", profesoresRouter);
app.use("/materias", materiasRouter);
app.use("/secciones", seccionesRouter);
app.use("/eventos", eventosRouter);
app.use("/trimestres", trimestresRouter);
app.use("/usuarios", usuariosRouter);

// Para crear al admin (director) predeterminado
const crearAdminPredeterminado = require("./scripts/inicializarAdmin");

// Automatizar creación de admin
crearAdminPredeterminado().then(() => {
  // Para iniciar el servidor "npx nodemon app.js"
  app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
  });
});
