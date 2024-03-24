const pool = require("../config/dbPool");

class SeccionesController {
  static listarSecciones(req, res) {
    const query = `SELECT secciones.seccion_id, secciones.nombre AS seccion_nombre, profesores.nombre AS profesor_nombre, materias.nombre AS materia_nombre
                   FROM secciones
                   LEFT JOIN profesores ON secciones.profesor_id = profesores.profesor_id
                   LEFT JOIN materias ON secciones.materia_id = materias.materia_id`;
    pool.query(query, (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Error al obtener las secciones" });
      } else {
        res.status(200).json(rows);
      }
    });
  }

  static agregarSeccion(req, res) {
    const { nombre, profesor_id, materia_id } = req.body;
    console.log(nombre, profesor_id, materia_id);
    const query =
      "INSERT INTO secciones (nombre, profesor_id, materia_id) VALUES (?, ?, ?)";
    pool.query(query, [nombre, profesor_id, materia_id], (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error al crear la sección" });
      } else {
        res
          .status(201)
          .json({ mensaje: "Sección creada", id: results.insertId });
      }
    });
  }

  static editarSeccion(req, res) {
    const { nombre, profesor_id, materia_id } = req.body;
    const { id } = req.params;
    console.log(nombre, profesor_id, materia_id, id);
    const query =
      "UPDATE secciones SET nombre = ?, profesor_id = ?, materia_id = ? WHERE seccion_id = ?";
    pool.query(query, [nombre, profesor_id, materia_id, id], (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error al actualizar la sección" });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: "Sección no encontrada" });
      } else {
        res.status(200).json({ mensaje: "Sección actualizada" });
      }
    });
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
}

module.exports = SeccionesController;
