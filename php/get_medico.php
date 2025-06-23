<?php
// Incluir el archivo de conexión a la base de datos
include 'conexionBD.php';

// Obtener los datos enviados por POST
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Obtener los datos enviados por POST
$idMedico = $data['id_medico'];

if ($idMedico === null) {
    echo json_encode(array('error' => 'id_medico no proporcionado'));
    exit;
}

// Consulta SQL para obtener la información del médico
$sqlMedico = "SELECT m.nombre, m.foto, e.descripcion as especialidad
              FROM medicos m 
              INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad 
              WHERE m.id_medico = '$idMedico'";

$resultadoMedico = $conexion->query($sqlMedico);

if ($resultadoMedico && $resultadoMedico->num_rows > 0) {
    $medico = $resultadoMedico->fetch_assoc();

    // Consulta SQL para obtener las citas disponibles del médico
    $sqlCitas = "SELECT id, fecha, hora 
                 FROM agenda 
                 WHERE id_medico = '$idMedico' AND n_afiliacion IS NULL";

    $resultadoCitas = $conexion->query($sqlCitas);

    if ($resultadoCitas) {
        $citas = array();

        while ($fila = $resultadoCitas->fetch_assoc()) {
            $citas[] = $fila;
        }

        // Devolver los datos del médico y sus citas en formato JSON
        echo json_encode(array('medico' => $medico, 'citas' => $citas));
    } else {
        echo json_encode(array('error' => 'Error al obtener las citas: ' . $conexion->error));
    }
} else {
    echo json_encode(array('error' => 'No se encontró el médico.'));
}

// Cerrar la conexión a la base de datos
$conexion->close();