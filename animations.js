import * as myModule from "./main.js"

let startButton = document.querySelector('.myButton')

let firstTimeline = gsap.timeline();

let afterWelcomeCompletion = () => {
    new TypeIt(".welcomemessage", {speed: 50, waitUntilVisible:true})
    .type('Welcome to Who wants to be a Munnyaire.')
    .pause(1000)
    .delete()
    .pause(1000)
    .type('This is the game where if you answer 15 questions correctly... ')
    .pause(1000)
    .type('You become $$$RICH$$$')
    .pause(1000)
    .delete()
    .type('For the first 5 questions you have a 30sec timer. Click begin to start the game')
    .exec(() => {
        gsap.to('.myButton', {duration: 1, opacity: 1});
    })
    .go()
}

gsap.to(".monopolyhead", {duration: 2, x: "100%", ease: "bounce", onComplete: afterWelcomeCompletion})

startButton.addEventListener("click", () => {
    myModule.newGame.questionGetter();
    firstTimeline.to(".monopolyhead", {duration: 1, opacity: 0, display: "none"}, 1)
    .addLabel("opening")
    .to(".tophalf", {duration: 1, height: "0"}, "opening")
    .to(".lowerhalf", {duration: 1, height:"0"}, "opening")
    .to(".monopolyquestionhead", {duration: 2, opacity: 1}, 4);
})





