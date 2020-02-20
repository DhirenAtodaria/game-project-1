import Question from "./Question.js"

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

export default Game;


