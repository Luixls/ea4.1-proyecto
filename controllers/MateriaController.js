const mysql = require("mysql");
const dbConfig = require("../dbConfig");

class MateriaController {
  // Método para obtener todas las materias
  static async listar(req, res) {
    const sql = `
      SELECT materias.ID, materias.Nombre, profesores.Nombre AS NombreProfesor, secciones.Nombre AS NombreSeccion 
      FROM materias
      JOIN profesores ON materias.ID_Profesor = profesores.ID
      JOIN secciones ON materias.ID_Seccion = secciones.ID`;
    try {
      const materias = await dbQuery(sql);
      res.render("listaMaterias", { materias });
    } catch (error) {
      console.error("Error al obtener materias:", error);
      res.status(500).json({ error: "Error al obtener materias" });
    }
  }

  // Método para agregar una nueva materia
  static async agregar(req, res) {
    const { Nombre, ID_Profesor, ID_Seccion } = req.body;
    console.log(req.body); // Depurar entrada
    const sql =
      "INSERT INTO materias (Nombre, ID_Profesor, ID_Seccion) VALUES (?, ?, ?)";
    try {
      await dbQuery(sql, [Nombre, ID_Profesor, ID_Seccion]);
      res.json({ mensaje: "Materia agregada con éxito" });
    } catch (error) {
      console.error("Error al agregar materia:", error);
      res.status(500).json({ error: "Error al agregar materia" });
    }
  }

  // Método para editar una materia existente
  static async editar(req, res) {
    const { id } = req.params;
    const { Nombre, ID_Profesor, ID_Seccion } = req.body;
    console.log(req.body); // Depurar entrada
    const sql =
      "UPDATE materias SET Nombre = ?, ID_Profesor = ?, ID_Seccion = ? WHERE ID = ?";
    try {
      await dbQuery(sql, [Nombre, ID_Profesor, ID_Seccion, id]);
      // Personalizar el mensaje de éxito si el usuario es un profesor
      const mensaje = req.esProfesor
        ? "***ATENCIÓN, PROFESOR*** TENGA CUIDADO AL EDITAR LOS REGISTROS. POR FAVOR, DOBLE VERIFIQUE QUE LOS DATOS INTRODUCIDOS SON CORRECTOS. Los cambios han sido guardados."
        : "Profesor editado con éxito";
      res.json({ mensaje });
    } catch (error) {
      console.error("Error al editar materia:", error);
      res.status(500).json({ error: "Error al editar materia" });
    }
  }

  // Método para eliminar una materia existente
  static async eliminar(req, res) {
    const { id } = req.params;
    const sql = "DELETE FROM materias WHERE ID = ?";
    try {
      await dbQuery(sql, [id]);
      res.json({ mensaje: "Materia eliminada con éxito" });
    } catch (error) {
      console.error("Error al eliminar materia:", error);
      res.status(500).json({ error: "Error al eliminar materia" });
    }
  }
}

// Función de utilidad para ejecutar consultas SQL
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

module.exports = MateriaController;
