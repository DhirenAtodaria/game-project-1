import Game from "./Game.js"

export const answerChecker = (inputAnswer) => {
  if (inputAnswer.finalAnswerValue) {
    inputAnswer.inputIndex.classList.add("correctanswer");
    inputAnswer.scoreBoard.scoresLabels[inputAnswer.questionCounter].classList.add("scorestyle");
    inputAnswer.questionCounter++;

    (inputAnswer.messageArea
    .exec(() => {
      let answerAnim = gsap.timeline()
            answerAnim.to('#answer1', {duration: 0.5, opacity: 0})
            answerAnim.to('#answer2', {duration: 0.5, opacity: 0})
            answerAnim.to('#answer3', {duration: 0.5, opacity: 0})
            answerAnim.to('#answer4', {duration: 0.5, opacity: 0})
            answerAnim.to('.inner', {duration: 0.5, opacity:0})
    })
    .delete()
    .type("YOU'VE WON!!!")
    .pause(1000)
    .delete()
    .type("Well done, now good luck on the next question.")
    .pause(1000)
    .delete()
    .go())
    
    setTimeout(function() {inputAnswer.submitButtonChecker = false;
                            inputAnswer.nextQuestion();}, 6000);      
  } else {
    inputAnswer.inputIndex.classList.add("incorrectanswer");
    (inputAnswer.messageArea
      .delete()
      .type("Sorry, you've lost all the munnys")
      .pause(1000)
      .delete()
      .type("Better luck next time.")
      .pause(1000)
      .delete()
      .type("Click the play-again button to try again")
      .go());
  }
};

export const addingListener = (game) => {
  console.log("listeneron");
  game.submitButton.addEventListener("click", () => {
      if (game.inputIndex) {
          game.submitButtonChecker = true;
          game.stopTimer();
          game.animationStatus = "paused";
          answerChecker(game);
      } else {
          alert("Click an answer Please");
      }
    console.log("triggerd?");
  }, {once: true});

  game.answerBoxes.forEach(item => {
    item.addEventListener("click", () => {
        if (!game.submitButtonChecker) {
          game.answerInput = event.target.innerHTML;
          game.inputIndex = event.target;
          (game.answerBoxes).forEach(item => {
            item.classList = "";
          });
          event.target.classList.add('selectedstyle');
        }
    })
  }, {once: true});

  game.playAgainButton.addEventListener("click", () => {
    game.inner.parentNode.removeChild(game.inner);
    game.submitButtonChecker = false;
    game.loseReset();
    }, {once: true});
};

export let questionBox = document.querySelector('.messagearea');
export let answerBoxes = document.querySelectorAll('.answersbox div');
export let submitButton = document.querySelector('.submit');
export let scoresLabels = document.querySelectorAll('.scoreslabel');
export let timeBox = document.getElementById("progressbar1");
export let playAgain = document.querySelector('.play_again');

export let newGame = new Game(questionBox, answerBoxes, submitButton, scoresLabels, timeBox, playAgain, scoresLabels);
