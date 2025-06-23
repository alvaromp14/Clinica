<?php
// Incluir el archivo de conexión a la base de datos
include 'conexionBD.php';

// Establecer la cabecera de respuesta para indicar que se devuelve JSON
//header('Content-Type: application/json');
$jsonData = file_get_contents('php://input'); 

// Verificar si se enviaron datos por método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $id_medico = $_POST['medico'];
    $id_clinica = $_POST['clinica'];
    $dia = $_POST['dia'];
    $hora_inicio = $_POST['hora_inicio'];
    $hora_fin = $_POST['hora_fin'];

    // Consulta SQL para insertar el horario
    $sql = "INSERT INTO horarios (id_medico, id_clinica, dias, hora_inicio, hora_fin) 
            VALUES ('$id_medico', '$id_clinica', '$dia', '$hora_inicio', '$hora_fin')";

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