const express = require("express");
const router = express.Router();
const seccionesController = require("../controllers/seccionesController");

// Rutas para Secciones
router.get("/listar", seccionesController.listarSecciones);
router.post("/agregar", seccionesController.agregarSeccion);
router.put("/editar/:id", seccionesController.editarSeccion);
router.delete("/eliminar/:id", seccionesController.eliminarSeccion);

module.exports = router;
