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

// Consulta para obtener las clínicas
$sql_clinicas = "SELECT id_clinica, nombre FROM clinica";
$result_clinicas = $conexion->query($sql_clinicas);

// Crear un array para almacenar las clínicas
$clinicas = array();
while ($row = $result_clinicas->fetch_assoc()) {
    $clinicas[] = $row;
}

// Devolver los datos en formato JSON
echo json_encode(array('medicos' => $medicos, 'clinicas' => $clinicas));

// Cerrar la conexión a la base de datos
$conexion->close();