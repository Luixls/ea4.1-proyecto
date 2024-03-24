const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const { validarTokenOpcional } = require("../middlewares/validarTokens");

router.post(
  "/registro",
  validarTokenOpcional,
  usuariosController.registrarUsuario
);
router.post("/login", usuariosController.login);

module.exports = router;
