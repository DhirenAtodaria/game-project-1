class Question {
    constructor(question, correct_answer, incorrect_answers) {
        this.question = question;
        this.correct_answer = correct_answer;
        this.incorrect_answers = incorrect_answers;
    }
}

class Game {
    constructor(questionBox, answerBoxes, submitButton, scoresLabels, timeBox) {
        this.urls =  [
            'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple',
            'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple',
            'https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple'];
        this.questionBox = questionBox;
        this.answerBoxes = answerBoxes;
        this.submitButton = submitButton;
        this.scoresLabels = scoresLabels;
        this.timeBox = timeBox;
        this.counter = 0
        this.answerInput = ""
        this.inputIndex;
        this.currentScore;
        this.questions;
        this.timerID;
        this.timeleft = 30;
    }

    startTimer() {
        const countDown = () => {
            if (this.timeleft === 0) {
                clearTimeout(this.timerID);
                this.loseReset();
            } else {
                this.timeBox.innerHTML = `${this.timeleft} seconds remaining`;
                this.timeleft--;
            }
        };
        countDown();
        this.timerID = setInterval(countDown, 1000);
    };

    stopTimer() {
        clearTimeout(this.timerID);
        this.timeleft = 30;
        this.timeBox.innerHTML = "";
    }
    
    questionSetter() {
        this.questionBox.innerHTML = this.questions[this.counter].question;
    }

    answerSetter = () => {
        let randomNumber = Math.floor(Math.random()*4);
        this.answerBoxes[randomNumber].innerHTML = this.questions[this.counter].correct_answer;

        let i = 0;
        this.answerBoxes.forEach(item => {
        if (item !== this.answerBoxes[randomNumber]) {
            item.innerHTML = this.questions[this.counter].incorrect_answers[i];
            i++;
            }
        });
    };

    clickSetter() {
        (this.answerBoxes).forEach(item => {
            item.addEventListener("click", () => {
                this.answerInput = event.target.innerHTML;
                this.inputIndex = event.target;
                (this.answerBoxes).forEach(item => {
                    item.classList = "";
                });
                event.target.classList.add('selectedstyle');
            })
        })
    };
    
    get finalAnswerValue() {
        return this.answerInput === (this.questions)[this.counter].correct_answer;
    }

    nextQuestion() {
        if (this.counter < 4) {
            this.stopTimer();
            this.startTimer();
        }
        this.answerInput = "";
        this.inputIndex = undefined;
        (this.answerBoxes).forEach(item => {
            item.classList = "";
        })
        this.buildQuiz();
    };

    loseReset = () => {
        this.answerInput = "";
        this.inputIndex = undefined;
        this.counter = 0;
        this.answerBoxes.forEach(item => {
            item.classList = "";
        });
        this.scoresLabels.forEach(item => item.classList = "");
        this.stopTimer();
        this.questionGetter();
    };

    buildQuiz() {
        this.questionSetter();
        this.answerSetter();
        this.clickSetter();
        // addingListener();
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
            .then(() => console.log(this.questions))
            .then(() => {
                this.startTimer();
                this.buildQuiz();
            })
    };
}

class Scoreboard {
    constructor() {
        this.scoresLabels = document.querySelectorAll('.scoreslabel');
        this.scoreBoard = [];
    }

    scoreEnumeration() {
        this.scoresLabels.forEach(item => this.scoreBoard.push(item.innerHTML));
    }
}

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
            event.target.removeEventListener("click", handler);
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

