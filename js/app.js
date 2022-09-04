// console.log("Hola mundo");

//codigo para el modal
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

// const progressBar = document.getElementById("bar");
// const loadingMsg = document.getElementById("loading");
// let barWidth = 0;

// const animate = () => {
//     barWidth++;
//     progressBar.style.width = `${barWidth}%`;
//     setTimeout(() => {
//         loadingMsg.innerHTML = `${barWidth}% Completed`;
//     }, 10100);
// };

// // animation starts 2 seconds after page load
// setTimeout(() => {
//     let intervalID = setInterval(() => {
//         if (barWidth === 100) {
//             clearInterval(intervalID);
//         } else {
//             animate();
//         }
//     }, 100); //this sets the speed of the animation
// }, 2000);

//funcion para traer todas las categorias de la api de opentdb https://opentdb.com/api_config.php

// funcion para consultar api https://opentdb.com/api_config.php

let category = document.getElementById("category");
console.log(category);

const getData = async(amount, category, difficulty, type) => {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    const data = await fetch(url);
    const dataJSON = await data.json();
    let myQuestions = dataJSON.results;
    return myQuestions;
};

getData(10, 10, "medium", "multiple")
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("finally");
    });

// funcion para crear el quiz donde pueda sellecionar categoria, dificultad y tipo de pregunta, desde el modal

//funcion para crear el modal con el resultado del quiz
const createModal = (myScore, myQuestions) => {
    const modalContainer = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");
    const modalButton = document.getElementById("modal-button");
    const myScorePercent = (myScore / myQuestions.length) * 100;
    if (myScorePercent >= 80) {
        modalTitle.innerHTML = "Congratulations!";
        modalText.innerHTML = "You got " + myScorePercent + "% correct";
        modalButton.innerHTML = "Play Again";
    } else {
        modalTitle.innerHTML = "Sorry!";
        modalText.innerHTML = "You got " + myScorePercent + "% correct";
        modalButton.innerHTML = "Try Again";
    }
    modalContainer.classList.add("modal--show");
};