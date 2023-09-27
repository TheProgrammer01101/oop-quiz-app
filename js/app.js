import Question from "./Question.js";
import Quiz from "./Quiz.js";

const App = (() => {
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
  
  nextButtonElement.addEventListener('click', ()=> {
    try {
      const checkedInputIndex = document.querySelector('input:checked').dataset.index;
      quiz.guess(checkedInputIndex);
      renderAll();
    }
    catch {
      
    }
  });

  restartButtonElement.addEventListener('click', ()=> {
    quiz.reset();
    nextButtonElement.style.opacity = '1';
    taglineElement.textContent = 'Pick an option below!';
    renderAll();
  })

  const renderQuestion = () => {
    const question = quiz.getCurrentQuestion().question;
    quizQuestionElement.textContent = question;
  }

  const renderChoices = () => {
    const choices = quiz.getCurrentQuestion().choices;
    let markup = ''
    choices.forEach((choice, index) => {
      markup += `
      <li class="choice">
        <input type="radio" name="choice" class="input" data-index=${index} id="choice${index}">
        <label for="choice${index}" class="label">
          <i></i>
          ${choice}
        </label>
      </li>
      `
    });
    choicesElements.innerHTML = markup;
  }

  const renderTracker = () => {
    trackerElement.textContent = `${quiz.currentIndex + 1} of ${quiz.questions.length}`;
  }

  const renderProgress = () => {
    const progress = Math.round((quiz.currentIndex / quiz.questions.length) * 100);
    progressInnerElement.style.width = `${progress}%`;
  }

  const renderEndScreen = () => {
    renderProgress();
    const scorePercentage = Math.round((quiz.score / quiz.questions.length) * 100);
    taglineElement.textContent = 'Complete!'
    trackerElement.textContent = `Your score: ${scorePercentage}%`;
    nextButtonElement.style.opacity = '0';
  }

  const renderAll = () => {
    if(quiz.hasEnded()) {
      renderEndScreen();
    } else {
      renderQuestion();
      renderChoices();
      renderTracker();
      renderProgress();
    }
  }
  return {
    render: renderAll
  }
  
})();

App.render();
