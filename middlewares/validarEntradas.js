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

  // Validación del trimestre_id
  check("trimestre_id")
    .notEmpty()
    .withMessage("El ID del trimestre obligatorio.")
    .isInt({ min: 1 })
    .withMessage("El ID del trimestre debe ser un número positivo."),

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
  // Validar nombre
  check("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del evento es obligatorio.")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres."),

  // Validar semanas (puede ser nulo)
  check("numero_semana")
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("El número de semana debe ser un número entero positivo."),

  // Validar fechas (puede ser nulo)
  check("fecha")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("La fecha debe tener un formato válido (AAAA-MM-DD)."),

  // Etc...
  check("materia_id")
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("El ID de la materia debe ser un número entero positivo."),
  check("seccion_id")
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("El ID de la sección debe ser un número entero positivo."),
  check("es_global")
    .if(check("es_global").exists())
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

const validarAsignarEventos = [
  // Validar ID de evento(s)
  check("evento_id")
    .trim()
    .notEmpty()
    .withMessage("El ID de evento(s) es obligatorio.")
    .isInt({ min: 1 })
    .withMessage("El ID del evento(s) debe ser un número entero positivo."),

  // Validar ID de materia
  check("materia_id")
    .trim()
    .notEmpty()
    .withMessage("El ID de la materia es obligatorio.")
    .isInt({ min: 1 })
    .withMessage("El ID de la materia debe ser un número entero positivo."),

  // Validar ID de sección
  check("seccion_id")
    .trim()
    .notEmpty()
    .withMessage("El ID de la sección es obligatorio.")
    .isInt({ min: 1 })
    .withMessage("El ID de la sección debe ser un número entero positivo."),

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
  validarAsignarEventos,
};
