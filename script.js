// Темная тема
document.getElementById('toggleTheme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Прокрутка к квизу
document.querySelector("#startQuiz").addEventListener("click", () => {
  document.querySelector("#quiz").scrollIntoView({
    behavior: "smooth"
  });
});

// Прокрутка к ссылкам
document.querySelector("#external").addEventListener("click", () => {
  document.querySelector("#external-links").scrollIntoView({
    behavior: "smooth"
  });
});


// Квиз: данные
const quizData = [
  {
    image: "img/question1.jpg",
    question: "What is the maximum speed allowed on Dutch cycle paths?",
    options: ["25 km/h", "32 km/h", "No speed limit"],
    answer: "25 km/h"
  },
  {
    image: "img/question2.jpg",
    question: "What does a blue circular sign with a bicycle mean?",
    options: ["No cycling", "Mandatory cycling path", "Cyclists beware"],
    answer: "Mandatory cycling path"
  },
  {
    image: "img/question3.jpg",
    question: "Are you allowed to use your phone while cycling?",
    options: ["Yes", "Only with a hands-free set", "No"],
    answer: "No"
  }
];

let currentQuestion = 0;
let score = 0;

// Отрисовка вопроса
function loadQuestion() {
  const q = quizData[currentQuestion];
  const quizContainer = document.getElementById("quiz");

  quizContainer.innerHTML = `
    <div class="quiz card">
      <img src="${q.image}">
      <h2>Question ${currentQuestion + 1} of ${quizData.length}</h2>
      <h3>${q.question}</h3>
      ${q.options.map(option => `
        <button class="option-button">${option}</button>
      `).join("")}
    </div>
  `;

  document.querySelectorAll(".option-button").forEach(button => {
    button.addEventListener("click", () => {
      quizContainer.classList.add("fade-out");
      setTimeout(() => {
        selectAnswer(button.textContent);
        quizContainer.classList.remove("fade-out");
      }, 300);
    });
  });
}

// Логика выбора ответа
function selectAnswer(selected) {
  const correct = quizData[currentQuestion].answer;
  if (selected === correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Финальный экран
function showResult() {
  document.getElementById("quiz").innerHTML = `
    <div class="quiz card">
      <h2>Quiz completed!</h2>
      <p>You got ${score} out of ${quizData.length} correct.</p>
    </div>
  `;
}

// Первый запуск
loadQuestion();