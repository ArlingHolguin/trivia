console.log("Hola mundo");
const openModal = document.querySelector(".hero__cta");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal__close");

openModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("modal--show");
});

closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("modal--show");
});

//crea una funcion para crear  barra de progreso con setimeout que en un tiempo de 20 segundos se complete la barra de progreso.

// function crearBarraProgreso() {
//     const barraProgreso = document.querySelector(".barra-progreso");
//     const barraProgresoWidth = barraProgreso.offsetWidth;
//     const barraProgresoTotal = barraProgresoWidth - 10;
//     const barraProgresoInterval = setInterval(() => {
//         const barraProgresoActual = barraProgreso.offsetWidth;
//         const barraProgresoNuevo = barraProgresoActual + 10;
//         barraProgreso.style.width = barraProgresoNuevo + "px";
//         if (barraProgresoNuevo === barraProgresoTotal) {
//             clearInterval(barraProgresoInterval);
//         }
//     }, 20);
// }
// crearBarraProgreso();

const progressBar = document.getElementById("bar");
const loadingMsg = document.getElementById("loading");
let barWidth = 0;

const animate = () => {
    barWidth++;
    progressBar.style.width = `${barWidth}%`;
    setTimeout(() => {
        loadingMsg.innerHTML = `${barWidth}% Completed`;
    }, 10100);
};

// animation starts 2 seconds after page load
setTimeout(() => {
    let intervalID = setInterval(() => {
        if (barWidth === 100) {
            clearInterval(intervalID);
        } else {
            animate();
        }
    }, 100); //this sets the speed of the animation
}, 2000);