# Clinica 🏥

`Clinica` es una aplicación web integral diseñada para la gestión eficiente de pacientes y citas en entornos clínicos. Esta plataforma ofrece una interfaz intuitiva tanto para administradores como para usuarios, facilitando la organización de la atención médica, la programación de citas y el acceso a la información relevante de los pacientes. Desarrollada con tecnologías web estándar, `Clinica` busca optimizar los procesos administrativos y mejorar la experiencia de los pacientes en el sistema de salud.




## 🌟 Características Principales

La aplicación `Clinica` ofrece un conjunto robusto de funcionalidades para una gestión clínica eficiente y una experiencia de usuario mejorada:

### Para Administradores:

-   **Gestión de Pacientes:** Registro, actualización y consulta de la información detallada de los pacientes, incluyendo datos demográficos y de contacto.
-   **Gestión de Médicos:** Administración de la información de los profesionales médicos, sus especialidades y horarios de disponibilidad.
-   **Gestión de Clínicas:** Registro y mantenimiento de los datos de las diferentes clínicas o sedes, incluyendo descripción, ubicación y contacto.
-   **Gestión de Especialidades:** Definición y organización de las distintas especialidades médicas ofrecidas.
-   **Gestión de Horarios:** Configuración y actualización de los horarios de atención de cada médico en cada clínica, permitiendo una planificación precisa.
-   **Gestión de Citas:** Visualización, edición y cancelación de citas programadas para todos los pacientes y médicos.
-   **Panel de Control Administrativo:** Acceso a una vista consolidada para supervisar la actividad general de la clínica.

### Para Usuarios (Pacientes):

-   **Registro y Autenticación Segura:** Creación de cuentas de usuario y acceso seguro a la plataforma para gestionar sus interacciones con la clínica.
-   **Programación de Citas:** Facilidad para buscar médicos y clínicas, consultar su disponibilidad y agendar citas de forma online.
-   **Gestión de Citas Personales:** Visualización, modificación y cancelación de sus propias citas programadas.
-   **Consulta de Historial:** Acceso a un historial de citas pasadas y futuras.
-   **(Opcional) Notificaciones:** Posibilidad de recibir confirmaciones y recordatorios de citas por correo electrónico o SMS (si se implementa).




## 🛠️ Tecnologías Utilizadas

`Clinica` ha sido desarrollada utilizando un conjunto de tecnologías web estándar, lo que garantiza su robustez, escalabilidad y facilidad de mantenimiento:

-   **Frontend:** La interfaz de usuario se construye con **HTML5** para la estructura semántica, **CSS3** para un diseño moderno y responsivo, y **JavaScript** para la interactividad dinámica y una experiencia de usuario fluida.
-   **Backend:** La lógica de negocio y la gestión de la información son manejadas por **PHP**, que actúa como el lenguaje de scripting del lado del servidor, procesando las solicitudes y coordinando las operaciones con la base de datos.
-   **Base de Datos:** Se utiliza **MySQL** como sistema de gestión de bases de datos relacionales, proporcionando un almacenamiento seguro y eficiente para toda la información de pacientes, médicos, clínicas, especialidades, horarios y citas.




## 📂 Estructura del Proyecto

El repositorio `Clinica` está organizado de manera lógica para separar las distintas capas de la aplicación, facilitando su comprensión y mantenimiento:

-   **`css/`**: Contiene todas las hojas de estilo CSS (`.css`) que definen la presentación visual de la aplicación, asegurando un diseño atractivo y responsivo.
-   **`img/`**: Almacena los recursos gráficos e imágenes (`.png`, `.jpg`, etc.) utilizados en la interfaz de usuario, como logotipos, iconos y fotografías.
-   **`js/`**: Incluye los archivos JavaScript (`.js`) que proporcionan interactividad en el lado del cliente, mejorando la experiencia del usuario con funcionalidades dinámicas.
-   **`php/`**: Este directorio es el corazón del backend de la aplicación. Contiene los scripts PHP que manejan la lógica de negocio, la interacción con la base de datos y la generación dinámica de contenido. Aquí se encuentran los controladores, modelos y otras funciones esenciales del servidor.
-   **`bd_clinica.sql`**: Archivo SQL que define la estructura completa de la base de datos, incluyendo la creación de tablas (admins, agenda, clinica, clinica-medico, especialidades, horarios, medicos, paciente), sus relaciones y datos de ejemplo iniciales para facilitar la configuración.
-   **`index.html`**: El punto de entrada principal de la aplicación, que carga los recursos iniciales y dirige al usuario a las diferentes secciones de la plataforma.
-   **`README.md`**: Este archivo, que proporciona una descripción general del proyecto, sus características, tecnologías, instrucciones de instalación y uso.




## ⚙️ Requisitos del Sistema

Para poder desplegar y ejecutar la aplicación `Clinica` en tu entorno local, asegúrate de cumplir con los siguientes requisitos:

-   **Servidor Web:** Un servidor web compatible con PHP, como Apache o Nginx. Se recomienda configurar un host virtual para la aplicación.
-   **PHP:** Versión 7.4 o superior. Es fundamental que las extensiones `mysqli` (para la conexión a MySQL) y `gd` (si se utilizan funcionalidades de imagen) estén habilitadas.
-   **Base de Datos:** Un servidor de base de datos MySQL o MariaDB.
-   **Navegador Web:** Un navegador web moderno y actualizado para una experiencia de usuario óptima (Chrome, Firefox, Edge, Safari, etc.).




## 🚀 Instalación y Configuración

Sigue estos pasos para poner en marcha la aplicación `Clinica` en tu entorno de desarrollo o producción:

1.  **Clonar el Repositorio:**
    Comienza clonando el repositorio a tu máquina local utilizando Git:
    ```bash
    git clone https://github.com/alvaromp14/Clinica.git
    cd Clinica
    ```

2.  **Configuración de la Base de Datos:**
    -   Accede a tu gestor de bases de datos (por ejemplo, phpMyAdmin, MySQL Workbench, o la línea de comandos).
    -   Crea una nueva base de datos con el nombre `bd_clinica`.
    -   Importa el archivo `bd_clinica.sql` que se encuentra en la raíz del repositorio. Este script creará todas las tablas necesarias y poblará la base de datos con datos de ejemplo.

3.  **Configuración del Servidor Web:**
    -   Copia todos los archivos del repositorio clonado al directorio raíz de tu servidor web (por ejemplo, `htdocs` en XAMPP/WAMP, o `/var/www/html` en LAMP).
    -   Asegúrate de que tu servidor web (Apache/Nginx) esté configurado para procesar archivos PHP.

4.  **Configuración de la Conexión a la Base de Datos:**
    -   Edita el archivo `php/conexion.php` (o el archivo de conexión a la base de datos correspondiente) para actualizar las credenciales de conexión a tu base de datos MySQL. Deberás modificar las variables `$host`, `$user`, `$password` y `$db` con tus propios valores.

    ```php
    <?php
    $host = "localhost"; // Generalmente 'localhost'
    $user = "tu_usuario_mysql"; // Tu nombre de usuario de MySQL
    $password = "tu_contrasena_mysql"; // Tu contraseña de MySQL
    $db = "bd_clinica"; // Nombre de la base de datos creada

    $con = new mysqli($host, $user, $password, $db);

    if ($con->connect_error) {
        die("Error de conexión: " . $con->connect_error);
    }
    ?>
    ```




## 💡 Uso de la Aplicación

Una vez que la aplicación esté instalada y configurada, puedes acceder a ella a través de tu navegador web. Simplemente navega a la URL donde hayas desplegado la aplicación (por ejemplo, `http://localhost/Clinica` si la instalaste en el directorio raíz de tu servidor local).

### Flujo General de Usuario (Paciente):

1.  **Registro/Inicio de Sesión:** Los nuevos pacientes pueden registrarse para crear una cuenta, mientras que los pacientes existentes pueden iniciar sesión para acceder a sus funcionalidades personalizadas.
2.  **Búsqueda y Selección:** Los pacientes pueden buscar médicos, especialidades o clínicas y ver la disponibilidad de horarios.
3.  **Programación de Citas:** Una vez seleccionado el médico y el horario, los pacientes pueden agendar su cita de forma sencilla.
4.  **Gestión de Citas:** Los pacientes pueden ver sus citas programadas, modificarlas o cancelarlas según sea necesario.

### Flujo de Administrador:

Los administradores pueden acceder a un área restringida para:

-   Gestionar pacientes, médicos, clínicas, especialidades y horarios.
-   Supervisar y gestionar todas las citas programadas.
-   Acceder a un panel de control para una visión general de la actividad de la clínica.

**Credenciales de Acceso (por defecto para Administrador):**

-   **Usuario:** `admin`
-   **Contraseña:** `1234`
`
`
`
`

Estas credenciales se encuentran en la tabla `admins` de la base de datos `bd_clinica.sql`.

