const express = require("express");
const router = express.Router();
const seccionesController = require("../controllers/seccionesController");
const { validarToken } = require("../middlewares/validarTokens");
const { validarSeccion } = require("../middlewares/validarEntradas");

// Rutas para Secciones
router.get("/listar", (req, res) => {
  seccionesController
    .listarSecciones()
    .then((secciones) => res.render("listarSecciones", { secciones }))
    .catch((err) => res.status(500).send(err.error));
}); // Luego validaremos validarToken(['director', 'profesor', 'estudiante'])
router.post(
  "/agregar",
  validarSeccion,
  validarToken(["director"]),
  seccionesController.agregarSeccion
);
router.put(
  "/editar/:id",
  validarSeccion,
  validarToken(["director"]),
  seccionesController.editarSeccion
);
router.delete(
  "/eliminar/:id",
  validarToken(["director"]),
  seccionesController.eliminarSeccion
);
router.get("/eventos/:id", (req, res) => {
  const seccionId = req.params.id;
  seccionesController
    .eventosSeccion(seccionId)
    .then(({ seccionInfo, eventos }) => {
      if (!seccionInfo) {
        // Verifica si seccionInfo no existe
        res.send("No se encontraron detalles para la sección especificada.");
      } else {
        res.render("eventosSeccion", {
          eventos: eventos,
          seccionInfo: seccionInfo, // Asegúrate de pasar seccionInfo a la vista
        });
      }
    })
    .catch((err) => res.status(500).send(err.error));
});

module.exports = router;
