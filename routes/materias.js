const express = require("express");
const router = express.Router();
const MateriaController = require("../controllers/MateriaController");
const { verificarTokenYRol } = require("../middlewares/authMiddleware");
const { validarMateria } = require("../middlewares/validacionMiddleware");

// No se requiere autenticación
router.get("/listar", MateriaController.listar);

// Se requiere ser profesor o director
router.post(
  "/agregar",
  validarMateria,
  verificarTokenYRol(["Profesor", "Director"]),
  MateriaController.agregar
);

// Se requiere ser profesor o director
router.put(
  "/editar/:id",
  validarMateria,
  verificarTokenYRol(["Director", "Profesor"]),
  (req, res, next) => {
    // Añadir una propiedad al objeto req para indicar si es profesor
    if (req.usuario.rol === "Profesor") {
      req.esProfesor = true; // Usamos esta propiedad para decidir si mostramos el mensaje de advertencia
    }
    next();
  },
  MateriaController.editar
);

// Solo el director puede eliminar
router.delete(
  "/eliminar/:id",
  verificarTokenYRol(["Director"]),
  MateriaController.eliminar
);

module.exports = router;
