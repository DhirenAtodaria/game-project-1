// // store urls to fetch in an array
// class Game {
//   constructor() {
//       this.questionBox = document.querySelector('.questionbox');
//       this.answerBoxes = document.querySelectorAll('.answersbox div');
//       this.counter = 0
//       this.answerInput = ""
//       this.inputIndex;
//       this.scoresLabels = document.querySelectorAll('.scoreslabel');
//       this.currentScore;
//       this.timeBox = document.querySelector('.timer');
//       this.urls =  [
//         'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple',
//         'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple',
//         'https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple'];
      
//   }
// }

class Question {
  constructor(question, correct_answer, incorrect_answers) {
      this.question = question,
      this.correct_answer= correct_answer,
      this.incorrect_answers = incorrect_answers
  }

  questionSetter(game) {
      game.questionBox.innerHTML = this.question;
  }
}

let urls =['https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple',
          'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple',
          'https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple'];


let questions;
const questionGetter = () => {
  Promise.all((urls).map(url =>
      fetch(url)
          .then(res => res.json())
      ))
      .then(
        data => {
          questions = [];
          data.forEach(item => {
            item['results'].forEach(question => {questions.push(new Question(question.question, question.correct_answer, question.incorrect_answers))});
          }
          )
        }
      )
      .then(() => console.log(questions))
      .then(() => {
          // startTimer();
          buildQuiz();
      })
};

questionGetter();


