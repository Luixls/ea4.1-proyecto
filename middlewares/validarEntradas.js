const { check, validationResult } = require("express-validator");

const validarProfesor = [
  // Validación del nombre
  check("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del profesor es obligatorio.")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres."),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];

const validarMateria = [
  // Validación del nombre
  check("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la materia es obligatorio.")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres."),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];

const validarSeccion = [
  // Validación del nombre
  check("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la sección es obligatorio."),

  // Validación del profesor_id
  check("profesor_id")
    .notEmpty()
    .withMessage("El ID del profesor es obligatorio.")
    .isInt({ min: 1 })
    .withMessage("El ID del profesor debe ser un número positivo."),

  // Validación del materia_id
  check("materia_id")
    .notEmpty()
    .withMessage("El ID de la materia es obligatorio.")
    .isInt({ min: 1 })
    .withMessage("El ID de la materia debe ser un número positivo."),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];

const validarTrimestre = [
  // Validación del nombre del trimestre
  check("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del trimestre es obligatorio.")
    .isLength({ min: 5 })
    .withMessage("El nombre debe tener al menos 5 caracteres."),

  // Validación de la fecha de inicio
  check("fecha_inicio")
    .notEmpty()
    .withMessage("La fecha de inicio es obligatoria.")
    .isISO8601()
    .withMessage(
      "La fecha de inicio debe tener un formato válido (AAAA-MM-DD)."
    ),

  // Validación de la fecha de fin
  check("fecha_fin")
    .notEmpty()
    .withMessage("La fecha de fin es obligatoria.")
    .isISO8601()
    .withMessage("La fecha de fin debe tener un formato válido (AAAA-MM-DD).")
    .custom(
      (value, { req }) => new Date(value) > new Date(req.body.fecha_inicio)
    )
    .withMessage("La fecha de fin debe ser posterior a la fecha de inicio."),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];

const validarEvento = [
  check("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del evento es obligatorio.")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres."),
  check("numero_semana")
    .isInt({ min: 1 })
    .withMessage("El número de semana debe ser un número entero positivo."),
  check("fecha")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("La fecha debe tener un formato válido (AAAA-MM-DD)."),
  check("materia_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la materia debe ser un número entero positivo."),
  check("seccion_id")
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("El ID de la sección debe ser un número entero positivo."),
  check("es_global")
    .isBoolean()
    .withMessage("es_global debe ser un valor booleano."),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];

module.exports = {
  validarProfesor,
  validarMateria,
  validarSeccion,
  validarTrimestre,
  validarEvento,
};
