// dom elements

var time = 60;
var timerId;
var currentQuestionIndex = 0

var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var startBtn = document.getElementById("start");
var submitBtn = document.getElementById("submit");

// trigger the function when clicked 
startBtn.onclick = startQuiz;


function clockTick() {
  // this is the timer
  time--;
  timerEl.textContent = time;
  console.log(time);

  // alert and ends the quiz if user run out of time
  if (time == 0) {
    window.alert("Time is Up!");
    quizEnd();
  }
}
function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // show the questions to start the quiz
  questionsEl.removeAttribute("class");

  // start the timer
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;

  //run to get each question
  getQuestion();
}


function getQuestion() {
  // get current question from question array
  var currentQuestion = questions[currentQuestionIndex];
  console.log(currentQuestion);
  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices to have empty space
  choicesEl.innerHTML = "";

  // for each question, create the buttons for each of the choices
  currentQuestion.choices.forEach(function(choice, i) {
    var theChoice = document.createElement("button");
    theChoice.setAttribute("class", "choice");
    theChoice.setAttribute("value", choice);

    theChoice.textContent = i + 1 + ". " + choice;

    // see what is the choice
    theChoice.onclick = questionClick;

    choicesEl.appendChild(theChoice);
  });
}

function questionClick() {
  // if user choose the wrong choice, reduce time by 5 seconds per wrong question
  if (this.value !== questions[currentQuestionIndex].answer) {

    time = time - 5;
    timerEl.textContent = time;
  }
  
  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex == questions.length) {
    quizEnd();
    
  } else {
    getQuestion();
  }
}

var finalScoreEl = document.getElementById("final-score");
function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  finalScoreEl.textContent = time;
  

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

// save the name with high score
var initialsEl = document.getElementById("initials");

function saveHighScore(){
  var previousScore = JSON.parse(localStorage.getItem("highScore")) || [];
  const newScore = { 
    initials: initialsEl.value,
    score: time,
   };
   console.log(previousScore);
console.log(newScore);
previousScore.push(newScore);
localStorage.setItem("highScore", JSON.stringify(previousScore)); 
window.location.assign("scores.html")
}
submitBtn.addEventListener("click", saveHighScore);

