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

// funcion para consultar api https://opentdb.com/api_config.php

const getData = async(amount) => {
    const url = `https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple`;
    const data = await fetch(url);
    const dataJSON = await data.json();
    return dataJSON.results;

}
getData().then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
}).finally(() => {
    console.log("finally");
});

//funcion para crear preguntas y respuestas
const createQuestions = (data) => {
    const questions = data.map((question) => {
        return {
            question: question.question,
            answers: question.incorrect_answers.concat(question.correct_answer),
            correctAnswer: question.correct_answer,
            correct: null
        };
    }).sort(() => Math.random() - 0.5);
    return questions;
}

//funcion para crear las preguntas y respuestas en el html
const createQuiz = (questions) => {
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
    const myQuestions = createQuestions(questions);
    let myScore = 0;
    const output = [];
    for (let i = 0; i < myQuestions.length; i++) {
        const answers = [];
        for (let j = 0; j < myQuestions[i].answers.length; j++) {
            answers.push(
                `<label>
                    <input type="radio" name="question${i}" value="${myQuestions[i].answers[j]}">
                    ${myQuestions[i].answers[j]}
                </label>`
            );
        }
        output.push(
            `<div class="question"> ${myQuestions[i].question} </div>
            <div class="answers"> ${answers.join("")} </div>`
        );
    }
    quizContainer.innerHTML = output.join("");
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        myScore = 0;
        for (let i = 0; i < myQuestions.length; i++) {
            const answerContainer = quizContainer.querySelector(`#question${i}`);
            const answer = answerContainer.querySelector("input[name=question" + i + "]:checked");
            if (answer) {
                if (answer.value === myQuestions[i].correctAnswer) {
                    myScore++;
                    answerContainer.style.color = "green";
                } else {
                    answerContainer.style.color = "red";
                }
            }
            if (!answer) {
                answerContainer.style.color = "black";
            }
        }
        resultsContainer.innerHTML = `${myScore} out of ${myQuestions.length}`;
    });
}

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
}