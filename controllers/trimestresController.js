const pool = require("../config/dbPool");

class TrimestresController {
  static listarTrimestres(req, res) {
    pool.query("SELECT * FROM trimestres", (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Error al obtener los trimestres" });
      } else {
        res.status(200).json(rows);
      }
    });
  }

  static agregarTrimestre(req, res) {
    const { nombre, fecha_inicio, fecha_fin } = req.body;
    console.log(nombre, fecha_inicio, fecha_fin);
    pool.query(
      "INSERT INTO trimestres (nombre, fecha_inicio, fecha_fin) VALUES (?, ?, ?)",
      [nombre, fecha_inicio, fecha_fin],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error al crear el trimestre" });
        } else {
          res
            .status(201)
            .json({ mensaje: "Trimestre creado", id: results.insertId });
        }
      }
    );
  }

  static editarTrimestre(req, res) {
    const { nombre, fecha_inicio, fecha_fin } = req.body;
    const { id } = req.params;
    console.log(nombre, fecha_inicio, fecha_fin, id);
    pool.query(
      "UPDATE trimestres SET nombre = ?, fecha_inicio = ?, fecha_fin = ? WHERE trimestre_id = ?",
      [nombre, fecha_inicio, fecha_fin, id],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error al actualizar el trimestre" });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: "Trimestre no encontrado" });
        } else {
          res.status(200).json({ mensaje: "Trimestre actualizado" });
        }
      }
    );
  }

  static eliminarTrimestre(req, res) {
    const { id } = req.params;
    pool.query(
      "DELETE FROM trimestres WHERE trimestre_id = ?",
      [id],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error al eliminar el trimestre" });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: "Trimestre no encontrado" });
        } else {
          res.status(200).json({ mensaje: "Trimestre eliminado" });
        }
      }
    );
  }
}

module.exports = TrimestresController;
