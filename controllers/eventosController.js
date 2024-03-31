const pool = require("../config/dbPool");
const moment = require("moment");
moment.locale("es"); // Esto es para usar el módulo de Node.js "moment" en español

class EventosController {
  static listarEventos() {
    return new Promise((resolve, reject) => {
      const query = `SELECT eventos.evento_id, eventos.nombre, eventos.numero_semana, eventos.fecha, eventos.rasgos, eventos.seccion_id, eventos.materia_id, eventos.es_global, secciones.nombre AS seccion_nombre, materias.nombre AS materia_nombre
                     FROM eventos
                     LEFT JOIN secciones ON eventos.seccion_id = secciones.seccion_id
                     LEFT JOIN materias ON eventos.materia_id = materias.materia_id`;
      pool.query(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // Formatear cada fecha de evento antes de enviar
          const eventosFormateados = rows.map((evento) => {
            if (evento.fecha) {
              evento.fecha = moment(evento.fecha).format("LL"); // Formato 'LL' convierte el formato a 'D [de] MMMM [de] YYYY'
            }
            return evento;
          });
          resolve(eventosFormateados);
        }
      });
    });
  }

  static agregarEvento(req, res) {
    const {
      nombre,
      numero_semana,
      fecha,
      rasgos,
      seccion_id,
      materia_id,
      es_global,
    } = req.body;
    const query =
      "INSERT INTO eventos (nombre, numero_semana, fecha, rasgos, seccion_id, materia_id, es_global) VALUES (?, ?, ?, ?, ?, ?, ?)";
    pool.query(
      query,
      [nombre, numero_semana, fecha, rasgos, seccion_id, materia_id, es_global],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error al crear el evento" });
        } else {
          res
            .status(201)
            .json({ mensaje: "Evento creado", id: results.insertId });
        }
      }
    );
  }

  static editarEvento(req, res) {
    const {
      nombre,
      numero_semana,
      fecha,
      rasgos,
      seccion_id,
      materia_id,
      es_global,
    } = req.body;
    const { id } = req.params;
    const query =
      "UPDATE eventos SET nombre = ?, numero_semana = ?, fecha = ?, rasgos = ?, seccion_id = ?, materia_id = ?, es_global = ? WHERE evento_id = ?";
    pool.query(
      query,
      [
        nombre,
        numero_semana,
        fecha,
        rasgos,
        seccion_id,
        materia_id,
        es_global,
        id,
      ],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error al actualizar el evento" });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: "Evento no encontrado" });
        } else {
          res.status(200).json({ mensaje: "Evento actualizado" });
        }
      }
    );
  }

  static eliminarEvento(req, res) {
    const { id } = req.params;
    const query = "DELETE FROM eventos WHERE evento_id = ?";
    pool.query(query, [id], (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error al eliminar el evento" });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: "Evento no encontrado" });
      } else {
        res.status(200).json({ mensaje: "Evento eliminado" });
      }
    });
  }

  static async proximosEventosProfesores(fechaConsulta) {
    return new Promise(async (resolve, reject) => {
      let fechaConsultaMoment = moment(fechaConsulta, "YYYY-MM-DD");
      let fechaFin = fechaConsultaMoment.clone().add(1, "weeks");

      let query = `
              SELECT 
                  profesores.nombre AS profesor_nombre, 
                  eventos.nombre AS evento_nombre, 
                  eventos.fecha, 
                  eventos.numero_semana, 
                  eventos.rasgos, 
                  eventos.es_global, 
                  trimestres.fecha_inicio AS trimestre_inicio
              FROM eventos
              LEFT JOIN secciones ON eventos.seccion_id = secciones.seccion_id
              LEFT JOIN profesores ON secciones.profesor_id = profesores.profesor_id
              LEFT JOIN trimestres ON secciones.trimestre_id = trimestres.trimestre_id
              WHERE 
                  (
                      eventos.es_global = TRUE
                      AND YEARWEEK(eventos.fecha, 1) BETWEEN YEARWEEK(?, 1) AND YEARWEEK(?, 1)
                  )
                  OR 
                  (
                      eventos.fecha BETWEEN ? AND ?
                  )
                  OR 
                  (
                      eventos.numero_semana IS NOT NULL
                      AND YEARWEEK(DATE_ADD(trimestres.fecha_inicio, INTERVAL (eventos.numero_semana - 1) * 7 DAY), 1) BETWEEN YEARWEEK(?, 1) AND YEARWEEK(?, 1)
                  )
              GROUP BY eventos.evento_id
              ORDER BY eventos.fecha ASC, eventos.numero_semana ASC`;

      pool.query(
        query,
        [
          fechaConsulta,
          fechaFin.format("YYYY-MM-DD"),
          fechaConsulta,
          fechaFin.format("YYYY-MM-DD"),
          fechaConsulta,
          fechaFin.format("YYYY-MM-DD"),
        ],
        (err, rows) => {
          if (err) {
            reject({
              error:
                "Error al obtener los próximos eventos de todos los profesores",
            });
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static asignarEventosGenericos(req, res) {
    const { evento_id, seccion_id, materia_id } = req.body;
    const queryFechaInicioTrimestre = `
            SELECT trimestres.fecha_inicio
            FROM secciones
            JOIN trimestres ON secciones.trimestre_id = trimestres.trimestre_id
            WHERE secciones.seccion_id = ?`;

    pool.query(queryFechaInicioTrimestre, [seccion_id], (err, results) => {
      if (err || results.length === 0) {
        res.status(500).json({
          error:
            "Error al obtener la fecha de inicio del trimestre para la sección.",
        });
        return;
      }

      const fechaInicioTrimestre = moment(results[0].fecha_inicio);

      evento_id.forEach((evento_id) => {
        const queryEventoGenerico = `SELECT * FROM eventos WHERE evento_id = ? AND es_global = FALSE`;

        pool.query(
          queryEventoGenerico,
          [evento_id],
          (err, resultadosEvento) => {
            if (err || resultadosEvento.length === 0) {
              res
                .status(500)
                .json({ error: "Error al obtener evento genérico." });
              return;
            }

            const evento = resultadosEvento[0];
            const fechaEvento = fechaInicioTrimestre
              .clone()
              .add(evento.numero_semana - 1, "weeks")
              .endOf("isoWeek")
              .format("YYYY-MM-DD");

            const queryInsertarEvento = `
                        INSERT INTO eventos (nombre, numero_semana, fecha, rasgos, materia_id, seccion_id, es_global) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;

            pool.query(
              queryInsertarEvento,
              [
                evento.nombre,
                evento.numero_semana,
                fechaEvento,
                evento.rasgos,
                materia_id,
                seccion_id,
                false,
              ],
              (error, resultadosInsercion) => {
                if (error) {
                  res.status(500).json({
                    error: "Error al asignar evento a la sección y materia.",
                  });
                  return;
                }
              }
            );
          }
        );
      });

      res.status(200).json({ mensaje: "Eventos asignados correctamente." });
    });
  }
}

module.exports = EventosController;
