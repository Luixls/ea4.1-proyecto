const mysql = require("mysql");
const dbConfig = require("../dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UsuarioController {
  // Método para registrar un nuevo usuario
  static async registro(req, res) {
    const { nombreUsuario, contraseña, rol } = req.body;
    // Encriptación de las pass antes de guardarla en la BD
    const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);

    const sql =
      "INSERT INTO usuarios (nombreUsuario, contraseña, rol) VALUES (?, ?, ?)";
    try {
      await dbQuery(sql, [nombreUsuario, contraseñaEncriptada, rol]);
      res.json({ mensaje: "Usuario registrado con éxito" });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  }

  // Método para iniciar sesión
  static async login(req, res) {
    const { nombreUsuario, contraseña } = req.body;
    const sql = "SELECT * FROM usuarios WHERE nombreUsuario = ?";

    try {
      const usuarios = await dbQuery(sql, [nombreUsuario]);
      if (usuarios.length > 0) {
        const usuario = usuarios[0];
        if (await bcrypt.compare(contraseña, usuario.contraseña)) {
          // Generar JWT
          const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
          );
          res.json({ mensaje: "Inicio de sesión exitoso", token });
        } else {
          res.status(401).json({ error: "Contraseña incorrecta" });
        }
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  }
}

// Función de utilidad para ejecutar consultas SQL (honestamente no sé si importe en este caso, luego vemos)
function dbQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);
    connection.query(sql, params, (error, results) => {
      connection.end();
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = UsuarioController;
