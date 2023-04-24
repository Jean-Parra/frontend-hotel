document.addEventListener('DOMContentLoaded', function() {
    obtenerHabitaciones();
});

function obtenerHabitaciones() {
    fetch('http://192.168.117.145/api/habitaciones/obtenerTodas', {
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
            const tbody = document.getElementById('habitaciones-tbody');
            tbody.innerHTML = '';
            data.forEach(habitacion => {
                const tr = document.createElement('tr');
                const numeroTd = document.createElement('td');
                numeroTd.textContent = habitacion.numero;
                const tipoTd = document.createElement('td');
                tipoTd.textContent = habitacion.tipo;
                const descripcionTd = document.createElement('td');
                descripcionTd.textContent = habitacion.descripcion;
                const capacidadMinimaTd = document.createElement('td');
                capacidadMinimaTd.textContent = habitacion.capacidad_minima;
                const capacidadMaximaTd = document.createElement('td');
                capacidadMaximaTd.textContent = habitacion.capacidad_maxima;
                const precioPersonaTd = document.createElement('td');
                precioPersonaTd.textContent = habitacion.precio_persona;
                const imagenTd = document.createElement('td');
                console.log(habitacion.imagen);
                var arrayBufferView = new Uint8Array(habitacion.imagen.data.data);
                var blob = new Blob([arrayBufferView], { type: "image/png" });
                var imgSource = URL.createObjectURL(blob);
                const imagen = document.createElement('img');
                imagen.src = imgSource;
                imagen.classList.add("imagenes");
                console.log(imagen);
                imagenTd.appendChild(imagen);
                console.log(habitacion.imagen.type);
                console.log(habitacion.imagen.data.data);
                tr.appendChild(numeroTd);
                tr.appendChild(tipoTd);
                tr.appendChild(descripcionTd);
                tr.appendChild(capacidadMinimaTd);
                tr.appendChild(capacidadMaximaTd);
                tr.appendChild(precioPersonaTd);
                tr.appendChild(imagenTd);
                tbody.appendChild(tr);

            });
        })
        .catch(error => console.error(error));
}