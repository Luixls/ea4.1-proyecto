const { body, validationResult } = require("express-validator");

// Validar profesores
const validarProfesor = [
  body("Nombre")
    .notEmpty()
    .withMessage("El nombre del profesor es obligatorio."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];

// Validar materias
const validarMateria = [
  body("Nombre")
    .notEmpty()
    .withMessage("El nombre de la materia es obligatorio."),
  body("ID_Profesor")
    .isNumeric()
    .withMessage("El ID del profesor debe ser numérico."),
  body("ID_Profesor")
    .notEmpty()
    .withMessage("El ID del profesor es obligatorio."),
  body("ID_Seccion")
    .isNumeric()
    .withMessage("El ID de la sección debe ser numérico."),
  body("ID_Seccion")
    .notEmpty()
    .withMessage("El ID de la sección es obligatorio."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];

// Validar secciones
const validarSeccion = [
  body("Nombre")
    .notEmpty()
    .withMessage("El nombre de la sección es obligatorio."),
  body("ID_Materia")
    .isNumeric()
    .withMessage("El ID de la materia debe ser numérico."),
  body("ID_Materia")
    .notEmpty()
    .withMessage("El ID de la materia es obligatorio."),
  body("ID_Profesor")
    .isNumeric()
    .withMessage("El ID del profesor debe ser numérico."),
  body("ID_Profesor")
    .notEmpty()
    .withMessage("El ID del profesor es obligatorio."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];

// Validar eventos
const validarEventos = [
  body("Nombre").notEmpty().withMessage("El nombre del evento es obligatorio."),
  body("Fecha")
    .notEmpty()
    .withMessage("La fecha es obligatoria.")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("La fecha debe estar en formato AAAA-MM-DD."),
  body("ID_Materia")
    .notEmpty()
    .withMessage("El ID de la materia es obligatorio."),
  body("ID_Materia")
    .isNumeric()
    .withMessage("El ID de la materia debe ser numérico."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];

// Validar agregar eventos
const validarAgregarEventos = [
  body("Nombre").notEmpty().withMessage("El nombre del evento es obligatorio."),
  body("Fecha")
    .notEmpty()
    .withMessage("La fecha es obligatoria.")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("La fecha debe estar en formato AAAA-MM-DD."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];

// Validar trimestres
const validarTrimestres = [
  body("Nombre")
    .notEmpty()
    .withMessage("El nombre del trimestre es obligatorio."),
  body("Fecha_Inicio")
    .notEmpty()
    .withMessage("La fecha de inicio es obligatoria.")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("La fecha debe estar en formato AAAA-MM-DD."),
  body("Fecha_Final")
    .notEmpty()
    .withMessage("La fecha de culminación es obligatoria.")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("La fecha debe estar en formato AAAA-MM-DD."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];

// Validar agregar usuario
const validarRegistroUsuario = [
  body("nombreUsuario")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio."),
  body("contraseña").notEmpty().withMessage("La contraseña es obligatoria."),
  body("rol")
    .notEmpty()
    .withMessage("El rol es obligatorio.")
    .isIn(["Director", "Profesor"])
    .withMessage("El rol debe ser 'Director' o 'Profesor'."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];

// Validar usuarios
const validarUsuario = [
  body("nombreUsuario")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio."),
  body("contraseña").notEmpty().withMessage("La contraseña es obligatoria."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];

module.exports = {
  validarSeccion,
  validarProfesor,
  validarMateria,
  validarRegistroUsuario,
  validarUsuario,
  validarEventos,
  validarAgregarEventos,
  validarTrimestres,
};
