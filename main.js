import Game from "./Game.js"
import Scoreboard from "./Scoreboard.js"

const answerChecker = (inputAnswer) => {
  if (inputAnswer.finalAnswerValue) {
      inputAnswer.inputIndex.classList.add("correctanswer");
      score.scoresLabels[inputAnswer.counter].classList.add("scorestyle");
      inputAnswer.counter++;
      inputAnswer.currentScore = score.scoreBoard[inputAnswer.counter - 1];
      console.log(inputAnswer.currentScore);
      setTimeout(function() {inputAnswer.nextQuestion();}, 3000);
  } else {
          inputAnswer.inputIndex.classList.add("incorrectanswer");
          setTimeout(function() {inputAnswer.loseReset()}, 3000);
  }
};

const addingListener = (game) => {
  game.submitButton.addEventListener("click", function handler() {
      if (game.inputIndex) {
          event.target.removeEventListener("click", handler);
          game.stopTimer();
          answerChecker(game);
          setTimeout(function() {game.submitButtonChecker = false; 
                                 addingListener(game);}, 3000)

      } else {
          alert("Click an answer Please");
      }
      game.submitButtonChecker = true;
  })

  game.answerBoxes.forEach(item => {
    item.addEventListener("click", function handler() {
        if (game.submitButtonChecker) {
          event.target.removeEventListener("click", handler)
        } else{
        game.answerInput = event.target.innerHTML;
        game.inputIndex = event.target;
        (game.answerBoxes).forEach(item => {
            item.classList = "";
        });
        event.target.classList.add('selectedstyle');
      }
    })
  })
};

let questionBox = document.querySelector('.questionbox');
let answerBoxes = document.querySelectorAll('.answersbox div');
let submitButton = document.querySelector('.submit');
let scoresLabels = document.querySelectorAll('.scoreslabel');
let timeBox = document.querySelector('.timer');
let newGame = new Game(questionBox, answerBoxes, submitButton, scoresLabels, timeBox);
let score = new Scoreboard(scoresLabels);

score.scoreEnumeration();
addingListener(newGame);
newGame.questionGetter();