const express = require("express");
const router = express.Router();
const eventosController = require("../controllers/eventosController");
const { validarToken, validarTokenEventoGlobalNoGlobal } = require("../middlewares/validarTokens");
const { validarEvento } = require('../middlewares/validarEntradas');

// Rutas para Eventos
router.get("/listar", eventosController.listarEventos); // Luego validaremos
router.post("/agregar", validarEvento, validarTokenEventoGlobalNoGlobal,eventosController.agregarEvento);
router.put("/editar/:id", validarEvento, validarTokenEventoGlobalNoGlobal, eventosController.editarEvento);
router.delete("/eliminar/:id", validarToken(['director']), eventosController.eliminarEvento);

module.exports = router;
