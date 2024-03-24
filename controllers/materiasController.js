const pool = require("../config/dbPool");

class MateriasController {
  static listarMaterias(req, res) {
    pool.query("SELECT * FROM materias", (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Error al obtener las materias" });
      } else {
        res.status(200).json(rows);
      }
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
}

module.exports = MateriasController;
