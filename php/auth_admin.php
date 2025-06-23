<?php
// Incluir el archivo de conexión a la base de datos
include 'conexionBD.php';

// Verificar si se enviaron datos por método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $user = $_POST['user'];
    $password = $_POST['pass'];

    // Consulta SQL para verificar las credenciales del administrador
    $sql = "SELECT * FROM admins WHERE user = '$user' AND password = '$password'";

    // Ejecutar la consulta
    $resultado = $conexion->query($sql);

    // Verificar si se obtuvieron resultados
    if ($resultado->num_rows > 0) {
        // Las credenciales son válidas
        echo json_encode(array('success' => true));
    } else {
        // Las credenciales son inválidas
        echo json_encode(array('success' => false));
    }
} else {
    // Si no se enviaron datos por método POST, devolver un mensaje de error
    echo json_encode(array('error' => 'No se recibieron datos por el método POST.'));
}

// Cerrar la conexión a la base de datos
$conexion->close();