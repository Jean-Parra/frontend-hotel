let paginaActual = 1;
const limit = 5;
var textoBusqueda = '';

document.addEventListener('DOMContentLoaded', function() {
    obtenerUsuarios();
});

function obtenerUsuarios() {
    const textoBusquedaCodificado = encodeURIComponent(textoBusqueda); // Codificar el valor de búsqueda
    fetch(`http://207.248.81.66:80/api/usuarios/registrados?page=${paginaActual}&limit=${limit}&q=${textoBusquedaCodificado}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la obtención de usuarios registrados');
            }
        })
        .then(data => {
            console.log(data);


            const tablaRegistradasBody = document.getElementById('tablaRegistradasBody');
            tablaRegistradasBody.innerHTML = '';
            data.usuarios.forEach(usuario => {
                const fila = document.createElement('tr');
                const celdaNombre = document.createElement('td');
                const celdaApellidos = document.createElement('td');
                const celdaCorreo = document.createElement('td');
                const celdaCedula = document.createElement('td');
                const celdaEdad = document.createElement('td');
                const celdaGenero = document.createElement('td');
                const celdaBorrar = document.createElement('td');
                celdaNombre.textContent = usuario.nombres;
                celdaApellidos.textContent = usuario.apellidos;
                celdaCorreo.textContent = usuario.correo;
                celdaCedula.textContent = usuario.cedula;
                celdaEdad.textContent = usuario.edad;
                celdaGenero.textContent = usuario.genero;
                const iconoBorrar = document.createElement('i');
                iconoBorrar.style.color = 'red';
                iconoBorrar.style.cursor = 'pointer';
                iconoBorrar.classList.add('fas', 'fa-trash');
                iconoBorrar.setAttribute('data-id', usuario.ID);
                iconoBorrar.addEventListener('click', function() {
                    const articuloModal = document.getElementsByClassName('eliminarModal')[0];
                    const cerrarModal = document.createElement('i');
                    cerrarModal.classList.add('bi', 'bi-x-circle');
                    cerrarModal.style.color = 'red';
                    cerrarModal.style.cursor = 'pointer';
                    const tituloModal = document.createElement('h1');
                    tituloModal.textContent = "Eliminar usuario";
                    parrafoModal = document.createElement('p');
                    parrafoModal.textContent = `¿Estas seguro que quieres eliminar a \n${usuario.nombres} ${usuario.apellidos}?`;
                    const botonModal = document.createElement('button');
                    botonModal.classList.add('btn', 'btn-eliminar');
                    botonModal.textContent = "Eliminar";

                    // Comprobar si ya hay un modal abierto y eliminarlo
                    const modalAbierto = document.querySelector('.eliminarModal--active');
                    if (modalAbierto) {
                        modalAbierto.innerHTML = '';
                        modalAbierto.classList.remove('eliminarModal--active');
                    }

                    articuloModal.classList.add('eliminarModal', 'eliminarModal--active');
                    articuloModal.appendChild(cerrarModal);
                    articuloModal.appendChild(tituloModal);
                    articuloModal.appendChild(parrafoModal);

                    articuloModal.appendChild(botonModal);

                    botonModal.addEventListener('mouseover', function() {
                        botonModal.style.backgroundColor = 'red';
                        botonModal.style.color = 'white';
                    });
                    botonModal.addEventListener('mouseout', function() {
                        botonModal.style.backgroundColor = '#e7e7e7';
                        botonModal.style.color = 'black';
                    });

                    cerrarModal.addEventListener('mouseover', function() {
                        cerrarModal.classList.remove('bi-x-circle');
                        cerrarModal.classList.add('bi-x-circle-fill');
                    });

                    cerrarModal.addEventListener('mouseout', function() {
                        cerrarModal.classList.remove('bi-x-circle-fill');
                        cerrarModal.classList.add('bi-x-circle');
                    });

                    botonModal.addEventListener('click', function() {
                        articuloModal.innerHTML = '';
                        articuloModal.classList.remove('eliminarModal--active');
                    });


                    cerrarModal.addEventListener('click', function() {
                        articuloModal.innerHTML = '';
                        articuloModal.classList.remove('eliminarModal--active');
                    });
                });
                celdaBorrar.appendChild(iconoBorrar);
                fila.appendChild(celdaNombre);
                fila.appendChild(celdaApellidos);
                fila.appendChild(celdaCorreo);
                fila.appendChild(celdaCedula);
                fila.appendChild(celdaEdad);
                fila.appendChild(celdaGenero);
                fila.appendChild(celdaBorrar);
                tablaRegistradasBody.appendChild(fila);
            });
            const numPagina = document.getElementById('numPagina');
            numPagina.textContent = `Página ${paginaActual}`;
            const anteriorBtn = document.getElementById('anteriorBtn');
            if (paginaActual > 1) {
                anteriorBtn.disabled = false;
            } else {
                anteriorBtn.disabled = true;
            }

            const siguienteBtn = document.getElementById('siguienteBtn');
            if (paginaActual === Math.ceil(data.cantidad / limit)) {
                siguienteBtn.disabled = true;
            } else {
                siguienteBtn.disabled = false;
            }
        })
        .catch(error => {
            console.error(error);
        });
};

function obtenerPaginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        obtenerUsuarios();
    }
}

function obtenerPaginaSiguiente() {
    paginaActual++;
    obtenerUsuarios();
}

function buscarUsuarios() {
    const inputBusqueda = document.getElementById('inputBusqueda');
    textoBusqueda = inputBusqueda.value;
    obtenerUsuarios();
}