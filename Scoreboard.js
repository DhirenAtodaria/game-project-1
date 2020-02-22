class Scoreboard {
    constructor(scoreBoard) {
        this.scoresLabels = scoreBoard;
        this.scores = this.scoreEnumeration();
    }

    scoreEnumeration() {
        let scores = []
        this.scoresLabels.forEach(item => scores.push(item.innerHTML));
        console.log(scores);
        return scores;
    }
}

export default Scoreboard;