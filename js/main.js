//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                                                                /////
/////                                                                                                                                /////
/////                                                  ELEMENTOS Y FUNCIONES                                                         /////
/////                                                                                                                                /////
/////                                                                                                                                /////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Elementos del DOM
let logo = document.getElementById('logo');
let title = document.getElementById('title');
let main = document.getElementById('main');



// Función limpiarContenido
function limpiarContenido() {
    // Limpiar el contenido del main
    main.textContent = "";
    // Eliminar todos los elementos hijos del main
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

// Función para generar el HTML de "Privacidad" y "Accesibilidad"
function generarHTMLSeccion(content) {
    let html = `<h2>${content.title}</h2>`;
    content.paragraphs.forEach(paragraph => {
        html += `<p>${paragraph}</p>`;
    });
    content.subsections.forEach(subsection => {
        html += `<h3>${subsection.title}</h3>`;
        if (subsection.items) {
            html += `<ul>`;
            subsection.items.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += `</ul>`;
        }
        if (subsection.paragraphs) {
            subsection.paragraphs.forEach(paragraph => {
                html += `<p>${paragraph}</p>`;
            });
        }
    });
    return html;
}

// Ejecutar la función inicio al cargar la página
window.addEventListener('load', function(){
    obtenerClinicas();
    console.log("Página cargada");
});

// Recargar la página al hacer clic en el logo
logo.addEventListener('click', function() {
    location.reload();
    console.log("Página cargada");
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                                                                /////
/////                                                                                                                                /////
/////                                                    INFORMACIÓN GENERAL                                                         /////
/////                                                                                                                                /////
/////                                                                                                                                /////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Objeto inicio
let dataInicio = {
    informacion: {
        titulo: "Salud Integral",
        descripcion: "En Clínica Albacete Salud Integral, nos enorgullece ser el referente líder en atención médica de calidad en Albacete y sus alrededores.<br>Desde nuestra fundación, nos hemos comprometido a proporcionar una gama completa de servicios de salud integral que aborden las necesidades médicas de nuestros pacientes con profesionalismo, empatía y excelencia.",
        ofrecemos: [
            "Equipo Médico Especializado",
            "Tecnología Avanzada",
            "Enfoque Integral",
            "Atención Personalizada"
        ]
    },
    servicios: [
        "Consultas Médicas Generales",
        "Especialidades Médicas Variadas",
        "Diagnóstico por Imagen",
        "Laboratorio Clínico",
        "Fisioterapia y Rehabilitación",
        "Servicios de Bienestar y Salud Mental"
    ],
    contacto: {
        telefono: "123456789",
        email: "info@saludintegral.com",
    },
    clinicas: [], // Inicialmente, el array de clínicas está vacío
    citas: {
        informacion: "Consulte o cancele sus citas en cualquier momento",
        boton: "Ver más"
    }
};

// Función para generar la sección de información de salud integral
function generarInformacion() {
    let info = `
        <h2>${dataInicio.informacion.titulo}</h2>
        <p>${dataInicio.informacion.descripcion}</p>
        <br>
        <h2>Qué ofrecemos</h2>
    `;
    dataInicio.informacion.ofrecemos.forEach(oferta => {
        info += `<p><b>${oferta}</b></p>`;
    });
    return info;
}

// Función para generar la lista de servicios
function generarServicios() {
    let servicios = `<br><h2>Nuestros servicios</h2>`;
    dataInicio.servicios.forEach(servicio => {
        servicios += `<p><b>${servicio}</b></p>`;
    });
    return servicios;
}

// Función para generar la información de contacto
function generarContacto() {
    let contacto = `<br>
        <h2>Información de contacto</h2>
        <p><b>Teléfono Principal: </b>${dataInicio.contacto.telefono}</p>
        <p><b>Email: </b><a href="mailto:${dataInicio.contacto.email}">${dataInicio.contacto.email}</a></p>
        <br><br>
    `;
    return contacto;
}

// Función para generar la lista de clínicas
function generarClinicas() {
    let clinicas = `<h2>Visita una de nuestras clínicas</h2>`;
    dataInicio.clinicas.forEach(clinica => {
        clinicas += `
            <div class="section">
            <br>
                <h2>${clinica.nombre}</h2>  
                <img src="${clinica.foto}" alt="${clinica.nombre}" class="imagen">
                <br>
                <p><b>Teléfono: </b>${clinica.telefono}</p>
                <p><b>Dirección: </b>${clinica.ubicacion}</p>
                <button type="button" id="InfoClinica" data-clinica="${clinica.id_clinica}" class="btn">Más información</button>
            </div>
        `;
        console.log(clinica.id_clinica);
    });
    return clinicas;
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                                                                /////
/////                                                                                                                                /////
/////                                                           CONSULTA                                                             /////
/////                                                                                                                                /////
/////                                                                                                                                /////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Función para obtener las clínicas de la base de datos
function obtenerClinicas() {
    fetch('php/get_clinicas.php',{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        // Insertar las clínicas obtenidas en el objeto dataInicio.clinicas
        dataInicio.clinicas = data;
        // Generar dinámicamente la información de la página de inicio
        main.innerHTML = `
            ${generarInformacion()}
            ${generarServicios()}
            ${generarContacto()}
            ${generarClinicas()}
            <br><br><br><br>
            <h2>${dataInicio.citas.informacion}</h2>
            <br>
            <button type="button" id="anularCita" class="btn">${dataInicio.citas.boton}</button>
        `;

        // Evento de clic en una clínica
        document.querySelectorAll('#InfoClinica').forEach(clinica => {
            clinica.addEventListener('click', function() {
                let idClinica = this.dataset.clinica;
                generarEspecialidades(idClinica);

                console.log("Btn 'Más información' pulsado");
                console.log(idClinica);
            });
        });

        // Evento de clic en el botón "anularCita" 
        document.getElementById('anularCita').addEventListener('click', function(){
            console.log("Btn 'anularCita' pulsado");

            mostrarFormularioConsultaCita();
        });
    })
    .catch(error => console.error('Error al obtener las clínicas:', error));
}

// Función para generar la lista de especialidades de una clínica
function generarEspecialidades(idClinica) {
    fetch('php/get_especialidades.php', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idClinica: idClinica })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        limpiarContenido();
        let especialidades = `
        <h2>Selecciona una especialidad</h2>
        `;
        data.forEach(especialidad => {
            especialidades += `
            <h3 id="especialidad" data-especialidad="${especialidad.id_especialidad}">${especialidad.descripcion}</h3>
            `;
        });
        especialidades += `
        <button type="button" class="btn" id="volverInicio">Volver al inicio</button>
        `;
        main.innerHTML = especialidades;

        // Agregar evento de clic a cada especialidad
        document.querySelectorAll('#especialidad').forEach(especialidad => {
            especialidad.addEventListener('click', function() {
                let idEspecialidad = this.dataset.especialidad;
                console.log(idEspecialidad);
                generarCuadroMedico(idClinica, idEspecialidad);
            });
        });
    })
    .catch(error => console.error('Error al obtener las especialidades:', error));
}

// Función para generar el cuadro médico de una especialidad en una clínica
function generarCuadroMedico(idClinica, idEspecialidad) {
    fetch('php/get_cuadro_medico.php', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idClinica: idClinica, idEspecialidad: idEspecialidad })
    })
    .then(response => response.json())
    .then(data => {
        limpiarContenido();
        let cuadroMedico = `<h2>Cuadro Médico</h2><br>`;
        if (data.length > 0) {
            data.forEach(medico => {
                cuadroMedico += `
                    <div class="medico">
                        <img src="${medico.foto}" alt="${medico.nombre}">
                        <h3>${medico.nombre}</h3>
                        <button id="reservarCita" class="btn" data-medico="${medico.id_medico}">Reservar cita</button>
                        <br><br>
                    </div>
                `;
            });
        } else {
            cuadroMedico += `<p>No se encontraron médicos para esta especialidad en la clínica seleccionada.</p>`;
        }
        main.innerHTML = cuadroMedico;

        // Agregar evento de clic a cada médico
        document.querySelectorAll('#reservarCita').forEach(medico => {
            medico.addEventListener('click', function() {
                let idMedico = this.dataset.medico;
                mostrarInformacionMedico(idMedico);
            });
        });
    })
    .catch(error => console.error('Error al obtener el cuadro médico:', error));
}

// Función para mostrar la información detallada de un médico y sus citas disponibles
function mostrarInformacionMedico(idMedico) {
    fetch('php/get_medico.php', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_medico: idMedico })
    })
    .then(response => response.json())
    .then(data => {
        limpiarContenido();
        let medico = data.medico;
        let citas = data.citas;
        let infoMedico = `
            <h2>${medico.nombre}</h2>
            <img src="${medico.foto}" alt="${medico.nombre}">
            <p>Especialidad: ${medico.especialidad}</p>
            <h3>Citas Disponibles</h3>
        `;
        
        if (citas.length > 0) {
            citas.forEach(cita => {
                infoMedico += `
                    <div class="cita">
                        <p>Fecha: ${cita.fecha}</p>
                        <p>Hora: ${cita.hora}</p>
                        <button class="btn" onclick="abrirFormularioReserva(${idMedico}, ${cita.id})">Reservar cita</button>
                    </div>
                    <br>
                `;
            });
        } else {
            infoMedico += `<p>No hay citas disponibles.</p>`;
        }

        document.getElementById('main').innerHTML = infoMedico;
    })
    .catch(error => console.error('Error al obtener la información del médico:', error));
}

// Función para abrir el formulario de reserva
function abrirFormularioReserva(idMedico, idCita) {
    let formularioReserva = `
        <h2>Reservar cita</h2>
        <form id="form-reserva" onsubmit="reservarCita(event, ${idMedico}, ${idCita})">
            <label for="n_afiliacion">Número de afiliación:</label>
            <input type="text" id="n_afiliacion" name="n_afiliacion" required>
            <br>
            <label for="email">Correo electrónico:</label>
            <input type="email" id="email" name="email" required>
            <br><br>
            <button type="submit" class="btn">Reservar cita</button>
        </form>
    `;
    document.getElementById('main').innerHTML = formularioReserva;
}

// Función para reservar la cita
function reservarCita(event, idMedico, idCita) {
    event.preventDefault();

    let n_afiliacion = document.getElementById('n_afiliacion').value;
    let email = document.getElementById('email').value;

    fetch('php/reservar_cita.php', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idCita: idCita, n_afiliacion: n_afiliacion, email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cita reservada con éxito.');
            // Redirigir o actualizar la vista si es necesario
        } else {
            alert('Error al reservar la cita: ' + data.error);
        }
    })
    .catch(error => console.error('Error al reservar la cita:', error));
}

// Función para mostrar el formulario de consulta de citas
function mostrarFormularioConsultaCita() {
    limpiarContenido();
    let formulario = `
        <h2>Consultar o Anular Cita</h2>
        <form id="formAnularCita">
            <label for="n_afiliacion">Número de Afiliación:</label>
            <input type="text" id="n_afiliacion" name="n_afiliacion" required>
            <br><br>
            <button type="submit" class="btn">Consultar Citas</button>
        </form>
    `;
    main.innerHTML = formulario;

    // Agregar evento de submit al formulario
    document.getElementById('formAnularCita').addEventListener('submit', function(event) {
        event.preventDefault();
        let n_afiliacion = document.getElementById('n_afiliacion').value;
        consultarCitas(n_afiliacion);
    });
}

// Función para consultar las citas asociadas a un número de afiliación
function consultarCitas(n_afiliacion) {
    fetch('php/consultar_citas.php', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ n_afiliacion: n_afiliacion })
    })
    .then(response => response.json())
    .then(data => {
        limpiarContenido();
        let citasHtml = `
            <h2>Citas Asociadas al Número de Afiliación ${n_afiliacion}</h2>
            <br><br>`;
        if (data.length > 0) {
            data.forEach(cita => {
                citasHtml += `
                    <div>
                        <b>Fecha: ${cita.fecha} - Hora: ${cita.hora}</b>&nbsp;&nbsp;&nbsp;
                        <button type="button" class="btnCancelar" data-id-cita="${cita.id}">Cancelar Cita</button>
                        <br><br>
                    </div>
                `;
            });
            citasHtml += `
                <button type="button" class="btn" id="volverInicio">Volver al inicio</button>
            `;
        } else {
            citasHtml += `
                <p>No se encontraron citas asociadas a este número de afiliación.</p>
                <br><br>
                <button type="button" class="btn" id="volverInicio">Volver al inicio</button>
            `;
        }
        main.innerHTML = citasHtml;

        // Recargar la página al hacer clic en el botón "volverInicio"
        volverInicio.addEventListener('click', function() {
            location.reload();
            console.log("Página cargada");
        });

        // Agregar evento de clic a los botones de cancelar cita
        document.querySelectorAll('.btnCancelar').forEach(btn => {
            btn.addEventListener('click', function() {
                let idCita = this.dataset.idCita;
                cancelarCita(idCita);
            });
        });
    })
    .catch(error => console.error('Error al consultar las citas:', error));
}

// Función para cancelar una cita
function cancelarCita(idCita) {
    fetch('php/cancelar_cita.php', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idCita: idCita })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cita cancelada con éxito');
            // Volver a consultar las citas después de cancelar una
            let n_afiliacion = document.querySelector('#n_afiliacion').value;
            consultarCitas(n_afiliacion);
        } else {
            alert('Error al cancelar la cita');
            consultarCitas(n_afiliacion);
        }
    })
    .catch(error => console.error('Error al cancelar la cita:', error));
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                                                                /////
/////                                                                                                                                /////
/////                                                            ADMIN                                                               /////
/////                                                                                                                                /////
/////                                                                                                                                /////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Evento de clic en el enlace de "Zona de Administración"
document.getElementById('admin').addEventListener('click', mostrarAdminLogin);

// Función para mostrar el login de los administradores
function mostrarAdminLogin() {
    limpiarContenido();
    let loginAdminForm = `
        <h2>Acceso de Administrador</h2>
        <form id="adminLoginForm">
            <label for="user">Nombre de usuario:</label>
            <input type="text" id="user" name="user" required>
            <br>
            <label for="pass">Contraseña:</label>
            <input type="password" id="pass" name="pass" required>
            <br><br>
            <button type="submit" class="btn">Iniciar sesión</button>
        </form>
    `;
    main.innerHTML = loginAdminForm;

    // Agregar evento de envío del formulario
    document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada
        // Obtener los datos del formulario
        let formData = new FormData(this);
        // Enviar los datos al servidor para autenticación
        fetch('php/auth_admin.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Si la autenticación es exitosa, cargar el panel de administrador
                adminPanel();
            } else {
                // Si la autenticación falla, mostrar un mensaje de error
                alert('Credenciales incorrectas');
            }
        })
        .catch(error => console.error('Error al autenticar:', error));
    });
}

// Función para mostrar el panel del admin
function adminPanel() {
    limpiarContenido();
    let menuAdmin = `
        <h1>Panel de Administración</h1>
        <br><br>
        <div class="section">
            <h2>Habilitar agenda mensual</h2>
            <img src="img/adminPanel/agenda.png" alt="Habilitar agenda mensual">
            <br>
            <button type="button" id="habilitarAgenda" class="btn">Habilitar agenda mensual</button>
        <br><br><br><br>
        </div>
        <div class="section">
            <h2>Quitar días de consulta</h2>
            <img src="img/adminPanel/quitar.png" alt="Quitar días de consulta">
            <br>
            <button type="button" id="quitarConsultas" class="btn">Quitar días de consulta</button>
        <br><br><br><br>
        </div>
        <div class="section">
            <h2>Listado de citas</h2>
            <img src="img/adminPanel/listado.png" alt="Listado de citas">
            <br>
            <button type="button" id="listadoCitas" class="btn">Listado de citas</button>
        <br><br><br><br>
        </div>
    `;
    main.innerHTML = menuAdmin;
    
    // Función para mostrar el menú para habilitar la agenda
    function menuAgendaMensual() {
        limpiarContenido();
    }

    // Evento de clic en el botón de "Habilitar agenda mensual"
    document.getElementById('habilitarAgenda').addEventListener('click', menuAgendaMensual);

    // Función para mostrar el menú para quitar días de consulta
    function menuDiasConsulta() {
        limpiarContenido();
    }

    // Evento de clic en el botón de "Quitar días de consulta"
    document.getElementById('quitarConsultas').addEventListener('click', menuDiasConsulta);

    // Función para mostrar el listado de citas reservadas
    function mostrarListadoCitas() {
        limpiarContenido();
    }

    // Evento de clic en el botón de "Listado de citas"
    document.getElementById('listadoCitas').addEventListener('click', obtenerListadoCitas);

    // Función para mostrar el menú de la agenda mensual
    /* Agenda mensual: Insertar en la tabla "horarios" el id_medico (obtener de la bd el listado de médicos),
    dia, hora_inicio, hora_fin y el id_clinica (obtener de la bd el listado de clínicas) en la que pasará consulta */
    function menuAgendaMensual() {
        console.log("menuAgendaMensual");
    
        limpiarContenido();
    
        // Obtener el listado de médicos y clínicas desde el servidor
        fetch('php/get_medicos_y_clinicas.php')
            .then(response => response.json())
            .then(data => {
                let medicosOptions = data.medicos.map(medico => `<option value="${medico.id_medico}">${medico.nombre}</option>`).join('');
                let clinicasOptions = data.clinicas.map(clinica => `<option value="${clinica.id_clinica}">${clinica.nombre}</option>`).join('');
    
                let agendaMensual = `
                    <h2>Agenda Mensual</h2>
                    <form id="agendaMensualForm">
                        <label for="medico">Médico:</label>
                        <select id="medico" name="medico" required>
                            ${medicosOptions}
                        </select>
                        <br><br>
                        <label for="clinica">Clínica:</label>
                        <select id="clinica" name="clinica" required>
                            ${clinicasOptions}
                        </select>
                        <br>
                        <label for="dia">Día:</label>
                        <input type="date" id="dia" name="dia" required>
                        <br>
                        <label for="hora_inicio">Hora de inicio:</label>
                        <input type="time" id="hora_inicio" name="hora_inicio" required>
                        <br>
                        <label for="hora_fin">Hora de fin:</label>
                        <input type="time" id="hora_fin" name="hora_fin" required>
                        <br><br>
                        <button type="submit" class="btn">Agregar</button>
                    </form>
                    <button type="button" id="menuAdmin" class="btn">Volver al menú</button>
                `;
                main.innerHTML = agendaMensual;
    
                // Agregar evento de envío del formulario
                document.getElementById('agendaMensualForm').addEventListener('submit', function(event) {
                    event.preventDefault();
                    let formData = new FormData(this);
                    fetch('php/insertar_horario.php', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert('Horario agregado exitosamente');
                            menuAgendaMensual();
                        } else {
                            alert('Error al agregar horario');
                        }
                    })
                    .catch(error => console.error('Error:', error));
                });
    
                // Agregar evento de clic al botón "Volver al menú"
                document.getElementById('menuAdmin').addEventListener('click', adminPanel);
            })
            .catch(error => console.error('Error al obtener médicos y clínicas:', error));
    }
    
    
    // Función para mostrar el menú de los días de consulta
    /* Días de consulta: Mostrar todos los días de consulta de un médico (obtener de la tabla "horarios") 
    y al lado de cada uno poner un botón para eliminar el registro del día que se muestra al lado del botón */
    function menuDiasConsulta() {
        console.log("menuDiasConsulta");
    
        limpiarContenido();
    
        // Obtener el listado de médicos desde el servidor
        fetch('php/get_medicos.php')
            .then(response => response.json())
            .then(medicos => {
                let medicosOptions = medicos.map(medico => `<option value="${medico.id_medico}">${medico.nombre}</option>`).join('');
    
                let quitarDiasConsulta = `
                    <h2>Quitar Días de Consulta</h2>
                    <br><br>
                    <label for="medico">Selecciona un médico:</label>
                    <select id="medico" name="medico" required>
                        <option value="">Selecciona un médico</option>
                        ${medicosOptions}
                    </select>
                    <br><br>
                    <div id="diasConsultaContainer"></div>
                    <button type="button" id="menuAdmin" class="btn">Volver al menú</button>
                `;
                main.innerHTML = quitarDiasConsulta;
    
                // Agregar evento de cambio al selector de médicos
                document.getElementById('medico').addEventListener('change', function() {
                    let idMedico = this.value;
                    if (idMedico) {
                        fetch('php/get_dias_consulta.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: `id_medico=${idMedico}`
                        })
                        .then(response => response.json())
                        .then(diasConsulta => {
                            let diasConsultaContainer = document.getElementById('diasConsultaContainer');
                            if (diasConsulta.length > 0) {
                                let diasConsultaHTML = diasConsulta.map(dia => `
                                    <div>
                                        <span>${dia.dias} - ${dia.hora_inicio} a ${dia.hora_fin}</span>
                                        <button type="button" class="btn eliminarDia" data-id="${dia.id}">Eliminar</button>
                                        <br>
                                    </div>
                                    <br>
                                `).join('');
                                diasConsultaContainer.innerHTML = diasConsultaHTML;
    
                                // Agregar eventos de clic a los botones de eliminar
                                document.querySelectorAll('.eliminarDia').forEach(button => {
                                    button.addEventListener('click', function() {
                                        let id = this.dataset.id;
                                        fetch('php/delete_dia_consulta.php', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded'
                                            },
                                            body: `id=${id}`
                                        })
                                        .then(response => response.json())
                                        .then(data => {
                                            if (data.success) {
                                                alert('Día de consulta eliminado exitosamente');
                                                menuDiasConsulta();
                                            } else {
                                                alert('Error al eliminar el día de consulta');
                                            }
                                        })
                                        .catch(error => console.error('Error:', error));
                                    });
                                });
                            } else {
                                diasConsultaContainer.innerHTML = '<p>No hay días de consulta para este médico.</p>';
                            }
                        })
                        .catch(error => console.error('Error al obtener días de consulta:', error));
                    } else {
                        document.getElementById('diasConsultaContainer').innerHTML = '';
                    }
                });
    
                // Agregar evento de clic al botón "Volver al menú"
                document.getElementById('menuAdmin').addEventListener('click', adminPanel);
            })
            .catch(error => console.error('Error al obtener médicos:', error));
    }
    
    
    function obtenerListadoCitas() {
        console.log("obtenerListadoCitas");

        limpiarContenido();
    
        // Obtener el listado de médicos desde el servidor
        fetch('php/get_medicos.php')
            .then(response => response.json())
            .then(medicos => {
                let medicosOptions = medicos.map(medico => `<option value="${medico.id_medico}">${medico.nombre}</option>`).join('');
    
                let listadoCitas = `
                    <h2>Listado de Citas</h2>
                    <br><br>
                    <label for="medico">Selecciona un médico:</label>
                    <select id="medico" name="medico" required>
                        <option value="">Selecciona un médico</option>
                        ${medicosOptions}
                    </select>
                    <br><br>
                    <div id="citasContainer"></div>
                    <button type="button" id="menuAdmin" class="btn">Volver al menú</button>
                `;
                main.innerHTML = listadoCitas;
    
                // Agregar evento de cambio al selector de médicos
                document.getElementById('medico').addEventListener('change', function() {
                    let idMedico = this.value;
                    if (idMedico) {
                        // Realizar solicitud al servidor para obtener las citas del médico seleccionado
                        fetch('php/get_citas_medico.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: `id_medico=${idMedico}`
                        })
                        .then(response => response.json())
                        .then(citas => {
                            console.log('Citas recibidas:', citas);  // Depuración adicional
    
                            // Mostrar las citas en el contenedor
                            let citasContainer = document.getElementById('citasContainer');
                            if (citas.length > 0) {
                                let citasHTML = citas.map(cita => `
                                    <div>
                                        <p>Fecha: ${cita.fecha}</p>
                                        <p>Hora: ${cita.hora}</p>
                                        <p>Nº de afiliación del paciente: ${cita.n_afiliacion}</p>
                                    </div>
                                    <br>
                                `).join('');
                                citasContainer.innerHTML = citasHTML;
                            } else {
                                citasContainer.innerHTML = '<p>No hay citas para este médico.</p>';
                            }
                        })
                        .catch(error => console.error('Error al obtener citas:', error));
                    } else {
                        document.getElementById('citasContainer').innerHTML = '';
                    }
                });
    
                // Agregar evento de clic al botón "Volver al menú"
                document.getElementById('menuAdmin').addEventListener('click', adminPanel);
            })
            .catch(error => console.error('Error al obtener médicos:', error));
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                                                                /////
/////                                                                                                                                /////
/////                                                          PRIVACIDAD                                                            /////
/////                                                                                                                                /////
/////                                                                                                                                /////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Objeto Privacidad
let dataPrivacidad = {
    title: "Política de Privacidad",
    paragraphs: [
        "Queremos asegurarnos de que estés completamente informado sobre cómo manejamos la privacidad de tus datos al utilizar nuestros servicios. Lee detenidamente nuestra política de privacidad para comprender cómo recopilamos, usamos, compartimos y protegemos la información que nos proporcionas."
    ],
    subsections: [
        {
            title: "1. Información que Recopilamos:",
            paragraphs: [
                "Recopilamos datos para brindarte una experiencia más personalizada. Esto puede incluir información personal así como otros datos proporcionados voluntariamente."
            ]
        },
        {
            title: "2. Uso de la Información:",
            paragraphs: [
                "Utilizamos la información recopilada para mejorar la calidad de nuestras página, personalizar el contenido según tus preferencias, y analizar tendencias y patrones de uso. Tu información personal no se venderá, alquilará ni compartirá con terceros sin tu consentimiento explícito."
            ]
        },
        {
            title: "3. Consentimiento:",
            paragraphs: [
                "Aceptas voluntariamente proporcionar la información solicitada. Tienes el derecho de retirar tu consentimiento en cualquier momento, lo que resultará en la eliminación de tu información de nuestras bases de datos."
            ]
        },
        {
            title: "4. Seguridad:",
            paragraphs: [
                "Implementamos medidas de seguridad avanzadas para proteger tu información contra el acceso no autorizado, la divulgación, la alteración y la destrucción. Nos esforzamos por garantizar la confidencialidad y la integridad de tus datos."
            ]
        },
        {
            title: "5. Cookies y Tecnologías Similares:",
            paragraphs: [
                "Podemos utilizar cookies y tecnologías similares para mejorar la experiencia del usuario y recopilar información. Puedes ajustar la configuración de tu navegador para controlar el uso de cookies, pero ten en cuenta que algunas funciones del sitio pueden no estar disponibles si las desactivas."
            ]
        },
        {
            title: "6. Enlaces a Terceros:",
            paragraphs: [
                "Nuestra página web puede contener enlaces a sitios de terceros. No tenemos control sobre sus políticas de privacidad y no nos hacemos responsables de sus prácticas. Te recomendamos revisar las políticas de privacidad de esos sitios antes de proporcionar cualquier información."
            ]
        },
        {
            title: "7. Cambios en la Política de Privacidad:",
            paragraphs: [
                "Nos reservamos el derecho de actualizar nuestra política de privacidad en cualquier momento. Los cambios serán comunicados a través de la página web, por lo que te recomendamos revisar periódicamente esta sección para estar al tanto de las actualizaciones."
            ]
        },
        {
            title: "",
            paragraphs: [
                "Al utilizar nuestros servicios, aceptas los términos de esta política de privacidad. Si tienes preguntas o inquietudes, no dudes en ponerte en contacto con nosotros a través de nuestro <a href=\"mailto:info@saludintegral.com\">correo de contacto</a>."
            ]
        }
    ]
};

// Función para mostrar la página de "Privacidad"
function showPrivacidad() {
    limpiarContenido();
    let htmlPrivacidad = generarHTMLSeccion(dataPrivacidad);
    document.getElementById('main').innerHTML = htmlPrivacidad;
}

// Evento de clic en el enlace de "Privacidad"
document.getElementById('privacidad').addEventListener('click', showPrivacidad);

/*
let privacidad = document.getElementById('privacidad');
privacidad.addEventListener('click', showPrivacidad);
*/



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                                                                /////
/////                                                                                                                                /////
/////                                                       ACCESIBILIDAD                                                            /////
/////                                                                                                                                /////
/////                                                                                                                                /////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Objeto Accesibilidad
let dataAccesibilidad = {
    title: "Ajustes de Accesibilidad: En Desarrollo",
    paragraphs: [
        "Estamos comprometidos con la inclusión y la accesibilidad para todos nuestros usuarios. Actualmente, estamos trabajando arduamente para implementar ajustes de accesibilidad que mejoren la experiencia de navegación para personas con diversas necesidades y capacidades.",
        "Lamentamos informar que los ajustes de accesibilidad aún no están disponibles, pero queremos asegurarte que es una de nuestras prioridades. Estamos en el proceso de desarrollar y probar características que permitan a todos los usuarios acceder y disfrutar plenamente de nuestro contenido.",
    ],
    subsections: [
        {
            title: "Próximos Ajustes de Accesibilidad:",
            items: [
                "Contraste de Colores: Proporcionaremos opciones de contraste para mejorar la legibilidad del texto y facilitar la visualización.",
                "Navegación Simplificada: Implementaremos un menú de navegación simplificado para facilitar el acceso a todas las secciones de la página.",
                "Compatibilidad con Lectores de Pantalla: Aseguraremos que nuestra página sea compatible con lectores de pantalla para usuarios con discapacidades visuales.",
                "Tamaño de Texto Ajustable: Permitiremos a los usuarios ajustar el tamaño del texto según sus preferencias personales."
            ]
        },
        {
            title: "Mientras tanto:",
            paragraphs: [
                "Agradecemos tu paciencia y comprensión mientras trabajamos en la implementación de estos cambios. Si tienes necesidades específicas de accesibilidad o sugerencias, no dudes en ponerte en contacto con nosotros a través de nuestro <a href=\"mailto:info@saludintegral.com\">correo de contacto</a>. Tu retroalimentación es valiosa y nos ayuda a mejorar continuamente.",
                "Estamos comprometidos a proporcionar una experiencia en línea accesible para todos, y trabajamos diligentemente para lograr este objetivo."
            ]
        }
    ]
};

// Función para mostrar la página de "Accesibilidad"
function showAccesibilidad() {
    limpiarContenido();
    let htmlAccesibilidad = generarHTMLSeccion(dataAccesibilidad);
    document.getElementById('main').innerHTML = htmlAccesibilidad;
}

// Evento de clic en el enlace de "Accesibilidad"
document.getElementById('accesibilidad').addEventListener('click', showAccesibilidad);

/*
let accesibilidad = document.getElementById('accesibilidad');
privacidad.addEventListener('click', showAccesibilidad);
*/