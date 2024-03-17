-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-03-2024 a las 17:53:22
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8mb4 */
;

--
-- Base de datos: `bdea21`
--
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `eventos`
--
CREATE DATABASE IF NOT EXISTS bdea21;

USE bdea21;

ALTER USER 'root' @'localhost' IDENTIFIED BY '123';

CREATE TABLE `eventos` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Fecha` date NOT NULL,
  `ID_Materia` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `materias`
--
CREATE TABLE `materias` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `ID_Profesor` int(11) DEFAULT NULL,
  `ID_Seccion` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `profesores`
--
CREATE TABLE `profesores` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `secciones`
--
CREATE TABLE `secciones` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `ID_Materia` int(11) DEFAULT NULL,
  `ID_Profesor` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--
--
-- Indices de la tabla `eventos`
--
ALTER TABLE
  `eventos`
ADD
  PRIMARY KEY (`ID`),
ADD
  KEY `ID_Materia` (`ID_Materia`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE
  `materias`
ADD
  PRIMARY KEY (`ID`),
ADD
  KEY `ID_Profesor` (`ID_Profesor`),
ADD
  KEY `ID_Seccion` (`ID_Seccion`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE
  `profesores`
ADD
  PRIMARY KEY (`ID`);

--
-- Indices de la tabla `secciones`
--
ALTER TABLE
  `secciones`
ADD
  PRIMARY KEY (`ID`),
ADD
  KEY `ID_Materia` (`ID_Materia`),
ADD
  KEY `ID_Profesor` (`ID_Profesor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--
--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE
  `eventos`
MODIFY
  `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE
  `materias`
MODIFY
  `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE
  `profesores`
MODIFY
  `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `secciones`
--
ALTER TABLE
  `secciones`
MODIFY
  `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--
--
-- Filtros para la tabla `eventos`
--
ALTER TABLE
  `eventos`
ADD
  CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`ID_Materia`) REFERENCES `materias` (`ID`);

--
-- Filtros para la tabla `materias`
--
ALTER TABLE
  `materias`
ADD
  CONSTRAINT `materias_ibfk_1` FOREIGN KEY (`ID_Profesor`) REFERENCES `profesores` (`ID`),
ADD
  CONSTRAINT `materias_ibfk_2` FOREIGN KEY (`ID_Seccion`) REFERENCES `secciones` (`ID`);

--
-- Filtros para la tabla `secciones`
--
ALTER TABLE
  `secciones`
ADD
  CONSTRAINT `secciones_ibfk_1` FOREIGN KEY (`ID_Materia`) REFERENCES `materias` (`ID`),
ADD
  CONSTRAINT `secciones_ibfk_2` FOREIGN KEY (`ID_Profesor`) REFERENCES `profesores` (`ID`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;

INSERT INTO
  profesores (Nombre)
VALUES
  ('Juan Perez');

INSERT INTO
  secciones (Nombre)
VALUES
  ('VIV/FI');

INSERT INTO
  materias (Nombre, ID_Profesor, ID_Seccion)
VALUES
  ('Matemática I', 1, 1);

INSERT INTO
  eventos (Nombre, Fecha, ID_Materia)
VALUES
  ('Clase Unidad I', '2024-01-12', 1);

UPDATE
  secciones
SET
  ID_Materia = '1',
  ID_Profesor = '1'
WHERE
  Nombre = 'VIV/FI';

CREATE TABLE trimestres (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Fecha_Inicio DATE NOT NULL,
  Fecha_Final DATE NOT NULL
);

ALTER TABLE
  trimestres
ADD
  COLUMN Nombre VARCHAR(50);

INSERT INTO
  trimestres (Nombre, Fecha_Inicio, Fecha_Final)
VALUES
  ('2024A', '2024-01-08', '2024-04-07');

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombreUsuario VARCHAR(255) NOT NULL,
  contraseña VARCHAR(255) NOT NULL,
  rol ENUM('Profesor', 'Director') NOT NULL
);

ALTER TABLE eventos ADD COLUMN esglobal BOOLEAN NOT NULL DEFAULT FALSE;

FLUSH PRIVILEGES;