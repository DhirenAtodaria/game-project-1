import Question from "./Question.js"
import Board from "./Scoreboard.js"
import * as main from "./main.js"

class Game {
    constructor(questionBox, answerBoxes, submitButton, scoresLabels, timeBox, playAgainButton, takeMoneyButton, scoreBoard, fifty50, paf) {
        this.urls =  [
            'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple',
            'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple',
            'https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple'];
        this.questionBox = questionBox;
        this.answerBoxes = answerBoxes;
        this.submitButton = submitButton;
        this.scoresLabels = scoresLabels;
        this.timeBox = timeBox;
        this.playAgainButton = playAgainButton;
        this.takeMoneyButton = takeMoneyButton;
        this.fifty50Clicker = fifty50;
        this.pafClicker = paf;
        this.firstQuestionListeners = true;
        this.finishedTalking;
        this.fifty50Used = 0;
        this.pafUsed = 0
        this.people = ["Dad", "Ollie", "Andy", "Sam", "Sunny", "Dhiren", "Stephen", "Sergiu"]
        this.selectedPerson = "Johnny J";
        this.currentCorrectAnswer;
        this.currentIncorrectAnswers;
        this.scoreBoard = new Board(scoreBoard);
        this.messageArea = new TypeIt(".messagearea", {speed: 50, waitUntilVisible: true});
        this.questionCounter = 0;
        this.answerInput = "";
        this.inputIndex;
        this.submitButtonChecker = false;
        this.inner;

        // this.questions is an array which holds all 15 of my question objects.
        this.questions;
        
    }

    progressBarTimer() {
        this.timeBox.className = 'progressbar';
        this.inner = document.createElement('div');
        this.inner.className = 'inner';
        this.inner.style.animationDuration = "30s";
    
        this.inner.addEventListener('animationend', () => {
            this.messageArea
            .empty()
            .type("Time's up!")
            .pause(1000)
            .delete()
            .type("You've lost, click play-again to retry.")
            .go()
        });
        this.timeBox.appendChild(this.inner);
        this.inner.style.animationPlayState = "running";
    }

    stopTimer() {
        let currentTimerElem = document.querySelector('.inner');
        currentTimerElem.style.animationPlayState = "paused";
    }

    startTimer() {
        let currentTimerElem = document.querySelector('.inner');
        currentTimerElem.style.animationPlayState = "running";
    }
    
    questionSetter() {
        if (this.questionCounter === 0) {
            let currentQuestion = this.questions[this.questionCounter].question;
            this.answerSetter();
            this.messageArea
            .exec(() => {
                this.finishedTalking = false;
            })
            .pause(2000)
            .type("Hello and welcome to who wants to be a MUNNYAIRE!")
            .pause(1000)
            .delete()
            .type("Get ready for your first question, which is worth a whopping 500 munnys.")
            .pause(500)
            .delete()
            .type("Here are the answers to the first question:")
            .exec(() => {
                let answerAnim = gsap.timeline()
                answerAnim.to('#answer1', {duration: 1, opacity: 1})
                answerAnim.to('#answer2', {duration: 1, opacity: 1})
                answerAnim.to('#answer3', {duration: 1, opacity: 1})
                answerAnim.to('#answer4', {duration: 1, opacity: 1})
            })
            .pause(2000)
            .delete()
            .type("To select an answer, please click on any of the 4 answers.")
            .pause(1000)
            .delete()
            .type("Once selected you can change your answer as much as you like.")
            .pause(1000)
            .delete()
            .type("After you've made your decision, click the final button to lock in your answer.")
            .pause(1000)
            .delete()
            .type("If you're right you'll proceed to the next question, if wrong you'll lose. Good luck.")
            .pause(1000)
            .delete()
            .type(`And here is the question for 500 Munnys:`)
            .pause(1000)
            .delete()
            .type(`${currentQuestion}`)
            .exec(() => {
                main.addingQuestionListeners(this)
                if (this.firstQuestionListeners) {
                        this.firstQuestionListeners = false;
                        main.adding5050(this);
                        main.addingPaf(this);
                        main.addingResetListener(this);
                        main.addingTakeMoneyButton(this);
                }
                if (this.fifty50Used === 1) {
                    main.adding5050(this);
                }
                if (this.pafUsed === 1) {
                    main.addingPaf(this);
                }
                if (this.questionCounter <= 4) {
                    this.progressBarTimer();
                }
                this.finishedTalking = true
            })
            .go()
        } else {
            let randomPersonNumber = Math.floor(Math.random()*8)
            this.selectedPerson = this.people[randomPersonNumber];
            let currentQuestion = this.questions[this.questionCounter].question

            this.messageArea
            .exec(() => {
                this.finishedTalking = false;
            })
            .pause(4000)
            .type("Next Question")
            .pause(1000)
            .delete()
            .pause(2000)
            .type("Here are the answers")
            .exec(() => {
                let answerAnim = gsap.timeline()
                answerAnim.to('#answer1', {duration: 1, opacity: 1})
                answerAnim.to('#answer2', {duration: 1, opacity: 1})
                answerAnim.to('#answer3', {duration: 1, opacity: 1})
                answerAnim.to('#answer4', {duration: 1, opacity: 1})
            })
            .pause(2000)
            .delete()
            .type(`And here is the question for ${this.scoreBoard.scores[this.questionCounter]} Munnys`)
            .pause(1000)
            .delete()
            .type(`${currentQuestion}`)
            .exec(() => {
                main.addingQuestionListeners(this);
                this.finishedTalking = true;
                if (this.questionCounter <= 4) {
                    this.progressBarTimer();
                }})
            .go()
        }
    }

    answerSetter() {
        let randomNumber = Math.floor(Math.random()*4);
        this.currentCorrectAnswer = this.questions[this.questionCounter].correctAnswer
        this.answerBoxes[randomNumber].innerHTML = this.currentCorrectAnswer;

        let i = 0;
        this.currentIncorrectAnswers = [];
        this.answerBoxes.forEach(item => {
        if (item !== this.answerBoxes[randomNumber]) {
            this.currentIncorrectAnswers.push(item);
            item.innerHTML = this.questions[this.questionCounter].incorrectAnswers[i];
            i++;
            }
        });
    };
    
    get finalAnswerValue() {
        return this.answerInput === this.currentCorrectAnswer;
    }

    nextQuestion() {
        if (this.questionCounter <= 4) {
            this.inner.parentNode.removeChild(this.inner);
        }
        this.answerInput = "";
        this.inputIndex = undefined;
        (this.answerBoxes).forEach(item => {
            item.classList = "";
        })
        this.buildQuiz();
    };

    loseReset() {
        this.messageArea.empty().go();
        let answerAnim = gsap.timeline()
            answerAnim.to('#answer1', {duration: 0.5, opacity: 0}, "0s")
            answerAnim.to('#answer2', {duration: 0.5, opacity: 0}, "0s")
            answerAnim.to('#answer3', {duration: 0.5, opacity: 0}, "0s")
            answerAnim.to('#answer4', {duration: 0.5, opacity: 0}, "0s")
            answerAnim.to('.inner', {duration: 0.5, opacity: 0}, "0s")
        this.answerInput = "";
        this.inputIndex = undefined;
        this.questionCounter = 0;
        this.answerBoxes.forEach(item => {
            item.classList = "";
        });
        this.scoresLabels.forEach(item => item.classList = "");
        this.questionGetter();
    };

    fifty50() {
        let randomNumber2 = Math.floor(Math.random()*2);
        this.currentIncorrectAnswers[2].style.opacity = 0;
        this.currentIncorrectAnswers[randomNumber2].style.opacity = 0;
    };

    paf() {
        this.messageArea
        .empty()
        .type("Hold the clock. So, who do you want me to Ring?")
        .pause(1000)
        .delete()
        .type("You want me to phone... ")
        .pause(1000)
        .type(`${this.selectedPerson}?`)
        .pause(1000)
        .delete()
        .type(`Well okay then. Calling ${this.selectedPerson}.`)
        .pause(1000)
        .delete()
        .type("Ring... Ring... ")
        .pause(1000)
        .type(`Hello? `)
        .pause(500)
        .type(`${this.selectedPerson}`)
        .pause(1000)
        .delete()
        .type("Hello, yes this is Monopoly man and we're currently playing Who wants to be a Munnyaire.")
        .pause(500)
        .delete()
        .type(`Yes the current question is for ${this.scoreBoard.scores[this.questionCounter]} munnys.`)
        .pause(1000)
        .delete()
        .type("The question is... ")
        .pause(1500)
        .delete()
        .type("<em>after some time of talking... </em>")
        .pause(2500)
        .type(`${this.selectedPerson} thinks the answer is ${this.currentCorrectAnswer}.`)
        .exec(() => {
        if (this.questionCounter <= 4) {
            this.startTimer();
        }
        })
        .go()
    }

    buildQuiz() {
        this.questionSetter();
        this.answerSetter();
    };

    questionGetter() {
        Promise.all((this.urls).map(url =>
            fetch(url)
                .then(res => res.json())
            ))
            .then(
              data => {
                this.questions = [];
                data.forEach(item => {
                  item['results'].forEach(question => {this.questions.push(new Question(question.question, question.correct_answer, question.incorrect_answers))});
                }
                )
              }
            )
            .then(() => {
                this.buildQuiz();
            })
    };
}

export default Game;


