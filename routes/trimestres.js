const express = require("express");
const router = express.Router();
const trimestresController = require("../controllers/trimestresController");

// Rutas para Profesores
router.get("/listar", trimestresController.listarTrimestres);
router.post("/agregar", trimestresController.agregarTrimestre);
router.put("/editar/:id", trimestresController.editarTrimestre);
router.delete("/eliminar/:id", trimestresController.eliminarTrimestre);

module.exports = router;
