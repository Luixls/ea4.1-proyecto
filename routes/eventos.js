const express = require("express");
const router = express.Router();
const moment = require("moment");
const eventosController = require("../controllers/eventosController");
const {
  validarToken,
  validarTokenEventoGlobalNoGlobal,
} = require("../middlewares/validarTokens");
const {
  validarEvento,
  validarAsignarEventos,
} = require("../middlewares/validarEntradas");

// Rutas para Eventos
router.get("/listar", (req, res) => {
  eventosController
    .listarEventos()
    .then((eventos) => res.render("listarEventos", { eventos })) // Pasando los datos de eventos a la vista EJS
    .catch((err) => res.status(500).send("Error al obtener los eventos")); // OJO: Hace falta la validación para que solo se pueda visualizar eventos con tokens
});
router.post(
  "/agregar",
  validarEvento,
  validarTokenEventoGlobalNoGlobal,
  eventosController.agregarEvento
);
router.put(
  "/editar/:id",
  validarEvento,
  validarTokenEventoGlobalNoGlobal,
  eventosController.editarEvento
);
router.delete(
  "/eliminar/:id",
  validarToken(["director"]),
  eventosController.eliminarEvento
);
router.get("/profesores/:fechaConsulta", (req, res) => {
  const { fechaConsulta } = req.params;
  eventosController
    .proximosEventosProfesores(fechaConsulta)
    .then((eventos) => {
      res.render("eventosProfesores", { eventos, moment });
    })
    .catch((err) => res.status(500).send(err.error));
});
router.post(
  "/asignar",
  validarAsignarEventos,
  validarToken(["profesor", "director"]),
  eventosController.asignarEventosGenericos
);

module.exports = router;
