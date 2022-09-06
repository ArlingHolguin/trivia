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



//CARGAR CATEGORIAS
function cargarCategoria() {
    // let categorias = document.getElementById('categorias');
    const url = "https://opentdb.com/api_category.php";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            data.trivia_categories.forEach((categoria) => {
                html += `<option value="${categoria.id}">${categoria.name}</option>`;
            });
            document.getElementById("categoria").innerHTML = html;
        });
}

// generar url a partir de campos de category type y diffculty
const generateURL = () => {
    const category = document.getElementById("categoria").value;
    const type = document.getElementById("type").value;
    const difficulty = document.getElementById("difficulty").value;
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&type=${type}&difficulty=${difficulty}&encode=url3986`;
    return url;
};



//cargar preguntas y respuestas de la api_config.php
function cargarPreguntas() {
    const url = generateURL();
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            data.results.forEach((pregunta) => {
                html += `<div class="pregunta">
                <h2>${pregunta.question}</h2>
                <ul>
                    <li>${pregunta.correct_answer}</li>
                    <li>${pregunta.incorrect_answers[0]}</li>
                    <li>${pregunta.incorrect_answers[1]}</li>
                    <li>${pregunta.incorrect_answers[2]}</li>
                </ul>
            </div>`;
            });
            document.getElementById("preguntas").innerHTML = html;
        });
}




// console.log(cargarCategoria());

// //CARGAR DIFICULTAD
// function cargarDificultad() {
//     const url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
//     fetch(url)
//         .then((response) => response.json())
//         .then((data) => {
//             let html = "";
//             data.results.forEach((dificultad) => {
//                 html += `<option value="${dificultad.difficulty}">${dificultad.difficulty}</option>`;
//             });
//             document.getElementById("dificultad").innerHTML = html;
//         });
// }

// //CARGAR TIPO
// function cargarTipo() {
//     const url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
//     fetch(url)
//         .then((response) => response.json())
//         .then((data) => {
//             let html = "";
//             data.results.forEach((tipo) => {
//                 html += `<option value="${tipo.type}">${tipo.type}</option>`;
//             });
//             document.getElementById("tipo").innerHTML = html;
//         });
// }







let category = document.getElementById("category").value;
let difficulty = document.getElementById("difficulty").value;
let type = document.getElementById("type").value;
console.log(category);
console.log(difficulty);
console.log(type);

const getData = async(category, difficulty, type) => {
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`;
    const data = await fetch(url);
    const dataJSON = await data.json();
    let myQuestions = dataJSON.results;
    return myQuestions;
};

getData(category, difficulty, type)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("finally");
    });

console.log(getData(category, difficulty, type));

// funcion para crear el quiz donde pueda sellecionar categoria, dificultad y tipo de pregunta, desde el modal

//funcion para crear el modal con el resultado del quiz
// const createModal = (myScore, myQuestions) => {
//     const modalContainer = document.getElementById("modal");
//     const modalContent = document.getElementById("modal-content");
//     const modalTitle = document.getElementById("modal-title");
//     const modalText = document.getElementById("modal-text");
//     const modalButton = document.getElementById("modal-button");
//     const myScorePercent = (myScore / myQuestions.length) * 100;
//     if (myScorePercent >= 80) {
//         modalTitle.innerHTML = "Congratulations!";
//         modalText.innerHTML = "You got " + myScorePercent + "% correct";
//         modalButton.innerHTML = "Play Again";
//     } else {
//         modalTitle.innerHTML = "Sorry!";
//         modalText.innerHTML = "You got " + myScorePercent + "% correct";
//         modalButton.innerHTML = "Try Again";
//     }
//     modalContainer.classList.add("modal--show");
// };

//funcion para quitar espacios de una cadena de texto