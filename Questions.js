class Questions {
    constructor() {
        this.urls =  [
            'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple',
            'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple',
            'https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple'];
        this.questions;
        
    }

    questionGetter() {
        Promise.all((this.urls).map(url =>
            fetch(url)
              .then(res => res.json())
          ))
          .then(data => {
            this.questions = {'results': []};
            data.forEach(item => {
                item['results'].forEach(obj => {
                    (this.questions).results.push(obj);
                })
            });
          })
          .then(() => console.log(questions))
    }
}