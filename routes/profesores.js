const express = require("express");
const router = express.Router();
const profesoresController = require("../controllers/profesoresController");
const { validarToken } = require("../middlewares/validarTokens");
const { validarProfesor } = require("../middlewares/validarEntradas");

// Rutas para Profesores
router.get("/listar", (req, res) => {
  profesoresController
    .listarProfesores()
    .then((profesores) => res.render("listarProfesores", { profesores }))
    .catch((err) => res.status(500).send(err.error));
}); // Luego validaremos validarToken(['director', 'profesor', 'estudiante'])
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

module.exports = router;
