const express = require("express");
const router = express.Router();
const materiasController = require("../controllers/materiasController");
const { validarToken } = require("../middlewares/validarTokens");

// Rutas para Materias
router.get("/listar", materiasController.listarMaterias);
router.post("/agregar", validarToken(['director']), materiasController.agregarMateria);
router.put("/editar/:id", validarToken(['director']), materiasController.editarMateria);
router.delete("/eliminar/:id", validarToken(['director']), materiasController.eliminarMateria);

module.exports = router;
