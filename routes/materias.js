const express = require("express");
const router = express.Router();
const materiasController = require("../controllers/materiasController");

// Rutas para Profesores
router.get("/listar", materiasController.listarMaterias);
router.post("/agregar", materiasController.agregarMateria);
router.put("/editar/:id", materiasController.editarMateria);
router.delete("/eliminar/:id", materiasController.eliminarMateria);

module.exports = router;
