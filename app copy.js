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