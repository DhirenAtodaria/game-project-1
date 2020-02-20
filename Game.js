class Game {
    constructor() {
        this.questionBox = document.querySelector('.questionbox');
        this.answerBoxes = document.querySelectorAll('.answersbox div');
        this.counter = 0
        this.answerInput = ""
        this.inputIndex;
        this.scoresLabels = document.querySelectorAll('.scoreslabel');
        this.currentScore;
        this.timeBox = document.querySelector('.timer');
    }
}

class Question {
    constructor() {
        this.urls =  [
            'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple',
            'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple',
            'https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple'];
        this.questions;
    }
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


let newGame = new Game();
let question = new Question();
let score = new Scoreboard();
let submitButton = document.querySelector('.submit');
let timerID;
let timeleft = 30;
score.scoreEnumeration();

const questionSetter = () => {
        (newGame.questionBox).innerHTML = (question.questions).results[newGame.counter].question;
};

const answerSetter = () => {
        let randomNumber = Math.floor(Math.random()*4);
        newGame.answerBoxes[randomNumber].innerHTML = (question.questions).results[newGame.counter].correct_answer;

        let i = 0;
        newGame.answerBoxes.forEach(item => {
        if (item !== newGame.answerBoxes[randomNumber]) {
            item.innerHTML = (question.questions).results[newGame.counter].incorrect_answers[i];
            i++;
            }
        });
};

const clickSetter = () => {
    (newGame.answerBoxes).forEach(item => {
        item.addEventListener("click", () => {
            newGame.answerInput = event.target.innerHTML;
            newGame.inputIndex = event.target;
            (newGame.answerBoxes).forEach(item => {
                item.classList = "";
            });
            event.target.classList.add('selectedstyle');
        })
    })
};

const answerChecker = () => {
    if (newGame.answerInput === (question.questions).results[newGame.counter].correct_answer) {
        newGame.inputIndex.classList.add("correctanswer");
        score.scoresLabels[newGame.counter].classList.add("scorestyle");
        newGame.counter++;
        newGame.currentScore = score.scoreBoard[newGame.counter - 1];
        console.log(newGame.currentScore);
        setTimeout(nextQuestion, 3000);
    } else {
        if (newGame.inputIndex) {
        newGame.inputIndex.classList.add("incorrectanswer");
        setTimeout(loseReset, 3000);
        } else {
            addingListener();
        }
    }
};

const startTimer = () => {
    const countDown = () => {
        if (timeleft === 0) {
            clearTimeout(timerID);
            loseReset();
        } else {
            newGame.timeBox.innerHTML = `${timeleft} seconds remaining`;
            timeleft--;
        }
    };
    countDown();
    timerID = setInterval(countDown, 1000);
};

const stopTimer = () => {
    clearTimeout(timerID);
    timeleft = 30;
    newGame.timeBox.innerHTML = "";
}


const nextQuestion = () => {
    newGame.answerInput = "";
    newGame.inputIndex = undefined;
    newGame.answerBoxes.forEach(item => {
        item.classList = "";
    })
    buildQuiz();
};

const loseReset = () => {
    newGame.answerInput = "";
    newGame.inputIndex = undefined;
    newGame.counter = 0;
    newGame.answerBoxes.forEach(item => {
        item.classList = "";
    });
    newGame.scoresLabels.forEach(item => item.classList = "");
    stopTimer();
    questionGetter();
};

const addingListener = () => {
    submitButton.addEventListener("click", function handler() {
        event.target.removeEventListener("click", handler);
        stopTimer();
        if (newGame.counter < 4) {
            setTimeout(startTimer, 3000);
        }
        answerChecker();
    })
}


const buildQuiz = () => {
    questionSetter();
    answerSetter();
    clickSetter();
    addingListener();
};


const questionGetter = () => {
    Promise.all((question.urls).map(url =>
        fetch(url)
            .then(res => res.json())
        ))
        .then(data => {
        question.questions = {'results': []};
        data.forEach(item => {
            item['results'].forEach(obj => {
                (question.questions).results.push(obj);
            })
        });
        })
        .then(() => {
            startTimer();
            buildQuiz();
        })
        .then(() => console.log(question.questions))
};

questionGetter();