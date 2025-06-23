<?php
// Incluir el archivo de conexión a la base de datos
include 'conexionBD.php';

// Obtener los datos enviados por POST
$jsonData = file_get_contents('php://input');
// Decodificar los datos JSON en un array asociativo de PHP
$data = json_decode($jsonData, true);

// Obtener los datos enviados por POST
$idClinica = $data['idClinica'];
$idEspecialidad = $data['idEspecialidad'];

if ($idClinica === null || $idEspecialidad === null) {
    echo json_encode(array('error' => 'idClinica o idEspecialidad no proporcionado'));
    exit;
}

// Consulta SQL para obtener el cuadro médico de la clínica y especialidad especificadas
$sql = "SELECT m.id_medico, m.nombre, m.foto
        FROM medicos m 
        INNER JOIN `clinica-medico` cm ON m.id_medico = cm.id_medico 
        WHERE cm.id_clinica = '$idClinica' 
        AND m.id_especialidad = '$idEspecialidad'";

// Ejecutar la consulta
$resultado = $conexion->query($sql);

// Verificar si se obtuvieron resultados
if ($resultado) {
    if ($resultado->num_rows > 0) {
        // Crear un array para almacenar el cuadro médico
        $cuadroMedico = array();

        // Iterar sobre los resultados y guardarlos en el array
        while ($fila = $resultado->fetch_assoc()) {
            $cuadroMedico[] = $fila;
        }

        // Devolver los datos del cuadro médico en formato JSON
        echo json_encode($cuadroMedico);
    } else {
        // Si no se encontraron médicos para la especialidad y clínica especificadas, devolver un mensaje vacío
        echo json_encode(array());
    }
} else {
    // Si hubo un error en la consulta, devolver un mensaje de error
    echo json_encode(array('error' => 'Error en la consulta: ' . $conexion->error));
}

// Cerrar la conexión a la base de datos
$conexion->close();