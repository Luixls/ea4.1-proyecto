const express = require("express");
const router = express.Router();
const materiasController = require("../controllers/materiasController");
const { validarToken } = require("../middlewares/validarTokens");
const { validarMateria } = require('../middlewares/validarEntradas');

// Rutas para Materias
router.get("/listar", materiasController.listarMaterias);
router.post("/agregar", validarMateria, validarToken(['director']), materiasController.agregarMateria);
router.put("/editar/:id", validarMateria, validarToken(['director']), materiasController.editarMateria);
router.delete("/eliminar/:id", validarToken(['director']), materiasController.eliminarMateria);

module.exports = router;
