let questionBox = document.querySelector('.questionbox');
let answerBoxes = document.querySelectorAll('.answersbox div');
let submitButton = document.querySelector('.submit');
let scoresLabels = document.querySelectorAll('.scoreslabel');
const urls = [
    'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple',
    'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple',
    'https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple'];
let questions = {'results': []};
let counter = 0;

const questionGetter = () => {
    Promise.all(urls.map(url =>
        fetch(url)
          .then(res => res.json())
      ))
      .then(data => {
        questions = {'results': []};
        data.forEach(item => {
            item['results'].forEach(obj => {
                questions.results.push(obj);
            })
        });
      })
      .then(() => buildQuiz())
      .then(() => console.log(questions))
}



const questionSetter = () => {
    questionBox.innerHTML = questions.results[counter].question;
}

const answerSetter = () => {
    let randomNumber = Math.floor(Math.random()*4);
    answerBoxes[randomNumber].innerHTML = questions.results[counter].correct_answer;

    let i = 0;
    answerBoxes.forEach(item => {
        if (item !== answerBoxes[randomNumber]) {
            item.innerHTML = questions.results[counter].incorrect_answers[i];
            i++;
        }
    })
}

let answerInput = ""
let inputIndex;
const clickSetter = () => {
    answerBoxes.forEach(item => {
        item.addEventListener("click", () => {
            answerInput = event.target.innerHTML;
            inputIndex = event.target;
            answerBoxes.forEach(item => {
                item.classList = "";
            })
            event.target.classList.add('selectedstyle');
        })
    })
}

const nextQuestion = () => {
    answerInput = "";
    inputIndex = undefined;
    answerBoxes.forEach(item => {
        item.classList = "";
    })
    buildQuiz();
}

const loseReset = () => {
    answerInput = "";
    inputIndex = undefined;
    counter = 0;
    answerBoxes.forEach(item => {
        item.classList = "";
    })
    scoresLabels.forEach(item => {
        item.classList = "";
    })
    questionGetter();
}

const answerChecker = () => {
    if (answerInput === questions.results[counter].correct_answer) {
        inputIndex.classList.add("correctanswer");
        scoresLabels[counter].classList.add("scorestyle");
        counter++;
        setTimeout(nextQuestion, 3000);
    } else {
        inputIndex.classList.add("incorrectanswer");
        setTimeout(loseReset, 3000);
    }
}

submitButton.addEventListener("click", () => {
    answerChecker();
})

const buildQuiz = () => {
    questionSetter();
    answerSetter();
    clickSetter();
}

questionGetter();
setTimeout(buildQuiz, 2000);