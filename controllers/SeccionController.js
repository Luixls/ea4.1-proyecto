const mysql = require("mysql");
const dbConfig = require("../dbConfig");

class SeccionController {
  // Método para obtener todas las secciones
  static async listar(req, res) {
    const sql = `
      SELECT secciones.ID, secciones.Nombre, materias.Nombre AS NombreMateria, profesores.Nombre AS NombreProfesor
      FROM secciones
      JOIN materias ON secciones.ID_Materia = materias.ID
      JOIN profesores ON secciones.ID_Profesor = profesores.ID`;
    try {
      const secciones = await dbQuery(sql);
      res.render("listaSecciones", { secciones });
    } catch (error) {
      console.error("Error al obtener secciones:", error);
      res.status(500).render("error", { error: "Error al obtener secciones" });
    }
  }

  // Método para agregar una nueva sección
  static async agregar(req, res) {
    const { Nombre, ID_Materia, ID_Profesor } = req.body;
    console.log(req.body); // Depurar entrada
    const sql =
      "INSERT INTO secciones (Nombre, ID_Materia, ID_Profesor) VALUES (?, ?, ?)";
    try {
      await dbQuery(sql, [Nombre, ID_Materia, ID_Profesor]);
      res.json({ mensaje: "Sección agregada con éxito" });
    } catch (error) {
      console.error("Error al agregar sección:", error);
      res.status(500).json({ error: "Error al agregar sección" });
    }
  }

  // Método para editar una sección existente
  static async editar(req, res) {
    const { id } = req.params;
    const { Nombre, ID_Materia, ID_Profesor } = req.body;
    const sql =
      "UPDATE secciones SET Nombre = ?, ID_Materia = ?, ID_Profesor = ? WHERE ID = ?";
    try {
      await dbQuery(sql, [Nombre, ID_Materia, ID_Profesor, id]);

      // Personalizar el mensaje de éxito si el usuario es un profesor
      const mensaje = req.esProfesor
        ? "***ATENCIÓN*** TENGA CUIDADO AL EDITAR LOS REGISTROS. Los cambios han sido guardados, doble verifique que los datos sean correctos."
        : "Sección editada con éxito";

      res.json({ mensaje });
    } catch (error) {
      console.error("Error al editar sección:", error);
      res.status(500).json({ error: "Error al editar sección" });
    }
  }
  // Método para eliminar una sección existente
  static async eliminar(req, res) {
    const { id } = req.params;
    const sql = "DELETE FROM secciones WHERE ID = ?";
    try {
      await dbQuery(sql, [id]);
      res.json({ mensaje: "Sección eliminada con éxito" });
    } catch (error) {
      console.error("Error al eliminar sección:", error);
      res.status(500).json({ error: "Error al eliminar sección" });
    }
  }
}

// Función de utilidad para ejecutar consultas SQL
function dbQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);
    connection.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      connection.end();
      resolve(results);
    });
  });
}

module.exports = SeccionController;
