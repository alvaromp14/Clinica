<?php
// Incluir el archivo de conexión a la base de datos
include 'conexionBD.php';

// Obtener los datos enviados por POST
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Obtener los datos enviados por POST
$idCita = $data['idCita'];
$n_afiliacion = $data['n_afiliacion'];
$email = $data['email'];

if ($idCita === null || $n_afiliacion === null || $email === null) {
    echo json_encode(array('error' => 'Datos incompletos proporcionados'));
    exit;
}

// Consulta SQL para verificar si el paciente existe
$sqlVerificarPaciente = "SELECT * FROM paciente WHERE n_afiliacion = '$n_afiliacion' AND email = '$email'";
$resultadoVerificarPaciente = $conexion->query($sqlVerificarPaciente);

if ($resultadoVerificarPaciente && $resultadoVerificarPaciente->num_rows > 0) {
    // Paciente encontrado, proceder a actualizar la cita
    $sqlActualizarCita = "UPDATE agenda SET n_afiliacion = '$n_afiliacion' WHERE id = '$idCita'";

    if ($conexion->query($sqlActualizarCita) === TRUE) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('error' => 'Error al actualizar la cita: ' . $conexion->error));
    }
} else {
    // Paciente no encontrado
    echo json_encode(array('error' => 'Paciente no encontrado'));
}

// Cerrar la conexión a la base de datos
$conexion->close();