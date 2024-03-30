const express = require("express");
const router = express.Router();
const materiasController = require("../controllers/materiasController");
const { validarToken } = require("../middlewares/validarTokens");
const { validarMateria } = require("../middlewares/validarEntradas");

// Rutas para Materias
router.get("/listar", (req, res) => {
  materiasController
    .listarMaterias()
    .then((materias) => res.render("listarMaterias", { materias }))
    .catch((err) => res.status(500).send(err.error));
});
router.post(
  "/agregar",
  validarMateria,
  validarToken(["director"]),
  materiasController.agregarMateria
);
router.put(
  "/editar/:id",
  validarMateria,
  validarToken(["director"]),
  materiasController.editarMateria
);
router.delete(
  "/eliminar/:id",
  validarToken(["director"]),
  materiasController.eliminarMateria
);

module.exports = router;
