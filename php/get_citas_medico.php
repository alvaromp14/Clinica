<?php
// Incluir el archivo de conexión a la base de datos
include 'conexionBD.php';

// Obtener el id del médico enviado por POST
$idMedico = $_POST['id_medico'];

// Consulta SQL para obtener las citas del médico especificado
$sql = "SELECT fecha, hora, n_afiliacion FROM agenda WHERE id_medico = $idMedico AND n_afiliacion IS NOT NULL";

// Ejecutar la consulta
$resultado = $conexion->query($sql);

// Verificar si se obtuvieron resultados
if ($resultado->num_rows > 0) {
    // Crear un array para almacenar las citas
    $citas = array();

    // Iterar sobre los resultados y guardarlos en el array
    while ($fila = $resultado->fetch_assoc()) {
        $citas[] = $fila;
    }

    // Devolver los datos de las citas en formato JSON
    echo json_encode($citas);
} else {
    // Si no se encontraron citas, devolver un mensaje de error
    echo json_encode(array('mensaje' => 'No se encontraron citas para este médico.'));
}

// Cerrar la conexión a la base de datos
$conexion->close();