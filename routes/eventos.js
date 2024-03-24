const express = require("express");
const router = express.Router();
const eventosController = require("../controllers/eventosController");
const { validarToken, validarEventoGlobalNoGlobal } = require("../middlewares/validarTokens");

// Rutas para Eventos
router.get("/listar", eventosController.listarEventos); // Luego validaremos
router.post("/agregar", validarEventoGlobalNoGlobal,eventosController.agregarEvento);
router.put("/editar/:id", validarEventoGlobalNoGlobal, eventosController.editarEvento);
router.delete("/eliminar/:id", validarToken(['director']), eventosController.eliminarEvento);

module.exports = router;
