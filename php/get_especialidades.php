<?php
// Incluir el archivo de conexión a la base de datos
include 'conexionBD.php';

// Obtener los datos enviados por POST
$jsonData = file_get_contents('php://input');
// Decodificar los datos JSON en un array asociativo de PHP
$data = json_decode($jsonData, true);

// Obtener los datos enviados por POST
$idClinica = $data['idClinica'];

if ($idClinica === null) {
    echo json_encode(array('error' => 'idClinica no proporcionado'));
    exit;
}

// Consulta SQL para obtener las especialidades de la clínica especificada
$sql = "SELECT e.id_especialidad, e.descripcion 
        FROM especialidades e 
        INNER JOIN medicos m ON e.id_especialidad = m.id_especialidad 
        INNER JOIN `clinica-medico` cm ON m.id_medico = cm.id_medico 
        WHERE cm.id_clinica = '$idClinica' 
        GROUP BY e.id_especialidad";

// Ejecutar la consulta
$resultado = $conexion->query($sql);

// Verificar si se obtuvieron resultados
if ($resultado) {
    if ($resultado->num_rows > 0) {
        // Crear un array para almacenar las especialidades
        $especialidades = array();

        // Iterar sobre los resultados y guardarlos en el array
        while ($fila = $resultado->fetch_assoc()) {
            $especialidades[] = $fila;
        }

        // Devolver los datos de las especialidades en formato JSON
        echo json_encode($especialidades);
    } else {
        // Si no se encontraron especialidades, devolver un mensaje de error
        echo json_encode(array('mensaje' => 'No se encontraron especialidades.'));
    }
} else {
    // Si hubo un error en la consulta, devolver un mensaje de error
    echo json_encode(array('error' => 'Error en la consulta: ' . $conexion->error));
}

// Cerrar la conexión a la base de datos
$conexion->close();