class Scoreboard {
    constructor(scoreBoard) {
        this.scoresLabels = scoreBoard;
        this.scores = this.scoreEnumeration();
    }

    scoreEnumeration() {
        let scores = []
        this.scoresLabels.forEach(item => scores.push(item.dataset.value));
        console.log(scores);
        return scores;
    }
}

export default Scoreboard;