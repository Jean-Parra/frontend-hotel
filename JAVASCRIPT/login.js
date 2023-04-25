const regEx = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$!%*#?&/%])[A-Za-z\d$!%*#?&/%]{8,}$/,
};

const fields = {
    email: false,
    password: false,
};

const inputs = document.querySelectorAll('.form-card__input');
const form = document.getElementById('login-form');
const formGeneralError = document.getElementById('form-error');

inputs.forEach((input) =>
    input.addEventListener('input', (e) => {
        if (regEx[e.target.name].test(e.target.value.trim().replace(/\s\s+/g, ' '))) {
            e.target.parentElement.parentElement.classList.remove('form-card__group--incorrect');
            fields[e.target.name] = true;
        } else {
            e.target.parentElement.parentElement.classList.add('form-card__group--incorrect');
            fields[e.target.name] = false;
        }
    }),
);

newFunction();

function newFunction() {
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
            const login = async() => {
                try {
                    const email = document.getElementById('email').value;
                    const contraseña = document.getElementById('password').value;
                    const response = await fetch('http://207.248.81.66:80/api/usuarios/login', {
                        method: 'POST',
                        body: JSON.stringify({ correo: email, contraseña: contraseña }),
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
                        console.error('Error en el inicio de sesión:', data.message);
                    }
                } catch (err) {
                    console.error('Error en el endpoint de inicio de sesión:', err);
                }
            };
            login();

        }
    });
}