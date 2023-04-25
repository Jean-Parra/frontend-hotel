document.addEventListener('DOMContentLoaded', function() {
    obtenerHabitaciones();
});

function obtenerHabitaciones() {
    fetch('http://207.248.81.66/api/habitaciones/obtenerTodas', {
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
            const slider = document.getElementById('slider');
            slider.innerHTML = '';
            data.forEach(habitacion => {
                var arrayBufferView = new Uint8Array(habitacion.imagen.data.data);
                var blob = new Blob([arrayBufferView], { type: "image/png" });
                var imgSource = URL.createObjectURL(blob);
                const sliderSection = document.createElement('div');
                sliderSection.classList.add('slider__section');
                const imagen = document.createElement('img');
                imagen.src = imgSource;
                imagen.alt = habitacion.descripcion;
                imagen.classList.add('slider__img');
                sliderSection.appendChild(imagen);
                slider.appendChild(sliderSection);
            });
        })
        .catch(error => {
            console.error('Error en la obtención de habitaciones:', error);
        });
}


const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider__section");
let sliderSectionLast = sliderSection[sliderSection.length - 1];

const btnLeft = document.querySelector("#btn--left");
const btnRight = document.querySelector("#btn--right");

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function Next() {
    let sliderSectionFirst = document.querySelectorAll(".slider__section")[0];
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 0.5s";
    setTimeout(function() {
        slider.style.transition = "none";
        slider.insertAdjacentElement("beforeend", sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    }, 500);
}

function Prev() {
    let sliderSection = document.querySelectorAll(".slider__section");
    let sliderSectionLast = sliderSection[sliderSection.length - 1];
    slider.style.marginLeft = "0";
    slider.style.transition = "all 0.5s";
    setTimeout(function() {
        slider.style.transition = "none";
        slider.insertAdjacentElement("afterbegin", sliderSectionLast);
        slider.style.marginLeft = "-100%";
    }, 500);
}


setInterval(function() {
    Next();
}, 5000);