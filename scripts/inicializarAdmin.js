const bcrypt = require("bcrypt");
const pool = require("../config/dbPool");
require("dotenv").config();

// Utilizamos las varibales de entorno para obtener las credenciales a usar
const adminUsuario = process.env.ADMIN_USER;
const adminContraseña = process.env.ADMIN_PASS;
const adminRol = process.env.ADMIN_ROLE;

async function crearAdminPredeterminado() {
  try {
    // Verificar si el usuario admin ya existe
    const queryBuscar = "SELECT * FROM usuarios WHERE usuario = ?";
    pool.query(queryBuscar, [adminUsuario], async (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        // El usuario admin no existe, proceder a crearlo
        const salt = await bcrypt.genSalt(10);
        const contraseñaHash = await bcrypt.hash(adminContraseña, salt);

        const queryInsertar =
          "INSERT INTO usuarios (usuario, contraseña, rol) VALUES (?, ?, ?)";
        pool.query(
          queryInsertar,
          [adminUsuario, contraseñaHash, adminRol],
          (err, results) => {
            if (err) throw err;
            console.log("Usuario admin creado exitosamente");
          }
        );
      } else {
        console.log("El usuario admin ya existe.");
      }
    });
  } catch (error) {
    console.error("Error al crear el usuario admin:", error);
  }
}

module.exports = crearAdminPredeterminado;
