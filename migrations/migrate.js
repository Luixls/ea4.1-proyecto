const mysql = require('mysql'); 
const fs = require('fs'); 
const path = require('path'); 
 
// Primero, se establece una conexión sin especificar una base de datos para verificar la existencia o crear la nueva base de datos. 
const initialConnection = mysql.createConnection({ 
  host: '127.0.0.1', // Asegurarse de incluir información válida en el contexto.
  user: 'root', // Asegurarse de añadir la contraseña de MySQL aquí 
}); 
 
initialConnection.connect(err => { 
  if (err) { 
    console.error('Error conectando a MySQL:', err); 
    return; 
  } 
 
  console.log('Conectado exitosamente a MySQL.'); 
  initialConnection.query('CREATE DATABASE IF NOT EXISTS bdea21', (err) => { 
    if (err) { 
      console.error('Error creando la base de datos:', err); 
      return; 
    } 
 
    console.log('La base de datos bdea21 está lista.'); 
    initialConnection.end(); // Cerrar esta conexión inicial 
 
    // Ahora que la base de datos existe, se establece una conexión específica para ella. 
    const connection = mysql.createConnection({ 
      host: '127.0.0.1', 
      user: 'root', 
      database: 'bdea21', 
      multipleStatements: true, 
    }); 
 
    const filePath = path.join(); // Se ajusta esta ruta al lugar correcto del archivo SQL, considerar un formato PATH
 
    fs.readFile(filePath, 'utf8', (err, data) => { 
      if (err) { 
        console.error('Error al leer el archivo SQL:', err); 
        return; 
      } 
 
      connection.connect(err => { 
        if (err) { 
          console.error('Error de conexión a la base de datos:', err); 
          return; 
        } 
 
        console.log('Conectado exitosamente a la base de datos bdea21.'); 
        connection.query(data, (err, results) => { 
          if (err) { 
            console.error('Error al ejecutar las consultas SQL:', err); 
            return; 
          } 
 
          console.log('Migración exitosa. Base de datos y tablas creadas correctamente.'); 
          connection.end(err => { 
            if (err) { 
              console.error('Error al cerrar la conexión:', err); 
            } 
          }); 
        }); 
      }); 
    }); 
  }); 
});