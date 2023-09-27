import Question from "./Question.js";
import Quiz from "./Quiz.js";

const App = (() => {
  const quizElement = document.querySelector('.quiz');
  const quizQuestionElement = document.querySelector('.question');
  const trackerElement = document.querySelector('.tracker');
  const taglineElement = document.querySelector('.tagline');
  const choicesElements = document.querySelector('.choices');
  const progressInnerElement = document.querySelector('.progress-inner');
  const nextButtonElement = document.querySelector('.next');
  const restartButtonElement = document.querySelector('.restart'); 

  const q1 = new Question(
    "Which one of this is white?",
   ['Coffee', 'Milk', 'Tea', 'Pepsi'],
    1);
  const q2 = new Question(
    "What's 2 + 2?",
    ['4', '6', '8', '10'],
    0);
  const q3 = new Question(
    "When was JavaScript created?",
    ['June 1995', 'May 1995', 'July 1885', 'Sep 1996'],
    1);

  const quiz = new Quiz([q1, q2, q3]);
  
  const renderQuestion = () => {
    const question = quiz.getCurrentQuestion().question;
    quizQuestionElement.textContent = question;
  }

  const renderChoices = () => {
    const choices = quiz.getCurrentQuestion().choices;
    choices.forEach((choice, index) => {
      choicesElements.innerHTML += `
      <li class="choice">
        <input type="radio" name="choice" class="input" id="choice${index}">
        <label for="choice${index}" class="label">
          <i></i>
          ${choice}
        </label>
      </li>
      `
    });
  }

  const renderTracker = () => {
    trackerElement.textContent = `${quiz.currentIndex + 1} of ${quiz.questions.length}`;
  }

  const renderAll = () => {
    if(quiz.hasEnded()) {

    } else {
      renderQuestion();
      renderChoices();
      renderTracker();
    }
  }
  return {
    render: renderAll
  }
  
})();

App.render();
