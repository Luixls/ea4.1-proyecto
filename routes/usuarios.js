const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

// Rutas para Eventos
router.post("/registro", usuariosController.registrarUsuario);
router.post("/login", usuariosController.login);

module.exports = router;
