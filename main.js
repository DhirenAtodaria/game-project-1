import Game from "./Game.js"
import Scoreboard from "./Scoreboard.js"

const answerChecker = (param) => {
  if (param.finalAnswerValue) {
      param.inputIndex.classList.add("correctanswer");
      score.scoresLabels[param.counter].classList.add("scorestyle");
      param.counter++;
      param.currentScore = score.scoreBoard[param.counter - 1];
      console.log(param.currentScore);
      setTimeout(function() {param.nextQuestion()}, 3000);
  } else {
          param.inputIndex.classList.add("incorrectanswer");
          setTimeout(function() {param.loseReset()}, 3000);
  }
};

const addingListener = (game) => {
  game.submitButton.addEventListener("click", function handler() {
      if (game.inputIndex) {
          // event.target.removeEventListener("click", handler);
          game.stopTimer();
          answerChecker(game);
      } else {
          alert("Click an answer Please");
      }
  })
};

let questionBox = document.querySelector('.questionbox');
let answerBoxes = document.querySelectorAll('.answersbox div');
let submitButton = document.querySelector('.submit');
let scoresLabels = document.querySelectorAll('.scoreslabel');
let timeBox = document.querySelector('.timer');
let newGame = new Game(questionBox, answerBoxes, submitButton, scoresLabels, timeBox);
let score = new Scoreboard();

score.scoreEnumeration();
addingListener(newGame);
newGame.questionGetter();