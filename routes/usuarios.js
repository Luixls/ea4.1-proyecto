const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const { validarTokenRegistroUsuario } = require("../middlewares/validarTokens");

router.post(
  "/registro",
  validarTokenRegistroUsuario,
  usuariosController.registrarUsuario
);
router.post("/login", usuariosController.login);

module.exports = router;
