// Obtén el elemento del título del hotel
var hotelTitle = document.querySelector('.hotel-title');

// Agrega un evento de clic al título del hotel
hotelTitle.addEventListener('click', function() {
    // Agrega una clase de animación al título del hotel
    hotelTitle.classList.add('animate__animated', 'animate__bounce');

    // Remueve la clase de animación después de 1 segundo
    setTimeout(function() {
        hotelTitle.classList.remove('animate__animated', 'animate__bounce');
    }, 1000);
});



document.getElementById("genero").selectedIndex = -1;