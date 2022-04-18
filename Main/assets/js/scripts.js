// 

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

initialsEl.onkeyup = checkForEnter;

function clockTick() {
  // this is the timer
  time--;
  timerEl.textContent = time;

  // ends the quiz if user run out of time
  if (time == 0) {
    quizEnd();
  }
}
function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // show the questions
  questionsEl.removeAttribute("class");

  // start the timer
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;

  //run to get each question
  getQuestion();
}


function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices
  choicesEl.innerHTML = "";

  // for each question, create the buttons for each of the choices
  currentQuestion.choices.forEach(function(choice, i) {
    var theChoice = document.createElement("button");
    theChoice.setAttribute("class", "choice");
    theChoice.setAttribute("value", choice);

    theChoice.textContent = i + 1 + ". " + choice;

    // see which is the choice
    theChoice.onclick = questionClick;

    choicesEl.appendChild(theChoice);
  });
}

function questionClick() {
  // if user choose the wrong choice, reduce time by 5 seconds per wrong question
  if (this.value !== questions[currentQuestionIndex].answer) {
    //reduce time by 5 seconds per wrong question
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

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}



