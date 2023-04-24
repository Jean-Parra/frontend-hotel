function agregarHabitacion() {
    const numero = document.getElementById('numero').value;
    const tipo = document.getElementById('habitacion').value;
    const descripcion = document.getElementById('descripcion').value;
    const capacidad_minima = document.getElementById('capacidad_minima').value;
    const capacidad_maxima = document.getElementById('capacidad_maxima').value;
    const precio_persona = document.getElementById('precio_persona').value;
    const imagen = document.getElementById('imagen').files[0];

    const formData = new FormData();
    formData.append('numero', numero);
    formData.append('tipo', tipo);
    formData.append('descripcion', descripcion);
    formData.append('capacidad_minima', capacidad_minima);
    formData.append('capacidad_maxima', capacidad_maxima);
    formData.append('precio_persona', precio_persona);
    formData.append('imagen', imagen);
    fetch('http://192.168.117.145/api/habitaciones/agregar', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                alert('Habitación registrada exitosamente');
                window.location.reload();

            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        })
        .catch(error => {
            console.error('Error al agregar habitación:', error);
        });
}