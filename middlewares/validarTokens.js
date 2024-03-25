const jwt = require("jsonwebtoken");

const verificarRol = (usuario, rolesPermitidos) =>
  rolesPermitidos.includes(usuario.rol);

function validarToken(rolesPermitidos = []) {
  return function (req, res, next) {
    const token = req.headers["auth"];

    // Si no se detecta token, muestra el mensaje...
    if (!token) {
      return res
        .status(403)
        .json({ error: "Se requiere un token para autenticación" });
    }

    // Decodificar el token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded;
      if (!rolesPermitidos || rolesPermitidos.length === 0) {
        return next();
      }

      if (verificarRol(decoded, rolesPermitidos)) {
        next();
      } else {
        res.status(403).json({
          error: "Acceso denegado: Usted no posee los permisos necesarios",
        });
      }
    } catch (error) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }
  };
}

function validarTokenRegistroUsuario(req, res, next) {
  const token = req.headers["auth"];
  const { rol } = req.body;

  // Para roles "director" o "profesor", se requiere un token válido de un "director"
  if (["director", "profesor"].includes(rol)) {
    if (!token) {
      return res.status(403).json({
        error: "Se requiere autenticación para crear una cuenta con dicho rol",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.rol !== "director") {
        return res.status(403).json({
          error:
            "No posee los permisos necesarios para crear una cuenta con tal rol",
        });
      }

      req.usuario = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }
  } else if (rol === "estudiante") {
    // Para el rol "estudiante", no se requiere autenticación
    next();
  } else {
    // Si se intenta utilizar un rol no válido o no manejado
    return res.status(400).json({ error: "Rol no válido o no especificado" });
  }
}

function validarTokenEventoGlobalNoGlobal(req, res, next) {
  const token = req.headers["auth"];
  const { es_global } = req.body; // Asume que la solicitud incluye si el evento es global o no

  if (!token) {
    return res
      .status(403)
      .json({ error: "Se requiere autenticación para esta acción" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;

    // Solo el director puede agregar/editar eventos globales
    if (es_global && decoded.rol !== "director") {
      return res.status(403).json({
        error: "Solo un director puede agregar o editar eventos globales",
      });
    }

    // Tanto directores como profesores pueden agregar/editar eventos no globales
    if (!es_global && !["director", "profesor"].includes(decoded.rol)) {
      return res.status(403).json({
        error: "No tienes permiso para agregar o editar este tipo de eventos",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

module.exports = {
  validarToken,
  validarTokenRegistroUsuario,
  validarTokenEventoGlobalNoGlobal,
};
