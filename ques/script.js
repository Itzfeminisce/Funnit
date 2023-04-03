const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const correct_text = document.getElementById("correct");
const submitBtn = document.getElementById("submit");
let done = []
let score = 0;
let progressBarWidth = 0;
var countDownDate = new Date().getTime() + 60000; 
const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const quizData = [
  {
    id: 1,
    question:
      "Which of the following can be used to call a JavaScript Code Snippet?",
    a: "Function/Method",
    b: "Preprocessor",
    c: "Triggering Event",
    d: "RMI",
    correct: "a",
  },
  {
    id: 2,
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    id: 3,
    question:
      "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
    a: "Position",
    b: "Window",
    c: "Standard",
    d: "Location",
    correct: "b",
  },
  {
    id: 4,
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
  {
    id: 5,
    question: "how does DOM stand for?",
    a: "Document object Manager",
    b: "Document object Management",
    c: "Document Object Model",
    d: "none of the above",
    correct: "c",
  },
];
const quizDataLength = quizData.length;
const storage = {
    setAttempted(quiz) {
      let attemptedQuiz = quizData.splice(quizData.indexOf(quiz),1)
      window.localStorage.setItem(quiz?.id, JSON.stringify(quiz))
      done.push(attemptedQuiz)
    },
    setScore(score){
      window.localStorage.setItem('score', score)
    },
    getScore(){
      return Number(window.localStorage.getItem('score'))
    }
  }

let currentQuiz = loadQuiz();

var x = setInterval(countDownTimer, 1000);
function countDownTimer() {
  let now = new Date().getTime();
  let distance = countDownDate - now;

  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  let countdown = document.getElementById("countdown");
  countdown.textContent = seconds + "s";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "Time's up!";
  }
}

function getRandomQuiz(quizRepo){
  if (!quizRepo instanceof Array) {
    throw new Error("Argument must be of type array");
  }
  // index must be between 0 and quizRepo length
  let generateRandomIndex = () => Math.floor(Math.random() * quizRepo.length);
  let quiz = quizRepo[generateRandomIndex()];
if(quiz == undefined){
  return false;
}else{
  return quiz;
}
};
function loadQuiz() {
  const currentQuizData = getRandomQuiz(quizData);
  if(false == currentQuizData) return false;
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
  correct_text.value = currentQuizData.correct;
  return currentQuizData;
}
function updateProgressBar() {
  var element = document.getElementById("myprogressBar");
  if (progressBarWidth >= 100) {
    alert('finish')
  } else {
    progressBarWidth += 20
    element.style.width = progressBarWidth + "%";
  }
}
function resetAnswers() {
  document
    .querySelectorAll("[type=radio]:checked")
    ?.forEach((el) =>
    {
      if(el.checked){
        el.checked = false;
      }
      })
}
function getSelectedAnswer() {
  let ans = document.querySelector("[type=radio]:checked");
  if(!ans){
    return alert('Select an option!')
  }
  return ans?.id;
}
function getCorrectAnswer(){
  let ans = document.querySelector("[name=correct]");
}


submitBtn.addEventListener("click", () => {
  if(getSelectedAnswer() == getCorrectAnswer()) {
      storage.setScore(score + 1)
      // document.querySelector('#score').textContent = storage.getScore();
    }
      console.log(storage.getScore())
    storage.setAttempted(currentQuiz)
  if(!currentQuiz){
     quiz.innerHTML = `
            <h2>You answered ${storage.getScore()} out of ${quizDataLength} questions correctly</h2>

            <button onclick="location.reload()">Reload</button>`;
            return;
        }
        updateProgressBar()
  currentQuiz = loadQuiz();
  });
