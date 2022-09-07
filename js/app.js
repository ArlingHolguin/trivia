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

// cargar variable category desde select con oel evento onchange
var category = document.getElementById("category");
category.addEventListener("change", (e) => {
    console.log(e.target.value);
    category = e.target.value;
    return category;
});
//cargar variable difficulty desde select con el evento onchange
var difficulty = document.getElementById("difficulty");
difficulty.addEventListener("change", (e) => {
    console.log(e.target.value);
    difficulty = e.target.value;
    return difficulty;
});
//cargar variable type desde select con el evento onchange
var type = document.getElementById("type");
type.addEventListener("change", (e) => {
    console.log(e.target.value);
    type = e.target.value;
    // console.log(e.target.selectedIndex + " hola "); // 1
    return type;
});

const question = document.getElementById("question");
const options = document.getElementById("answers_list");

const getData = async() => {
    const url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=${type}`;
    const data = await fetch(url);
    const dataJSON = await data.json();
    let myQuestions = dataJSON.results;
    console.log(url);
    // console.log(myQuestions);
    // return myQuestions;
    showMyQuestions(myQuestions[0]);
};

function showMyQuestions(dataJSON) {
    let correct_answer = dataJSON.correct_answer;
    let incorrect_answers = dataJSON.incorrect_answers;
    let optionsList = incorrect_answers;
    optionsList.splice(
        Math.floor(Math.random() * (incorrect_answers.length + 1)),
        0,
        correct_answer
    );
    console.log(correct_answer);
    console.log(incorrect_answers);
    console.log(incorrect_answers);
    console.log(optionsList);
    question.innerHTML = `${dataJSON.question} `;
    options.innerHTML = `${optionsList.map((option, index) => `
        <div class="container_respuesta hvr-bounce-in">
                <div class="b_circle">
                    <small>${index + 1}</small>
                </div>
                <div class="text-respuesta">
                    ${option}
                </div>
        </div>
            
        `
          ).join("")}
    `;
}


// getData();

// funcion para mostrar las preguntas
// const showQuestions = async() => {
//     const myQuestions = await getData();
//     let html = "";
//     myQuestions.forEach((pregunta) => {
//         html += `<div class="bloque_pregunta">
//         <h2 class="pregunta">${pregunta.question}</h2>
//         <div class="bloque_respuestas">
//             <button class="respuesta">${pregunta.correct_answer}</button>
//             <button class="respuesta">${pregunta.incorrect_answers[0]}</button>
//             <button class="respuesta">${pregunta.incorrect_answers[1]}</button>
//             <button class="respuesta">${pregunta.incorrect_answers[2]}</button>
//         </div>
//     </div>`;
//     });
//     question.innerHTML = html;
//     // console.log(myQuestions);
// };

// };

// funcion para obtener datos de api y controlar los errores
// function getData() {
//     console.log(category.length + difficulty.length + type.length);
//     if (category.length > 0 && difficulty.length > 0 && type.length > 0) {
//         const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`;
//         fetch(url)
//             .then((response) => response.json())
//             .then((data) => {
//                 let myQuestions = data.results;
//                 console.log(url);
//                 console.log(myQuestions);
//                 return myQuestions;
//             });
//     } else {
//         alert('Selecciona una categoria, dificultad y tipo');
//     }
// }

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