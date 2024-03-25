CREATE DATABASE uvmbd;
USE uvmbd; 
ALTER USER 'root' @'localhost' IDENTIFIED BY '123';
-- Creación de la tabla de Profesores
CREATE TABLE profesores (
    profesor_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Creación de la tabla de Materias
CREATE TABLE materias (
    materia_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Creación de la tabla de Secciones
CREATE TABLE secciones (
    seccion_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    profesor_id INT,
    materia_id INT,
    FOREIGN KEY (profesor_id) REFERENCES profesores(profesor_id) ON DELETE SET NULL,
    FOREIGN KEY (materia_id) REFERENCES materias(materia_id) ON DELETE SET NULL
);

-- Creación de la tabla de Eventos
CREATE TABLE eventos (
    evento_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    numero_semana INT,
    fecha DATE,
    rasgos VARCHAR(50),
	materia_id INT,
    seccion_id INT,
    es_global BOOLEAN DEFAULT FALSE,
	FOREIGN KEY (materia_id) REFERENCES materias(materia_id) ON DELETE SET NULL,
    FOREIGN KEY (seccion_id) REFERENCES secciones(seccion_id) ON DELETE SET NULL
);

-- Creación de la tabla de Trimestres
CREATE TABLE trimestres (
    trimestre_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL
);

-- Creación de la tabla de Usuarios
CREATE TABLE usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('director', 'profesor', 'estudiante') NOT NULL
);

-- Creación de datos de ejemplo para cada tabla (excepto usuarios)
INSERT INTO trimestres (nombre, fecha_inicio, fecha_fin) VALUES ('2024A', '2024-01-08', '2024-04-12');
INSERT INTO trimestres (nombre, fecha_inicio, fecha_fin) VALUES ('2024B', '2024-05-06', '2024-08-16');
INSERT INTO trimestres (nombre, fecha_inicio, fecha_fin) VALUES ('2024C', '2024-09-02', '2024-12-13');

INSERT INTO profesores (nombre) VALUES ('Juan Pérez');

INSERT INTO materias (nombre) VALUES ('Matemática I');

INSERT INTO secciones (nombre, profesor_id, materia_id) VALUES ('VIV/FI', 1, 1);

-- Eventos globales
INSERT INTO eventos (nombre, numero_semana, fecha, rasgos, es_global) VALUES ('Bienvenida al Trimestre', NULL, '2024-01-08', 'Bienvenida al 2024A', TRUE);
INSERT INTO eventos (nombre, numero_semana, fecha, rasgos, es_global) VALUES ('Corte de Notas 1', NULL, '2024-02-02', 'Corte de Notas', TRUE);
INSERT INTO eventos (nombre, numero_semana, fecha, rasgos, es_global) VALUES ('Día Feriado - Aniversario de la Facultad de Ingeniería', NULL, '2024-03-22', 'Feriado', TRUE);

-- Eventos específicos de sección
INSERT INTO eventos (nombre, numero_semana, fecha, rasgos, materia_id, seccion_id, es_global) VALUES ('Clase Unidad I', 1, NULL, 'Clase', 1, 1, FALSE);
INSERT INTO eventos (nombre, numero_semana, fecha, rasgos, materia_id, seccion_id, es_global) VALUES ('Clase Unidad I, Continuación', 2, NULL, 'Clase', 1, 1, FALSE);
INSERT INTO eventos (nombre, numero_semana, fecha, rasgos, materia_id, seccion_id, es_global) VALUES ('Evaluación Unidad I', 3, NULL, 'Evaluación, Ponderación 20%', 1, 1, FALSE);