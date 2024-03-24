const pool = require("../config/dbPool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UsuariosController {
  static async registrarUsuario(req, res) {
    const { usuario, contraseña, rol } = req.body;
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const contraseñaHash = await bcrypt.hash(contraseña, salt);

    const query =
      "INSERT INTO usuarios (usuario, contraseña, rol) VALUES (?, ?, ?)";
    pool.query(query, [usuario, contraseñaHash, rol], (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error al registrar el usuario" });
      } else {
        res.status(201).json({
          mensaje: "Usuario registrado exitosamente",
          id: results.insertId,
        });
      }
    });
  }

  static login(req, res) {
    const { usuario, contraseña } = req.body;

    const query = "SELECT * FROM usuarios WHERE usuario = ?";
    pool.query(query, [usuario], async (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error al intentar el login" });
      } else if (results.length === 0) {
        res.status(404).json({ error: "Usuario no encontrado" });
      } else {
        // Verificar contraseña
        const usuarioValido = await bcrypt.compare(
          contraseña,
          results[0].contraseña
        );
        if (!usuarioValido) {
          res.status(401).json({ error: "Contraseña incorrecta" });
        } else {
          // Generar token
          const token = jwt.sign(
            { id: results[0].usuario_id, rol: results[0].rol },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.json({ mensaje: "Login exitoso", token });
        }
      }
    });
  }
}

module.exports = UsuariosController;
