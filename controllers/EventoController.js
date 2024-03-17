const mysql = require("mysql");
const dbConfig = require("../dbConfig");

class EventoController {
  // Método para obtener todos los eventos
  static async listar(req, res) {
    const sql = `
    SELECT eventos.ID, eventos.Nombre, DATE_FORMAT(eventos.Fecha, '%Y-%m-%d') as Fecha, IFNULL(materias.Nombre, 'Global') AS NombreMateria, IFNULL(profesores.Nombre, 'Todos') AS NombreProfesor
    FROM eventos
    LEFT JOIN materias ON eventos.ID_Materia = materias.ID
    LEFT JOIN profesores ON materias.ID_Profesor = profesores.ID
    OR eventos.esglobal = TRUE`;
    try {
      const eventos = await dbQuery(sql);
      res.render("listaEventos", { eventos });
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      res.status(500).render("error", { error: "Error al obtener eventos" });
    }
  }

  // Mostrar los eventos futuros de un profesor desde una fecha especificada
  static async eventosFuturosProfesor(req, res) {
    const { idProfesor, fechaInicio } = req.params;

    const sql = `
      SELECT e.ID, e.Nombre, DATE_FORMAT(e.Fecha, '%Y-%m-%d') as Fecha, e.ID_Materia, IFNULL(m.Nombre, 'Global') AS NombreMateria, IFNULL(p.Nombre, 'Todos') AS NombreProfesor
      FROM eventos e
      LEFT JOIN materias m ON e.ID_Materia = m.ID
      LEFT JOIN profesores p ON m.ID_Profesor = p.ID
      WHERE (p.ID = ? OR e.esglobal = TRUE) AND e.Fecha >= ?
      ORDER BY e.Fecha ASC`;

    try {
      const eventos = await dbQuery(sql, [idProfesor, fechaInicio]);
      if (eventos.length > 0) {
        res.render("eventosFuturosProfesor", {
          eventos: eventos,
          idProfesor: idProfesor,
          fechaInicio: fechaInicio,
          nombreProfesor:
            eventos.find((evento) => evento.NombreProfesor !== "Todos")
              ?.NombreProfesor || "Global",
        });
      } else {
        res.status(404).render("sinEventosFuturos", {
          mensaje:
            "No se encontraron eventos futuros para el profesor especificado desde la fecha indicada.",
        });
      }
    } catch (error) {
      console.error("Error al obtener eventos futuros del profesor:", error);
      res.status(500).render("error", {
        error: "Error al obtener eventos futuros del profesor",
      });
    }
  }

  // Método para agregar un nuevo evento
  static async agregar(req, res) {
    const { Nombre, Fecha, ID_Materia, esglobal } = req.body;
    console.log(req.body); // Depurar entrada
    const sql =
      "INSERT INTO eventos (Nombre, Fecha, ID_Materia, esglobal) VALUES (?, ?, ?, ?)";
    try {
      await dbQuery(sql, [Nombre, Fecha, ID_Materia, esglobal || false]);
      res.json({ mensaje: "Evento agregado con éxito" });
    } catch (error) {
      console.error("Error al agregar evento:", error);
      res.status(500).json({ error: "Error al agregar evento" });
    }
  }

  // Método para editar un evento existente
  static async editar(req, res) {
    const { id } = req.params;
    const { Nombre, Fecha, ID_Materia } = req.body;
    console.log(req.body); // Depurar entrada
    const sql =
      "UPDATE eventos SET Nombre = ?, Fecha = ?, ID_Materia = ? WHERE ID = ?";
    try {
      await dbQuery(sql, [Nombre, Fecha, ID_Materia, id]);
      // Personalizar el mensaje de éxito si el usuario es un profesor
      const mensaje = req.esProfesor
        ? "***ATENCIÓN, PROFESOR*** TENGA CUIDADO AL EDITAR LOS REGISTROS. POR FAVOR, DOBLE VERIFIQUE QUE LOS DATOS INTRODUCIDOS SON CORRECTOS. Los cambios han sido guardados."
        : "Profesor editado con éxito";
      res.json({ mensaje });
    } catch (error) {
      console.error("Error al editar evento:", error);
      res.status(500).json({ error: "Error al editar evento" });
    }
  }

  // Método para eliminar un evento existente
  static async eliminar(req, res) {
    const { id } = req.params;
    const sql = "DELETE FROM eventos WHERE ID = ?";
    try {
      await dbQuery(sql, [id]);
      res.json({ mensaje: "Evento eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar evento:", error);
      res.status(500).json({ error: "Error al eliminar evento" });
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

module.exports = EventoController;
