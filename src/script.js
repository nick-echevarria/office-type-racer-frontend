window.addEventListener('load', init);

// window.scroll(function() {
//   if(window.scrollTop() + window.height() == document.height()) {
//     revealLogInForm();
//   }
// });

// Globals

const headers = {
  "Content/Type" : "application/json",
  "accept" : "application/json"
  }

// Available Levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 1
};

// To change level
const currentLevel = levels.medium;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

// Initialize Game
function init() {
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
    // Load word from array
    showWord(words);
    // Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
    setInterval(revealLogInForm, 3000) // NICK
    setInterval(listenForUsername, 3500) // NICK
}

// Start match
function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }

    // If score is -1, display 0
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}

// Match currentWord to wordInput
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

// Pick & show random word
function showWord(words) {
    // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.innerHTML = words[randIndex];
}

const words = ["seven", "eight"]

// Countdown timer
function countdown() {
    // Make sure time is not run out
    if (time > 0) {
        // Decrement
        time--;
    } else if (time === 0) {
        // Game is over
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!!!';
        score = -1;
    }
}

function listenForUsername() {
    const form = document.querySelector(".form")
    form.addEventListener("submit", (e) => {
        event.preventDefault();
        fetch("https://127.0.0.1:3000/users", {
            method: "POST",
            headers,
            body: JSON.stringify({ username: e.target.input.value })
        })
            .then(resp => resp)
            .then(data => console.log(data)) //Save data value to username global  
    })
}

function revealLogInForm() {
  const form = document.querySelector(".form")
  form.style.display = "block"
  // if (form.style.display === "none") { 
  //   form.style.display = "block"    
  // } else if (form.style.display === "block") { 
  //   form.style.display = "none"
  // }
}

// function getDocHeight() {
//   var d = document;
//   return Math.max(
//       d.body.scrollHeight, d.documentElement.scrollHeight,
//       d.body.offsetHeight, d.documentElement.offsetHeight,
//       d.body.clientHeight, d.documentElement.clientHeight
//   );
// }

    

