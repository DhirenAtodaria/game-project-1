// store urls to fetch in an array
const urls = [
    'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple',
    'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple',
    'https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple'
  ];

let questions = {'results': []};
let empty = [];
  
  // use map() to perform a fetch and handle the response for each url
  Promise.all(urls.map(url =>
    fetch(url)
      .then(res => res.json())
  ))
  .then(data => {
    data.forEach(item => {
        item['results'].forEach(obj => {
            questions.results.push(obj);
        })
    });
  })
  .then(() => console.log(questions))


  