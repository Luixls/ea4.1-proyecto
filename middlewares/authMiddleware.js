const jwt = require("jsonwebtoken");

const verificarTokenYRol = (rolesPermitidos) => {
  return (req, res, next) => {
    const token = req.headers["auth"];

    if (!token)
      return res
        .status(403)
        .json({ error: "Se requiere un token para autenticación" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded;

      // Verificar si el rol del usuario está entre los roles permitidos
      if (!rolesPermitidos.includes(decoded.rol)) {
        return res.status(401).json({
          error:
            "No tiene permiso para realizar esta acción - solo un usuario de mayor nivel puede continuar.",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }
  };
};

module.exports = { verificarTokenYRol };
