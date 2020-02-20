
class newGame {
    constructor() {
        this.questionBox = document.querySelector('.questionbox');
        this.answerBoxes = document.querySelectorAll('.answersbox div');
        this.counter = 0
        this.answerInput = ""
        this.inputIndex;
        this.scoresLabels = document.querySelectorAll('.scoreslabel');
        this.urls =  [
            'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple',
            'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple',
            'https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple'];
        this.questions;
    }

    questionSetter() {
        ((this.game).questionBox).innerHTML = (this.questions).results[(this.game).counter].question;
    }

    answerSetter() {
        let randomNumber = Math.floor(Math.random()*4);
        (this.game).answerBoxes[randomNumber].innerHTML = (this.questions).results[(this.game).counter].correct_answer;

        let i = 0;
        (this.game).answerBoxes.forEach(item => {
        if (item !== (this.game).answerBoxes[randomNumber]) {
            item.innerHTML = (this.questions).results[(this.game).counter].incorrect_answers[i];
            i++;
            }
        })
    }

    clickSetter() {
        ((this.game).answerBoxes).forEach(item => {
            item.addEventListener("click", () => {
                (this.game).answerInput = event.target.innerHTML;
                (this.game).inputIndex = event.target;
                ((this.game).answerBoxes).forEach(item => {
                    item.classList = "";
                })
                event.target.classList.add('selectedstyle');
            })
        })
    }

    buildQuiz() {
        this.questionSetter();
        this.answerSetter();
        this.clickSetter();
    }
}

let submitButton = document.querySelector('.submit');
let game = new newGame();
game.questionGetter();

const nextQuestion = () => {
    (game.game).answerInput = "";
    (game.game).inputIndex = undefined;
    (game.game).answerBoxes.forEach(item => {
        item.classList = "";
    })
    game.buildQuiz();
}

const loseReset = () => {
    (game.game).answerInput = "";
    (game.game).inputIndex = undefined;
    (game.game).counter = 0;
    (game.game).answerBoxes.forEach(item => {
        item.classList = "";
    });
    (game.game).scoresLabels.forEach(item => item.classList = "");
    game.questionGetter();
}  


const answerChecker = () => {
    if ((game.game).answerInput === (game.questions).results[(game.game).counter].correct_answer) {
        (game.game).inputIndex.classList.add("correctanswer");
        (game.game).scoresLabels[(game.game).counter].classList.add("scorestyle");
        (game.game).counter++;
        setTimeout(nextQuestion, 3000);
    } else {
        (game.game).inputIndex.classList.add("incorrectanswer");
        setTimeout(loseReset, 3000);
    }
}

submitButton.addEventListener("click", () => {
    answerChecker();
})

class Questions {
    constructor() {
        this.questions = this.questionGetter();
    }

    questionGetter() {
        Promise.all(((this.questionsFetch).urls).map(url =>
            fetch(url)
              .then(res => res.json())
          ))
          .then(data => {
            this.questions = {'results': []};
            data.forEach(item => {
                item['results'].forEach(obj => {
                    (this.questions).results.push(obj);
                })
            });
          })
          .then(() => this.buildQuiz())
          .then(() => console.log(this.questions))
    }
}