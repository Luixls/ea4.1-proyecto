const express = require("express");
const router = express.Router();
const EventoController = require("../controllers/EventoController");
const { verificarTokenYRol } = require("../middlewares/authMiddleware");
const { validarEventos, validarAgregarEventos } = require("../middlewares/validacionMiddleware");

// No se requiere autenticación
router.get("/listar", EventoController.listar);
router.get(
  "/profesor/:idProfesor/:fechaInicio",
  EventoController.eventosFuturosProfesor
);

// Se requiere ser profesor o director
router.post(
  "/agregar",
  validarAgregarEventos,
  verificarTokenYRol(["Profesor", "Director"]),
  EventoController.agregar
);

// Se requiere ser profesor o director
router.put(
  "/editar/:id",
  validarEventos,
  verificarTokenYRol(["Director", "Profesor"]),
  (req, res, next) => {
    // Añadir una propiedad al objeto req para indicar si es profesor
    if (req.usuario.rol === "Profesor") {
      req.esProfesor = true; // Usamos esta propiedad para decidir si mostramos el mensaje de advertencia
    }
    next();
  },
  EventoController.editar
);

// Solo el director puede eliminar
router.delete(
  "/eliminar/:id",
  verificarTokenYRol(["Director"]),
  EventoController.eliminar
);

module.exports = router;
