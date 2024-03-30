const pool = require("../config/dbPool");
const moment = require("moment");
moment.locale("es");

class TrimestresController {
  static listarTrimestres() {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM trimestres", (err, rows) => {
        if (err) {
          reject({ error: "Error al obtener los trimestres" });
        } else {
          const trimestresFormateados = rows.map((trimestre) => {
            trimestre.fecha_inicio = moment(trimestre.fecha_inicio).format(
              "LL"
            );
            trimestre.fecha_fin = moment(trimestre.fecha_fin).format("LL");
            return trimestre;
          });
          resolve(trimestresFormateados);
        }
      });
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
