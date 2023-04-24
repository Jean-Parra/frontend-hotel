function cerrarSesion() {
    localStorage.removeItem("token");
    window.location.reload()

    // redirigir a la página de inicio de sesión u otra página
}




function actualizarDataIdValue(id) {
    const dataIdElement = document.getElementById("dataIdValue");
    dataIdElement.textContent = id;
}

document.addEventListener('DOMContentLoaded', function() {
    verificarToken();
});



function verificarToken() {
    fetch('http://192.168.117.145:80/api/usuarios/verificar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response);
            if (response.ok) {
                return response.json();
            } else {
                if (window.location.href != ("http://127.0.0.1:5500/HTML/login.html") && window.location.href != "http://127.0.0.1:5500/HTML/signup.html") {
                    window.location.href = "http://127.0.0.1:5500/HTML/login.html";
                }
                throw new Error('Error en la verificación del token');
            }
        })
        .then(data => {
            const id = data.id;
            actualizarDataIdValue(id);
            fetch(`http://192.168.117.145:80/api/usuarios/permiso/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
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
                    console.log(data);
                    if (window.location.href == ("http://127.0.0.1:5500/HTML/login.html") || window.location.href == "http://127.0.0.1:5500/HTML/signup.html") {
                        if (data.permiso == "usuarios") {
                            window.location.href = "http://127.0.0.1:5500/HTML/user/home.html";
                        } else if (data.permiso == "administrador") {
                            window.location.href = "http://127.0.0.1:5500/HTML/admin/home.html";
                        }
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);
        });
};