function actualizarDataIdValue(id) {
    const dataIdElement = document.getElementById("dataIdValue");
    dataIdElement.textContent = id;
}


document.addEventListener('DOMContentLoaded', function() {
    verificarToken();
});

function verificarToken() {
    fetch('http://10.153.76.80:4000/api/usuarios/verificar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la verificación del token');
            }
        })
        .then(data => {
            const id = data.id;
            actualizarDataIdValue(id);
            window.location.href = 'home.html';
        })
        .catch(error => {
            console.error(error);
        });
};