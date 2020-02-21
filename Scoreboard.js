class Scoreboard {
    constructor(scoreBoard) {
        this.scoresLabels = scoreBoard;
        this.scoreBoard = [];
    }

    scoreEnumeration() {
        this.scoresLabels.forEach(item => this.scoreBoard.push(item.innerHTML));
    }
}

export default Scoreboard;