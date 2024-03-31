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
      "UPDATE secciones SET nombre = ?, profesor_id = ?, materia_id = ?, trimestre_id = ? WHERE seccion_id = ?";
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
      // Primera consulta: Obtener detalles de la sección
      const queryDetallesSeccion = `
          SELECT 
              secciones.nombre AS seccion_nombre, 
              profesores.nombre AS profesor_nombre, 
              materias.nombre AS materia_nombre, 
              trimestres.nombre AS trimestre_nombre
          FROM secciones
          JOIN profesores ON secciones.profesor_id = profesores.profesor_id
          JOIN materias ON secciones.materia_id = materias.materia_id
          JOIN trimestres ON secciones.trimestre_id = trimestres.trimestre_id
          WHERE secciones.seccion_id = ?`;

      pool.query(queryDetallesSeccion, [seccionId], (err, resultSeccion) => {
        if (err || resultSeccion.length === 0) {
          reject({
            error: "Error al obtener los detalles de la sección",
          });
          return;
        }

        const seccionInfo = {
          seccion_nombre: resultSeccion[0].seccion_nombre,
          profesor_nombre: resultSeccion[0].profesor_nombre,
          materia_nombre: resultSeccion[0].materia_nombre,
          trimestre_nombre: resultSeccion[0].trimestre_nombre,
        };

        // Segunda consulta: Obtener eventos relacionados con la sección
        const queryEventos = `
            SELECT 
                eventos.evento_id, 
                eventos.nombre AS evento_nombre, 
                eventos.numero_semana, 
                eventos.fecha, 
                eventos.rasgos, 
                eventos.es_global
            FROM eventos
            WHERE eventos.seccion_id = ? OR eventos.es_global = TRUE
            ORDER BY eventos.es_global DESC, eventos.numero_semana ASC, eventos.fecha ASC`;

        pool.query(queryEventos, [seccionId], (err, eventos) => {
          if (err) {
            reject({
              error:
                "Error al obtener los eventos de la sección incluyendo eventos globales",
            });
            return;
          }

          // Formatear cada fecha de evento antes de enviar
          const eventosFormateados = eventos.map((evento) => {
            if (evento.fecha) {
              evento.fecha = moment(evento.fecha).format("LL");
            }
            return evento;
          });

          resolve({ seccionInfo, eventos: eventosFormateados });
        });
      });
    });
  }
}

module.exports = SeccionesController;
