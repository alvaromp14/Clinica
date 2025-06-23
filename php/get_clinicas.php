<?php
// Incluir el archivo de conexión a la base de datos
include 'conexionBD.php';

// Establecer la cabecera de respuesta para indicar que se devuelve JSON
//header('Content-Type: application/json');
$jsonData = file_get_contents('php://input'); 

// Consulta SQL para obtener las clínicas
$sql = "SELECT * FROM clinica";

// Ejecutar la consulta
$resultado = $conexion->query($sql);

// Verificar si se obtuvieron resultados
if ($resultado->num_rows > 0) {
    // Crear un array para almacenar los datos de las clínicas
    $clinicas = array();

    // Iterar sobre los resultados y guardarlos en el array
    while ($fila = $resultado->fetch_assoc()) {
        $clinicas[] = $fila;
    }

    // Devolver los datos de las clínicas en formato JSON
    echo json_encode($clinicas);
} else {
    // Si no se encontraron clínicas, devolver un mensaje de error
    echo json_encode(array('mensaje' => 'No se encontraron clínicas.'));
}

// Cerrar la conexión a la base de datos
$conexion->close();