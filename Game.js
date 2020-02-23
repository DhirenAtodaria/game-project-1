import Question from "./Question.js"
import Board from "./Scoreboard.js"
import * as main from "./main.js"

class Game {
    constructor(questionBox, answerBoxes, submitButton, scoresLabels, timeBox, playAgainButton, scoreBoard) {
        this.urls =  [
            'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple',
            'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple',
            'https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple'];
        this.questionBox = questionBox;
        this.answerBoxes = answerBoxes;
        this.submitButton = submitButton;
        this.scoresLabels = scoresLabels;
        this.scoreBoard = new Board(scoreBoard);
        this.timeBox = timeBox;
        this.inner;
        this.playAgainButton = playAgainButton;
        this.messageArea = new TypeIt(".messagearea", {speed: 50, waitUntilVisible: true});
        this.questionCounter = 0
        this.answerInput = ""
        this.inputIndex;
        this.questions;
        this.timerID;
        this.timeleft = 30;
        this.submitButtonChecker = false;
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
            .type("You've lost, click play-again to retry")
            .go()
        });
        this.timeBox.appendChild(this.inner);
        this.inner.style.animationPlayState = "running";
    }

    stopTimer() {
        let currentTimerElem = document.querySelector('.inner');
        currentTimerElem.style.animationPlayState = "paused";
    }
    
    questionSetter() {
        let currentQuestion = this.questions[this.questionCounter].question
        this.messageArea
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
            main.addingListener(this);
            if (this.questionCounter < 4) {
                this.progressBarTimer();
            }})
        .go()
    }

    answerSetter() {
        let randomNumber = Math.floor(Math.random()*4);
        this.answerBoxes[randomNumber].innerHTML = this.questions[this.questionCounter].correctAnswer;

        let i = 0;
        this.answerBoxes.forEach(item => {
        if (item !== this.answerBoxes[randomNumber]) {
            item.innerHTML = this.questions[this.questionCounter].incorrectAnswers[i];
            i++;
            }
        });
    };
    
    get finalAnswerValue() {
        return this.answerInput === (this.questions)[this.questionCounter].correctAnswer;
    }

    nextQuestion() {
        if (this.questionCounter < 4) {
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
            answerAnim.to('#answer1', {duration: 0.5, opacity: 0})
            answerAnim.to('#answer2', {duration: 0.5, opacity: 0})
            answerAnim.to('#answer3', {duration: 0.5, opacity: 0})
            answerAnim.to('#answer4', {duration: 0.5, opacity: 0})
            answerAnim.to('.inner', {duration: 0.5, opacity: 0})
        this.answerInput = "";
        this.inputIndex = undefined;
        this.questionCounter = 0;
        this.answerBoxes.forEach(item => {
            item.classList = "";
        });
        this.scoresLabels.forEach(item => item.classList = "");
        console.log("this has happened but why?")
        this.questionGetter();
    };

    firstQuestion() {
        let currentQuestion = this.questions[this.questionCounter].question;
        this.answerSetter();
        this.messageArea
        .pause(4000)
        .type("Hello and welcome to who wants to be a MUNNYAIRE")
        .pause(1000)
        .delete()
        .type("Get ready for your first question, which is worth a whopping 500 munnys")
        .pause(500)
        .delete()
        .type("Here are the answers to the first question")
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
        .type(`And here is the question for 500 Munnys`)
        .pause(1000)
        .delete()
        .type(`${currentQuestion}`)
        .exec(() => {
            main.addingListener(this);
            if (this.questionCounter < 4) {
                this.progressBarTimer();
            }})
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
                this.firstQuestion();
            })
    };
}

export default Game;


