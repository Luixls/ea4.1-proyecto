const express = require("express");
const router = express.Router();
const seccionesController = require("../controllers/seccionesController");
const { validarToken } = require("../middlewares/validarTokens");
const { validarSeccion } = require('../middlewares/validarEntradas');

// Rutas para Secciones
router.get("/listar", seccionesController.listarSecciones); // Luego validaremos validarToken(['director', 'profesor', 'estudiante'])
router.post("/agregar", validarSeccion, validarToken(['director']), seccionesController.agregarSeccion);
router.put("/editar/:id", validarSeccion, validarToken(['director']), seccionesController.editarSeccion);
router.delete("/eliminar/:id", validarToken(['director']), seccionesController.eliminarSeccion);

module.exports = router;
