--
-- Base de datos: `bd_clinica`
--
CREATE DATABASE IF NOT EXISTS `bd_clinica` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bd_clinica`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--

CREATE TABLE `admins` (
  `id_admin` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `user` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`id_admin`, `nombre`, `user`, `password`) VALUES
(1, 'Álvaro', 'admin', '1234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agenda`
--

CREATE TABLE `agenda` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `id_clinica` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `n_afiliacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `agenda`
--

INSERT INTO `agenda` (`id`, `id_medico`, `id_clinica`, `fecha`, `hora`, `n_afiliacion`) VALUES
(1, 3, 3, '2024-06-10', '08:00:00', NULL),
(2, 3, 3, '2024-06-10', '08:30:00', NULL),
(3, 3, 3, '2024-06-12', '08:00:00', NULL),
(4, 3, 3, '2024-06-12', '08:30:00', NULL),
(5, 3, 3, '2024-06-14', '08:00:00', NULL),
(6, 3, 3, '2024-06-14', '08:30:00', NULL),
(7, 2, 2, '2024-06-11', '09:00:00', NULL),
(8, 2, 2, '2024-06-11', '09:30:00', NULL),
(9, 2, 2, '2024-06-12', '09:00:00', NULL),
(10, 2, 2, '2024-06-12', '09:30:00', 498019121),
(11, 1, 1, '2024-06-14', '08:00:00', NULL),
(12, 1, 1, '2024-06-14', '08:30:00', 498019121);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clinica`
--

CREATE TABLE `clinica` (
  `id_clinica` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `ubicacion` varchar(45) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `foto` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clinica`
--

INSERT INTO `clinica` (`id_clinica`, `nombre`, `descripcion`, `ubicacion`, `telefono`, `foto`) VALUES
(1, 'Clínica 1', 'Descripción de Clínica A', 'Dirección A', '123456789', 'img/clinica/clinica.png'),
(2, 'Clínica 2', 'Descripción de Clínica B', 'Dirección B', '123456789', 'img/clinica/clinica.png'),
(3, 'Clínica 3', 'Descripción de Clínica C', 'Dirección C', '123456789', 'img/clinica/clinica.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clinica-medico`
--

CREATE TABLE `clinica-medico` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `id_clinica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clinica-medico`
--

INSERT INTO `clinica-medico` (`id`, `id_medico`, `id_clinica`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `id_especialidad` int(11) NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`id_especialidad`, `descripcion`) VALUES
(1, 'Pediatría'),
(2, 'Traumatología'),
(3, 'Cardiología');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `dias` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `id_clinica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`id`, `id_medico`, `dias`, `hora_inicio`, `hora_fin`, `id_clinica`) VALUES
(1, 3, '2024-06-10', '08:00:00', '13:30:00', 3),
(2, 3, '2024-06-12', '08:00:00', '13:30:00', 3),
(3, 3, '2024-06-14', '08:00:00', '13:30:00', 3),
(4, 2, '2024-06-11', '09:00:00', '13:00:00', 2),
(5, 2, '2024-06-12', '09:00:00', '13:00:00', 2),
(6, 1, '2024-06-14', '08:00:00', '14:00:00', 1),
(8, 1, '2024-06-21', '09:53:00', '22:54:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id_medico` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `foto` varchar(45) NOT NULL,
  `id_especialidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`id_medico`, `nombre`, `foto`, `id_especialidad`) VALUES
(1, 'Dr. Rodríguez', 'img/medico/medico.png', 1),
(2, 'Dr. Martínez', 'img/medico/medico.png', 2),
(3, 'Dr. García', 'img/medico/medico.png', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `n_afiliacion` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `email` varchar(45) NOT NULL,
  `fecha_nac` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`n_afiliacion`, `nombre`, `apellidos`, `telefono`, `email`, `fecha_nac`) VALUES
(123456789, 'Juan', 'Pérez', '123456789', 'juan@example.com', '1990-01-01'),
(498019121, 'Álvaro', 'Molina', '640381888', 'alvaromp1401@gmail.com', '2001-06-04'),
(987654321, 'María', 'García', '987654321', 'maria@example.com', '1985-05-15');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indices de la tabla `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_6` (`id_medico`),
  ADD KEY `FK_7` (`id_clinica`),
  ADD KEY `FK_8` (`n_afiliacion`);

--
-- Indices de la tabla `clinica`
--
ALTER TABLE `clinica`
  ADD PRIMARY KEY (`id_clinica`);

--
-- Indices de la tabla `clinica-medico`
--
ALTER TABLE `clinica-medico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3` (`id_medico`),
  ADD KEY `FK_4` (`id_clinica`);

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id_especialidad`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_2` (`id_medico`),
  ADD KEY `FK_5` (`id_clinica`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id_medico`),
  ADD KEY `FK_1` (`id_especialidad`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`n_afiliacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admins`
--
ALTER TABLE `admins`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `clinica`
--
ALTER TABLE `clinica`
  MODIFY `id_clinica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `clinica-medico`
--
ALTER TABLE `clinica-medico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `id_especialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id_medico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agenda`
--
ALTER TABLE `agenda`
  ADD CONSTRAINT `FK_6` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`),
  ADD CONSTRAINT `FK_7` FOREIGN KEY (`id_clinica`) REFERENCES `clinica` (`id_clinica`),
  ADD CONSTRAINT `FK_8` FOREIGN KEY (`n_afiliacion`) REFERENCES `paciente` (`n_afiliacion`);

--
-- Filtros para la tabla `clinica-medico`
--
ALTER TABLE `clinica-medico`
  ADD CONSTRAINT `FK_3` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`),
  ADD CONSTRAINT `FK_4` FOREIGN KEY (`id_clinica`) REFERENCES `clinica` (`id_clinica`);

--
-- Filtros para la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD CONSTRAINT `FK_2` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`),
  ADD CONSTRAINT `FK_5` FOREIGN KEY (`id_clinica`) REFERENCES `clinica` (`id_clinica`);

--
-- Filtros para la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `FK_1` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidades` (`id_especialidad`);
