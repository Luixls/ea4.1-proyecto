const pool = require("../config/dbPool");

class ProfesoresController {
  static listarProfesores(req, res) {
    pool.query("SELECT * FROM profesores", (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Error al obtener los profesores" });
      } else {
        res.status(200).json(rows);
      }
    });
  }

  static agregarProfesor(req, res) {
    const { nombre } = req.body;
    console.log(nombre);
    pool.query(
      "INSERT INTO profesores (nombre) VALUES (?)",
      [nombre],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error al crear el profesor" });
        } else {
          res
            .status(201)
            .json({ mensaje: "Profesor creado", id: results.insertId });
        }
      }
    );
  }

  static editarProfesor(req, res) {
    const { nombre } = req.body;
    const { id } = req.params;
    console.log(nombre, id);
    pool.query(
      "UPDATE profesores SET nombre = ? WHERE profesor_id = ?",
      [nombre, id],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error al actualizar el profesor" });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: "Profesor no encontrado" });
        } else {
          res.status(200).json({ mensaje: "Profesor actualizado" });
        }
      }
    );
  }

  static eliminarProfesor(req, res) {
    const { id } = req.params;
    pool.query(
      "DELETE FROM profesores WHERE profesor_id = ?",
      [id],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error al eliminar el profesor" });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: "Profesor no encontrado" });
        } else {
          res.status(200).json({ mensaje: "Profesor eliminado" });
        }
      }
    );
  }
}

module.exports = ProfesoresController;
