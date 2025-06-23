<?php
// Definición de los datos de conexión a la base de datos
$host = 'localhost';    // Dirección del servidor
$usuario = 'root';      // Nombre de usuario
$clave = '';            // Contraseña
$bd = 'bd_clinica';     // Nombre de la base de datos

// Creación de una nueva instancia de la clase mysqli para establecer la conexión
$conexion = new mysqli($host, $usuario, $clave, $bd);

// Verificación de errores en la conexión
if ($conexion->connect_error) {
    // Si hay un error en la conexión, se imprime un mensaje de error y se termina la ejecución del script
    die("Error de conexión: " . $conexion->connect_error);
}