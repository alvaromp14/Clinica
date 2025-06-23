<?php
// Incluir el archivo de conexión a la base de datos
include 'conexionBD.php';

// Verificar si se enviaron datos por método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener el id del día de consulta
    $id = $_POST['id'];

    // Consulta para eliminar el día de consulta
    $sql = "DELETE FROM horarios WHERE id = '$id'";

    // Ejecutar la consulta
    if ($conexion->query($sql) === TRUE) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false, 'error' => $conexion->error));
    }
} else {
    // Si no se enviaron datos por método POST, devolver un mensaje de error
    echo json_encode(array('error' => 'No se recibieron datos por el método POST.'));
}

// Cerrar la conexión a la base de datos
$conexion->close();