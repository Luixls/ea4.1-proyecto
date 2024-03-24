const express = require("express");
const router = express.Router();
const profesoresController = require("../controllers/profesoresController");
const { validarToken } = require("../middlewares/validarTokens");

// Rutas para Profesores
router.get("/listar", validarToken(['director', 'profesor', 'estudiante']), profesoresController.listarProfesores);
router.post("/agregar", validarToken(['director']), profesoresController.agregarProfesor);
router.put("/editar/:id", validarToken(['director']), profesoresController.editarProfesor);
router.delete("/eliminar/:id", validarToken(['director']), profesoresController.eliminarProfesor);

module.exports = router;
