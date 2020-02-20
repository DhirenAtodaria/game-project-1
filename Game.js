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
                loseReset();
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

    buildQuiz() {
        this.questionSetter();
        this.answerSetter();
        this.clickSetter();
        addingListener();
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

const nextQuestion = () => {
    if (newGame.counter < 4) {
        newGame.stopTimer();
        newGame.startTimer();
    }
    newGame.answerInput = "";
    newGame.inputIndex = undefined;
    newGame.answerBoxes.forEach(item => {
        item.classList = "";
    })
    newGame.buildQuiz();
};

const loseReset = () => {
    newGame.answerInput = "";
    newGame.inputIndex = undefined;
    newGame.counter = 0;
    newGame.answerBoxes.forEach(item => {
        item.classList = "";
    });
    newGame.scoresLabels.forEach(item => item.classList = "");
    newGame.stopTimer();
    newGame.questionGetter();
};

const answerChecker = () => {
    if (newGame.finalAnswerValue) {
        newGame.inputIndex.classList.add("correctanswer");
        score.scoresLabels[newGame.counter].classList.add("scorestyle");
        newGame.counter++;
        newGame.currentScore = score.scoreBoard[newGame.counter - 1];
        console.log(newGame.currentScore);
        setTimeout(nextQuestion, 3000);
    } else {
            newGame.inputIndex.classList.add("incorrectanswer");
            setTimeout(loseReset, 3000);
    }
};

const addingListener = () => {
    newGame.submitButton.addEventListener("click", function handler() {
        if (newGame.inputIndex) {
            event.target.removeEventListener("click", handler);
            newGame.stopTimer();
            answerChecker(newGame);
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
newGame.questionGetter();

