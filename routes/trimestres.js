const express = require("express");
const router = express.Router();
const trimestresController = require("../controllers/trimestresController");
const { validarToken } = require("../middlewares/validarTokens");

// Rutas para Trimestres
router.get("/listar", trimestresController.listarTrimestres);
router.post("/agregar", validarToken(['director']), trimestresController.agregarTrimestre);
router.put("/editar/:id", validarToken(['director']), trimestresController.editarTrimestre);
router.delete("/eliminar/:id", validarToken(['director']), trimestresController.eliminarTrimestre);

module.exports = router;
