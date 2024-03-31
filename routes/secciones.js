const express = require("express");
const router = express.Router();
const seccionesController = require("../controllers/seccionesController");
const { validarToken } = require("../middlewares/validarTokens");
const { validarSeccion } = require("../middlewares/validarEntradas");

// Rutas para Secciones
router.get(
  "/listar",
  // validarToken(["director", "profesor", "estudiante"]),
  (req, res) => {
    seccionesController
      .listarSecciones()
      .then((secciones) => res.render("listarSecciones", { secciones }))
      .catch((err) => res.status(500).send(err.error));
  }
);
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
        res.send("No se encontraron detalles para la sección especificada.");
      } else {
        res.render("eventosSeccion", {
          eventos: eventos,
          seccionInfo: seccionInfo,
        });
      }
    })
    .catch((err) => res.status(500).send(err.error));
});

module.exports = router;
