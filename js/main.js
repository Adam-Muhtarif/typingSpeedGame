// Get Elements
let levelElement = document.querySelector(".level");
let secondsElement = document.querySelector(".seconds");
let randomWordElement = document.querySelector(".random-word");
let inputElement = document.querySelector(".typing-area");
let upComingWordsElement = document.querySelector(".up-comingWords");
let timeLeft = document.querySelector(".time span");
let score = document.querySelector(".score");
let scoreGoal = document.querySelector(".goal");
let start = document.querySelector(".start");
let reloadBtn = document.querySelector(".reload");
let audio = document.getElementById("success");

// Disable Paste Event On inputElement
inputElement.onpaste = function () {
  return false;
};

// Reload Button
reloadBtn.addEventListener("click", () => {
  location.reload();
});

// Levels Object
const levels = {
  Easy: {
    seconds: 15,
    words: [
      "program",
      "adam",
      "ahmed",
      "hero",
      "css",
      "html",
      "php",
      "car",
      "cat",
      "wash",
      "hair",
      "hat",
      "box",
      "hand",
      "fan"
    ],
  },
  Normal: {
    seconds: 10,
    words: [
      "congrats",
      "process",
      "success",
      "academia",
      "cohort",
      "bottle",
      "clothes",
      "university",
      "charger",
      "advertise",
      "gloom",
      "thrill",
    ],
  },
  Hard: {
    seconds: 5,
    words: [
      "beautiful",
      "delicious",
      "happiness",
      "wonderland",
      "adventurous",
      "youthfully",
      "breathless",
      "unbeliever",
      "beneficial",
    ],
  },
};

// Default level Settings
let selectedLevel = localStorage.level || "Normal";
levelElement.value = localStorage.level || "Normal";
let selectedSeconds = levels[selectedLevel].seconds;
let wordsArray = levels[selectedLevel].words;
setLevelSettings();

// On Select Level
levelElement.addEventListener("input", () => {
  localStorage.level = levelElement.value;
  selectedLevel = localStorage.level;
  selectedSeconds = levels[selectedLevel].seconds;
  wordsArray = levels[selectedLevel].words;
  setLevelSettings();
  location.reload();
});

// Click On Start Game
start.addEventListener("click", () => {
  start.remove();
  inputElement.attributes.removeNamedItem("disabled");
  inputElement.focus();
  randomWordElement.classList.add("show");

  generateRandomWord();
});

// !======================= Functions =======================

// Set levelBox Settings Function
// =================================================
function setLevelSettings() {
  secondsElement.innerHTML = selectedSeconds;
  timeLeft.innerHTML = selectedSeconds;
  scoreGoal.innerHTML = levels[selectedLevel].words.length;
}
// =================================================

// Generate Random Word Function
// =================================================
function generateRandomWord() {
  if (wordsArray.length > 0) {
    let randomWordIndex = Math.floor(wordsArray.length * Math.random());
    randomWordElement.innerHTML = wordsArray[randomWordIndex];
    inputElement.placeholder = randomWordElement.textContent;
    upComing();
    checkWord();
  } else {
    randomWordElement.innerHTML = "Congrats You Win The Game";
    inputElement.value = "";
    inputElement.placeholder = "";
  }
}
// =================================================

// UpComing Words
// =================================================
function upComing() {
  upComingWordsElement.innerHTML = "";

  // Delete Random Word From Array Of Words
  wordsArray.forEach((word, i, arr) => {
    if (word == randomWordElement.textContent) {
      arr.splice(i, 1);
    }
  });

  // Add Rest Of Word In Up Coming Words
  wordsArray.forEach((word) => {
    let div = document.createElement("div");
    div.innerHTML = word;
    upComingWordsElement.appendChild(div);
  });

  if (wordsArray.length != 0) {
    upComingWordsElement.classList.add("show");
  }
}
// =================================================

// Check Word And Timer
function checkWord() {
  timeLeft.innerHTML = selectedSeconds;

  let counter = setInterval(() => {
    timeLeft.textContent--;
    if (timeLeft.textContent == 0) {
      clearInterval(counter);
      inputElement.setAttribute("disabled", "");
      inputElement.value = "Time Finished";
      inputElement.style.cssText = `
      color: red;
      font-weight: bold;
      `;
    }

    // Check If Word Is Correct
    if (inputElement.value.trim() == randomWordElement.textContent) {
      clearInterval(counter);
      score.textContent++;
      inputElement.value = "";
      upComingWordsElement.classList.remove("show");
      if (wordsArray.length == 0) {
        audio.play();
        startConfetti();
        setTimeout(() => {
          stopConfetti();
        }, 1500);
      }

      generateRandomWord();
    }
  }, 1000);
}
// =================================================
