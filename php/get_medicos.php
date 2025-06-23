<?php
// Incluir el archivo de conexión a la base de datos
include 'conexionBD.php';

// Consulta para obtener los médicos
$sql_medicos = "SELECT id_medico, nombre FROM medicos";
$result_medicos = $conexion->query($sql_medicos);

// Crear un array para almacenar los médicos
$medicos = array();
while ($row = $result_medicos->fetch_assoc()) {
    $medicos[] = $row;
}

// Devolver los datos en formato JSON
echo json_encode($medicos);

// Cerrar la conexión a la base de datos
$conexion->close();