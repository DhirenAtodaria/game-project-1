let questions = 
{"results": [
    {
        "category": "Entertainment: Film",
        "type": "multiple",
        "difficulty": "easy",
        "question": "Which of the following movies was not based on a novel by Stephen King? ",
        "correct_answer": "The Thing",
        "incorrect_answers": [
        "Carrie",
        "Misery",
        "The Green Mile"
    ]
    },
    {
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Which of the following Elite Four members from the 6th Generation of Pok&eacute;mon was a member of Team Flare?",
    "correct_answer": "Malva",
    "incorrect_answers": [
    "Siebold",
    "Wikstrom",
    "Drasna"
    ]
    }]
}

let questionBox = document.querySelector('.questionbox');
let answerBoxes = document.querySelectorAll('.answersbox div');
let submitButton = document.querySelector('.submit');
let counter = 0;

const questionSetter = () => {
    questionBox.innerHTML = questions.results[counter].question;
}

const answerSetter = () => {
    let randomNumber = Math.floor(Math.random()*4);
    answerBoxes[randomNumber].innerHTML = questions.results[counter].correct_answer;
    console.log(randomNumber);

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

const buildQuiz = () => {
    questionSetter();
    answerSetter();
    clickSetter();
    
    submitButton.addEventListener("click", () => {
        if (answerInput === questions.results[counter].correct_answer) {
            inputIndex.classList = "correctanswer";
            counter++
            setTimeout(nextQuestion, 3000);
        } else {
            inputIndex.classList = "incorrectanswer";
        }
    })
}

buildQuiz()
