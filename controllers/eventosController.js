const pool = require("../config/dbPool");

class EventosController {
  static listarEventos(req, res) {
    const query = `SELECT eventos.evento_id, eventos.nombre, eventos.numero_semana, eventos.fecha, eventos.rasgos, eventos.seccion_id, eventos.materia_id, eventos.es_global, secciones.nombre AS seccion_nombre, materias.nombre AS materia_nombre
                   FROM eventos
                   LEFT JOIN secciones ON eventos.seccion_id = secciones.seccion_id
                   LEFT JOIN materias ON eventos.materia_id = materias.materia_id`;
    pool.query(query, (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Error al obtener los eventos" });
      } else {
        res.status(200).json(rows);
      }
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
}

module.exports = EventosController;
