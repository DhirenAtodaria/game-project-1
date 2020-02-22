import * as myModule from "./main.js"

let afterWelcomeCompletion = () => {
    new TypeIt(".welcomemessage", {speed: 100, waitUntilVisible:true})
    .type('Welcome to Who wants to be a Munnyaire.')
    .pause(1000)
    .delete(40)
    .pause(1000)
    .type('This is the game where if you answer 15 questions correctly... ')
    .pause(1000)
    .type('You become $$$RICH$$$')
    .pause(1000)
    .delete(84)
    .type('For the first 5 questions you have a 30sec timer. Click start to begin the game')
    .go()
}

let startButton = document.querySelector('.myButton')
let firstTimeline = gsap.timeline();

gsap.to(".monopolyhead", {duration: 2, x: "50%", ease: "bounce", onComplete: afterWelcomeCompletion})

startButton.addEventListener("click", () => {
    myModule.newGame.questionGetter();
    firstTimeline.to(".monopolyhead", {duration: 1, opacity: 0, display: "none"}, 1)
    .addLabel("opening")
    .to(".tophalf", {duration: 1, height: "0"}, "opening")
    .to(".lowerhalf", {duration: 1, height:"0"}, "opening");
})



// afterString: function(step, queue, instance) {
//     instance.pause(1000).empty();
//   },





