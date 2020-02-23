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
    if (inputAnswer.questionCounter < 4) {
      (inputAnswer.messageArea
        .delete()
        .type("Sorry, you've lost")
        .pause(1000)
        .delete()
        .type("I'm afraid you're leaving with nothing")
        //     inputAnswer.messageArea.type("You're leaving here with 10000 munnys.")
        .type("Better luck next time.")
        .pause(1000)
        .delete()
        .type("Click the play-again button to try again")
        .go());
    } else {
      (inputAnswer.messageArea
        .delete()
        .type("Sorry, you've lost")
        .pause(1000)
        .delete()
        .type("You're leaving here with 10000 munnys.")
        .type("Well done, but you can do better next time.")
        .pause(1000)
        .delete()
        .type("Click the play-again button to try again")
        .go());
    }
  }
};

export const addingQuestionListeners = (game) => {
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
};

export const addingResetListener = (game) => {
  console.log("added reset listener");
  game.playAgainButton.addEventListener("click", () => {
    game.inner.parentNode.removeChild(game.inner);
    game.submitButtonChecker = false;
    game.loseReset();
    }, {once: true});
}

export const addingLifelineListener = (game) => {
  game.fifty50Clicker.addEventListener("click", () => {
    game.stopTimer();
    game.messageArea
    .empty()
    .type("Well you want to use a lifeline?")
    .pause(1000)
    .delete()
    .type("Computer, please remove 2 of the incorrect answers from the page")
    .pause(1000)
    .exec(() => {game.fifty50();})
    .delete()
    .type("2 incorrect answers have been removed. Goodluck")
    .exec(() => {
      if (game.questionCounter <= 4) {
        game.startTimer();
      }
    })
    .go();
  }, {once: true});

  game.pafClicker.addEventListener("click", () => {
    game.stopTimer();
    game.messageArea
    .empty()
    .type("Hold the clock. So, who do you want me to Ring?")
    .pause(1000)
    .delete()
    .type("You want me to phone... ")
    .pause(1000)
    .type(`${game.selectedPerson}?`)
    .pause(1000)
    .delete()
    .type(`Well okay then. Calling ${game.selectedPerson}.`)
    .pause(1000)
    .delete()
    .type("Ring... Ring... ")
    .pause(1000)
    .type(`Hello? `)
    .pause(500)
    .type(`${game.selectedPerson}`)
    .pause(1000)
    .delete()
    .type("Hello, yes this is Monopoly man and we're currently playing Who wants to be a Munnyaire.")
    .pause(500)
    .delete()
    .type(`Yes the current question is for ${game.scoreBoard.scores[game.questionCounter]} munnys.`)
    .pause(1000)
    .delete()
    .type("The question is... ")
    .pause(1500)
    .delete()
    .type("<em>after some time of talking... </em>")
    .pause(2500)
    .type(`${game.selectedPerson} thinks the answer is ${game.currentCorrectAnswer}.`)
    .exec(() => {
      if (game.questionCounter <= 4) {
        game.startTimer();
      }
    })
    .go()
  }, {once: true});
}

export const addingTakeMoneyButton = (game) => {
  game.takeMoneyButton.addEventListener("click", () => {
    game.stopTimer();
    if (game.questionCounter === 0) {
      game.messageArea
      .empty()
      .type("Well done for getting this far.")
      .pause(1000)
      .delete()
      .type(`You haven't won anything unfortunately, better luck next time.`)
      .pause(1500)
      .delete()
      .type("To play again, click the play again button.")
      .go()
    } else {
      game.messageArea
      .empty()
      .type("Well done for getting this far.")
      .pause(1000)
      .delete()
      .type(`You've won ${game.scoreBoard.scores[game.questionCounter - 1]} munnys. Well done.`)
      .pause(1500)
      .delete()
      .type("To play again, click the play again button.")
      .go()
    }
  })
}

export let questionBox = document.querySelector('.messagearea');
export let answerBoxes = document.querySelectorAll('.answersbox div');
export let submitButton = document.querySelector('.submit');
export let scoresLabels = document.querySelectorAll('.scoreslabel');
export let timeBox = document.getElementById('progressbar1');
export let playAgain = document.querySelector('.play_again');
export let fifty50Button = document.querySelector('.fifty50');
export let pafButton = document.querySelector('.paf');
export let takeMoneyButton = document.querySelector('.Takemoney');

export let newGame = new Game(questionBox, answerBoxes, submitButton, scoresLabels, timeBox, playAgain, takeMoneyButton, scoresLabels, fifty50Button, pafButton);
