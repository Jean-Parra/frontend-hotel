const regEx = {
    'nombres': /^[a-zA-ZÀ-ÿ\s]{5,40}$/,
    'apellidos': /^[a-zA-ZÀ-ÿ\s]{5,40}$/,
    'correo': /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    'contraseña': /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$!%*#?&/%])[A-Za-z\d$!%*#?&/%]{8,}$/,
    'contraseña-2': /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$!%*#?&/%])[A-Za-z\d$!%*#?&/%]{8,}$/,
    'cedula': /^\d{8,10}$/,
    'edad': /^(1[8-9]|[2-9][0-9]|100)$/,
};

const fields = {
    'nombres': false,
    'apellidos': false,
    'correo': false,
    'contraseña': false,
    'contraseña-2': false,
    'cedula': false,
    'edad': false,
    'genero': false
};


const inputs = document.querySelectorAll('.form-card__input');
const form = document.getElementById('signup-form');
const formGeneralError = document.getElementById('form-error');

const contraseña = document.getElementById('contraseña');
const contraseña2 = document.getElementById('contraseña-2');
const genero = document.getElementById('genero');
const error = document.getElementById('genero-error');
inputs.forEach((input) =>
    input.addEventListener('input', (e) => {
        if (e.target.name === 'contraseña') {
            contraseña2.parentElement.classList.add('form-card__group--incorrect');
            fields['contraseña-2'] = false;
        }

        if (e.target.name !== 'contraseña-2') {
            console.log(e.target.name);
            if (regEx[e.target.name].test(e.target.value.trim().replace(/\s\s+/g, ' '))) {
                e.target.parentElement.classList.remove('form-card__group--incorrect');
                fields[e.target.name] = true;
            } else {
                e.target.parentElement.classList.add('form-card__group--incorrect');
                fields[e.target.name] = false;
            }

        } else {
            if (e.target.value === contraseña.value) {
                e.target.parentElement.classList.remove('form-card__group--incorrect');
                fields[e.target.name] = true;
            } else {
                e.target.parentElement.classList.add('form-card__group--incorrect');
                fields[e.target.name] = false;
            }
        }
    }),
);
document.addEventListener('DOMContentLoaded', () => {
    if (genero.value === '') {
        error.classList.add('form-card__error--visible');
        fields['genero'] = false;
    }
});

document.addEventListener('change', () => {
    if (genero.value !== '') {
        error.classList.remove('form-card__error--visible');
        fields['genero'] = true;
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let flag = true;

    for (key in fields) {
        if (!fields[key]) {
            formGeneralError.classList.add('form-card__error--visible');
            flag = false;
            break;
        } else {
            formGeneralError.classList.remove('form-card__error--visible');
        }
    }


    if (flag) {
        const registro = async() => {
            try {
                const nombres = document.getElementById('nombres').value;
                const apellidos = document.getElementById('apellidos').value;
                const correo = document.getElementById('correo').value;
                const cedula = document.getElementById('cedula').value;
                const edad = document.getElementById('edad').value;
                const genero = document.getElementById('genero').value;
                const contraseña = document.getElementById('contraseña').value;
                const response = await fetch('http://207.248.81.66:80/api/usuarios/register', {
                    method: 'POST',
                    body: JSON.stringify({ nombres: nombres, apellidos: apellidos, correo: correo, cedula: cedula, edad: edad, genero: genero, contraseña: contraseña }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.reload()

                } else {
                    const error = document.getElementById('bad');
                    error.classList.add('bad');
                    error.textContent = data.message;
                    console.error('Error en el registro:', data.message);
                }
            } catch (err) {
                console.error('Error en el endpoint de registro:', err);
            }
        };
        registro();

    }
});