const mysql = require("mysql");
const dbConfig = require("../dbConfig");
const { startOfWeek, endOfWeek, format } = require("date-fns");
const { es } = require("date-fns/locale");

// Nombres de días en español para convertir los resultados del módulo date-fns
const diasSemana = {
  domingo: "domingo",
  lunes: "lunes",
  martes: "martes",
  miércoles: "miércoles",
  jueves: "jueves",
  viernes: "viernes",
  sábado: "sábado",
};

class CalendarioController {
  // Función para obtener todas los trimestres
  static async listar(req, res) {
    try {
      const trimestres = await dbQuery("SELECT * FROM trimestres");

      const trimestresFormateados = trimestres.map((trimestre) => ({
        ...trimestre,
        Fecha_Inicio: format(new Date(trimestre.Fecha_Inicio), "yyyy-MM-dd"),
        Fecha_Final: format(new Date(trimestre.Fecha_Final), "yyyy-MM-dd"),
      }));

      res.render("listaTrimestres", { trimestres: trimestresFormateados });
    } catch (error) {
      console.error("Error al listar los trimestres:", error);
      res
        .status(500)
        .render("error", { error: "Error al listar los trimestres" });
    }
  }

  // Función para agregar un nuevo trimestre
  static async agregar(req, res) {
    const { Nombre, Fecha_Inicio, Fecha_Final } = req.body;
    console.log(req.body); // Depurar entrada
    try {
      await dbQuery(
        "INSERT INTO trimestres (Nombre, Fecha_Inicio, Fecha_Final) VALUES (?, ?, ?)",
        [Nombre, Fecha_Inicio, Fecha_Final]
      );
      res.json({ mensaje: "Trimestre agregado con éxito" });
    } catch (error) {
      console.error("Error al agregar el trimestre:", error);
      res.status(500).json({ error: "Error al agregar el trimestre" });
    }
  }

  // Función para editar un trimestre
  static async editar(req, res) {
    const { id } = req.params;
    const { Nombre, Fecha_Inicio, Fecha_Final } = req.body;
    console.log(req.body); // Depurar entrada
    try {
      await dbQuery(
        "UPDATE trimestres SET Nombre = ?, Fecha_Inicio = ?, Fecha_Final = ? WHERE ID = ?",
        [Nombre, Fecha_Inicio, Fecha_Final, id]
      );
      res.json({ mensaje: "Trimestre editado con éxito" });
    } catch (error) {
      console.error("Error al editar el trimestre:", error);
      res.status(500).json({ error: "Error al editar el trimestre" });
    }
  }

  // Función para eliminar un trimestre
  static async eliminar(req, res) {
    const { id } = req.params;
    try {
      await dbQuery("DELETE FROM trimestres WHERE ID = ?", [id]);
      res.json({ mensaje: "Trimestre eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar el trimestre:", error);
      res.status(500).json({ error: "Error al eliminar el trimestre" });
    }
  }

  static async actividadesSemana(req, res) {
    const { trimestre, semana } = req.params;

    try {
      // Obtener información del trimestre desde la base de datos
      const trimestreInfo = await obtenerInfoTrimestre(trimestre);

      if (!trimestreInfo) {
        throw new Error(
          "El trimestre especificado no existe en la base de datos."
        );
      }

      // Calcular las fechas de inicio y fin de la semana
      const { inicioSemana, finSemana } = calcularFechasSemana(
        trimestreInfo.Fecha_Inicio,
        semana
      );

      // Consultar las actividades programadas en el rango de fechas, incluyendo eventos globales
      const actividades = await dbQuery(
        `
            SELECT e.ID, e.Nombre AS NombreEvento, e.Fecha, 
                   IF(e.esglobal, 'Global', m.Nombre) AS NombreMateria,
                   IF(e.esglobal, 'Todos', p.Nombre) AS NombreProfesor, 
                   IF(e.esglobal, 'Todos', s.Nombre) AS NombreSeccion
            FROM eventos e
            LEFT JOIN materias m ON e.ID_Materia = m.ID AND e.esglobal = 0
            LEFT JOIN profesores p ON m.ID_Profesor = p.ID
            LEFT JOIN secciones s ON m.ID_Seccion = s.ID
            WHERE e.Fecha BETWEEN ? AND ?
            ORDER BY e.Fecha ASC`,
        [inicioSemana, finSemana]
      );

      // Formatear los resultados y devolverlos como respuesta
      const actividadesFormateadas = actividades.map((actividad) => ({
        ID: actividad.ID,
        Nombre: actividad.NombreEvento,
        Fecha: {
          fecha: format(new Date(actividad.Fecha), "yyyy-MM-dd"),
          diaSemana:
            diasSemana[
              format(new Date(actividad.Fecha), "EEEE", { locale: es })
            ], // Obtener el nombre del día de la semana en español
        },
        Materia: actividad.NombreMateria,
        Profesor: actividad.NombreProfesor,
        Seccion: actividad.NombreSeccion,
      }));

      // Utilizar res.render para enviar los datos a la vista EJS
      res.render("actividadesSemana", {
        trimestre,
        semana,
        inicioSemana: inicioSemana.split(" ")[0], // Solo fecha sin nombre de día
        finSemana: finSemana.split(" ")[0], // Solo fecha sin nombre de día
        actividades: actividadesFormateadas,
      });
    } catch (error) {
      console.error("Error al obtener las actividades de la semana:", error);
      res
        .status(500)
        .json({ error: "Error al obtener las actividades de la semana" });
    }
  }
}

// Función para obtener información del trimestre desde la base de datos
async function obtenerInfoTrimestre(nombreTrimestre) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);
    connection.query(
      `SELECT * FROM trimestres WHERE Nombre = ?`,
      [nombreTrimestre],
      (error, results) => {
        connection.end();
        if (error) {
          reject(error);
          return;
        }
        if (results.length === 0) {
          resolve(null); // Trimestre no encontrado
        } else {
          resolve(results[0]);
        }
      }
    );
  });
}

// Función para calcular las fechas de inicio y fin de la semana
function calcularFechasSemana(fechaInicioTrimestre, semana) {
  // Calcular la fecha de inicio de la semana
  const inicioSemana = startOfWeek(new Date(fechaInicioTrimestre));
  inicioSemana.setDate(inicioSemana.getDate() + (parseInt(semana) - 1) * 7);

  // Calcular la fecha de fin de la semana
  const finSemana = new Date(inicioSemana);
  finSemana.setDate(finSemana.getDate() + 6);

  // Formatear las fechas en formato AAAA-MM-DD con el nombre del día de la semana en español
  return {
    inicioSemana:
      format(inicioSemana, "yyyy-MM-dd", { locale: es }) +
      " " +
      diasSemana[format(inicioSemana, "EEEE", { locale: es })],
    finSemana:
      format(finSemana, "yyyy-MM-dd", { locale: es }) +
      " " +
      diasSemana[format(finSemana, "EEEE", { locale: es })],
  };
}

// Función de utilidad para ejecutar consultas SQL
function dbQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);
    connection.query(sql, params, (error, results) => {
      connection.end();
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = CalendarioController;
