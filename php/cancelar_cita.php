<?php
// Incluir el archivo de conexión a la base de datos
include 'conexionBD.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$idCita = $data['idCita'];

$sql = "UPDATE agenda SET n_afiliacion = NULL WHERE id = '$idCita'";

$response = array();
if ($conexion->query($sql) === TRUE) {
    $response['success'] = true;
} else {
    $response['success'] = false;
}

$conexion->close();

echo json_encode($response);