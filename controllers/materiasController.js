const pool = require("../config/dbPool");
const moment = require("moment");
moment.locale("es"); // Esto es para usar el módulo de Node.js "moment" en español

class MateriasController {
  static listarMaterias() {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM materias", (err, rows) => {
        if (err) {
          reject({ error: "Error al obtener las materias" });
        } else {
          resolve(rows);
        }
      });
    });
  }

  static agregarMateria(req, res) {
    const { nombre } = req.body;
    console.log(nombre);
    pool.query(
      "INSERT INTO materias (nombre) VALUES (?)",
      [nombre],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error al crear la materia" });
        } else {
          res
            .status(201)
            .json({ mensaje: "Materia creada", id: results.insertId });
        }
      }
    );
  }

  static editarMateria(req, res) {
    const { nombre } = req.body;
    const { id } = req.params;
    console.log(nombre, id);
    pool.query(
      "UPDATE materias SET nombre = ? WHERE materia_id = ?",
      [nombre, id],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error al actualizar la materia" });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: "Materia no encontrada" });
        } else {
          res.status(200).json({ mensaje: "Materia actualizada" });
        }
      }
    );
  }

  static eliminarMateria(req, res) {
    const { id } = req.params;
    pool.query(
      "DELETE FROM materias WHERE materia_id = ?",
      [id],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error al eliminar la materia" });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: "Materia no encontrada" });
        } else {
          res.status(200).json({ mensaje: "Materia eliminada" });
        }
      }
    );
  }

  static eventosPorMateria(materiaId) {
    return new Promise((resolve, reject) => {
      const query = `
          SELECT 
              materias.nombre AS materia_nombre, 
              eventos.nombre AS evento_nombre, 
              eventos.numero_semana, 
              eventos.fecha, 
              eventos.rasgos
          FROM eventos
          JOIN materias ON eventos.materia_id = materias.materia_id
          WHERE eventos.materia_id = ?
          ORDER BY eventos.numero_semana ASC, eventos.fecha ASC`;

      pool.query(query, [materiaId], (err, rows) => {
        if (err) {
          reject({ error: "Error al obtener eventos por materia" });
        } else {
          // Opcional: formatear fechas con moment
          const eventosFormateados = rows.map((evento) => {
            if (evento.fecha) {
              evento.fecha = moment(evento.fecha).format("LL");
            }
            return evento;
          });
          resolve(eventosFormateados);
        }
      });
    });
  }
}

module.exports = MateriasController;
