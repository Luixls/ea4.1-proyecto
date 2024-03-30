const pool = require("../config/dbPool");
const moment = require("moment");
moment.locale("es");

class SeccionesController {
  static listarSecciones() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT secciones.seccion_id, secciones.nombre AS seccion_nombre, 
               profesores.nombre AS profesor_nombre, materias.nombre AS materia_nombre, 
               trimestres.nombre AS trimestre_nombre
        FROM secciones
        LEFT JOIN profesores ON secciones.profesor_id = profesores.profesor_id
        LEFT JOIN materias ON secciones.materia_id = materias.materia_id
        LEFT JOIN trimestres ON secciones.trimestre_id = trimestres.trimestre_id`;
      pool.query(query, (err, rows) => {
        if (err) {
          reject({ error: "Error al obtener las secciones" });
        } else {
          resolve(rows);
        }
      });
    });
  }

  static agregarSeccion(req, res) {
    const { nombre, profesor_id, materia_id, trimestre_id } = req.body;
    const query = `INSERT INTO secciones (nombre, profesor_id, materia_id, trimestre_id) VALUES (?, ?, ?, ?)`;

    pool.query(
      query,
      [nombre, profesor_id, materia_id, trimestre_id],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error al agregar la sección" });
        } else {
          res.status(201).json({
            mensaje: "Sección agregada exitosamente",
            id: results.insertId,
          });
        }
      }
    );
  }

  static editarSeccion(req, res) {
    const { nombre, profesor_id, materia_id, trimestre_id } = req.body;
    const { id } = req.params;
    console.log(nombre, profesor_id, materia_id, trimestre_id, id);
    const query =
      "UPDATE secciones SET nombre = ?, profesor_id = ?, materia_id = ?, trimestre_id = ?, WHERE seccion_id = ?";
    pool.query(
      query,
      [nombre, profesor_id, materia_id, trimestre_id, id],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error al actualizar la sección" });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: "Sección no encontrada" });
        } else {
          res.status(200).json({ mensaje: "Sección actualizada" });
        }
      }
    );
  }

  static eliminarSeccion(req, res) {
    const { id } = req.params;
    const query = "DELETE FROM secciones WHERE seccion_id = ?";
    pool.query(query, [id], (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error al eliminar la sección" });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: "Sección no encontrada" });
      } else {
        res.status(200).json({ mensaje: "Sección eliminada" });
      }
    });
  }

  static eventosSeccion(seccionId) {
    return new Promise((resolve, reject) => {
      const query = `
            SELECT 
                secciones.nombre AS seccion_nombre, 
                profesores.nombre AS profesor_nombre, 
                materias.nombre AS materia_nombre, 
                trimestres.nombre AS trimestre_nombre,
                eventos.nombre AS evento_nombre, 
                eventos.numero_semana, 
                eventos.fecha, 
                eventos.rasgos, 
                eventos.es_global
            FROM secciones
            LEFT JOIN profesores ON secciones.profesor_id = profesores.profesor_id
            LEFT JOIN materias ON secciones.materia_id = materias.materia_id
            LEFT JOIN trimestres ON secciones.trimestre_id = trimestres.trimestre_id
            LEFT JOIN eventos ON secciones.seccion_id = eventos.seccion_id OR eventos.es_global = TRUE
            WHERE secciones.seccion_id = ? OR eventos.es_global = TRUE
            GROUP BY eventos.evento_id
            ORDER BY eventos.es_global DESC, eventos.numero_semana ASC, eventos.fecha ASC`;

      pool.query(query, [seccionId], (err, rows) => {
        if (err) {
          reject({
            error:
              "Error al obtener los detalles de la sección incluyendo eventos globales",
          });
        } else {
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

module.exports = SeccionesController;
