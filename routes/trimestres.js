const express = require("express");
const router = express.Router();
const trimestresController = require("../controllers/trimestresController");
const { validarToken } = require("../middlewares/validarTokens");
const { validarTrimestre } = require('../middlewares/validarEntradas');

// Rutas para Trimestres
router.get("/listar", trimestresController.listarTrimestres);
router.post("/agregar", validarTrimestre, validarToken(['director']), trimestresController.agregarTrimestre);
router.put("/editar/:id", validarTrimestre, validarToken(['director']), trimestresController.editarTrimestre);
router.delete("/eliminar/:id", validarToken(['director']), trimestresController.eliminarTrimestre);

module.exports = router;
