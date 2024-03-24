const express = require("express");
const router = express.Router();
const eventosController = require("../controllers/eventosController");

// Rutas para Eventos
router.get("/listar", eventosController.listarEventos);
router.post("/agregar", eventosController.agregarEvento);
router.put("/editar/:id", eventosController.editarEvento);
router.delete("/eliminar/:id", eventosController.eliminarEvento);

module.exports = router;
