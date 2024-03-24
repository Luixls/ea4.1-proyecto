const express = require("express");
const router = express.Router();
const profesoresController = require("../controllers/profesoresController");

// Rutas para Profesores
router.get("/listar", profesoresController.listarProfesores);
router.post("/agregar", profesoresController.agregarProfesor);
router.put("/editar/:id", profesoresController.editarProfesor);
router.delete("/eliminar/:id", profesoresController.eliminarProfesor);

module.exports = router;
