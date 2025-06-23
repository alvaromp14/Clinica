<?php
// Incluir el archivo de conexión a la base de datos
include 'conexionBD.php';

// Verificar si se enviaron datos por método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener el id del médico
    $id_medico = $_POST['id_medico'];

    // Consulta para obtener los días de consulta del médico
    $sql = "SELECT id, dias, hora_inicio, hora_fin FROM horarios WHERE id_medico = '$id_medico'";
    $result = $conexion->query($sql);

    // Crear un array para almacenar los días de consulta
    $dias_consulta = array();
    while ($row = $result->fetch_assoc()) {
        $dias_consulta[] = $row;
    }

    // Devolver los datos en formato JSON
    echo json_encode($dias_consulta);
} else {
    // Si no se enviaron datos por método POST, devolver un mensaje de error
    echo json_encode(array('error' => 'No se recibieron datos por el método POST.'));
}

// Cerrar la conexión a la base de datos
$conexion->close();