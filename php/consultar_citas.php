<?php
// Incluir el archivo de conexión a la base de datos
include 'conexionBD.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$n_afiliacion = $data['n_afiliacion'];

$sql = "SELECT * FROM agenda WHERE n_afiliacion = '$n_afiliacion'";
$result = $conexion->query($sql);

$citas = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $citas[] = $row;
    }
}

$conexion->close();

echo json_encode($citas);