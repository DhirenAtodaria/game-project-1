import Game from "./Game.js"

let startButton = document.querySelector('.myButton')
let questionBox = document.querySelector('.messagearea');
let answerBoxes = document.querySelectorAll('.answersbox div');
let submitButton = document.querySelector('.submit');
let scoresLabels = document.querySelectorAll('.scoreslabel');
let timeBox = document.getElementById('progressbar1');
let playAgain = document.querySelector('.play_again');
let fifty50Button = document.querySelector('.fifty50');
let pafButton = document.querySelector('.paf');
let takeMoneyButton = document.querySelector('.Takemoney');
let firstTimeline = gsap.timeline();

let newGame = new Game(questionBox, answerBoxes, submitButton, scoresLabels, timeBox, playAgain, takeMoneyButton, scoresLabels, fifty50Button, pafButton);


// let afterWelcomeCompletion = () => {
//     new TypeIt(".welcomemessage", {speed: 50, waitUntilVisible:true})
//     .type('Welcome to Who wants to be a Munnyaire.')
//     .pause(1000)
//     .delete()
//     .pause(1000)
//     .type('This is the game where if you answer 15 questions correctly... ')
//     .pause(1000)
//     .type('You become $$$RICH$$$')
//     .pause(1000)
//     .delete()
//     .type('For the first 5 questions you have a 30sec timer. Click begin to start the game')
//     .exec(() => {
//         gsap.to('.myButton', {duration: 1, opacity: 1});
//     })
//     .go()
// }

// gsap.to(".monopolyhead", {duration: 2, x: "100%", ease: "bounce", onComplete: afterWelcomeCompletion})

// startButton.addEventListener("click", () => {
//     newGame.questionGetter();
//     firstTimeline.to(".monopolyhead", {duration: 1, opacity: 0, display: "none"}, 1)
//     .addLabel("opening")
//     .to(".tophalf", {duration: 1, height: "0"}, "opening")
//     .to(".lowerhalf", {duration: 1, height:"0"}, "opening")
//     .to(".monopolyquestionhead", {duration: 2, opacity: 1}, 4);
// })

newGame.questionGetter();




