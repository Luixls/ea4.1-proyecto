const express = require("express");
const router = express.Router();
const profesoresController = require("../controllers/profesoresController");
const { validarToken } = require("../middlewares/validarTokens");
const { validarProfesor } = require("../middlewares/validarEntradas");

// Rutas para Profesores
router.get(
  "/listar",
  validarToken(["director", "profesor", "estudiante"]),
  (req, res) => {
    profesoresController
      .listarProfesores()
      .then((profesores) => res.render("listarProfesores", { profesores }))
      .catch((err) => res.status(500).send(err.error));
  }
);
router.post(
  "/agregar",
  validarProfesor,
  validarToken(["director"]),
  profesoresController.agregarProfesor
);
router.put(
  "/editar/:id",
  validarProfesor,
  validarToken(["director"]),
  profesoresController.editarProfesor
);
router.delete(
  "/eliminar/:id",
  validarToken(["director"]),
  profesoresController.eliminarProfesor
);
router.get(
  "/detalles",
  validarToken(["director", "profesor", "estudiante"]),
  (req, res) => {
    profesoresController
      .listarProfesoresMateriasSecciones()
      .then((datos) => res.render("profesoresMateriasSecciones", { datos }))
      .catch((err) => res.status(500).send(err.error));
  }
);

module.exports = router;
