class Scoreboard {
    constructor() {
        this.scoresLabels = document.querySelectorAll('.scoreslabel');
        this.scoreBoard = [];
    }

    scoreEnumeration() {
        this.scoresLabels.forEach(item => this.scoreBoard.push(item.innerHTML));
    }
}

export default Scoreboard;