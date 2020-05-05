document.addEventListener("DOMContentLoaded", init)

// Globals 

let currentUsername // keep in mind when this variable is set and make sure it isn't NULL
const headers = {
  "Content/Type" : "application/json",
  "accept" : "application/json"
}
const usersUrl = "https://127.0.0.1:3000/users"

// DOM Elements

const form = document.querySelector(".form")
const quoteInput = document.querySelector('#quote-input');
const currentQuote = document.querySelector('#current-quote');

function init() { 
    revealLogInForm() // Add logic to have username form pop when users reaches bottom of window
    formSetup() // Set up submit form for username 
    buttonSetup() // Self-explanatory
    startGame() // Timer/Load quotes
    logGame() // Saving stats (username/completion time/score) + play again? 
}

function revealLogInForm() {
  const form = document.querySelector(".form")
  if (form.style.display === "none") { 
    form.style.display = "block"
  } else if (form.style.display === "block") { 
    form.style.display = "none"
  }
}

function formSetup() {
  form.addEventListener("submit", (e) => { 
    event.preventDefault(); 
    fetch(usersUrl, {
      method: "POST", 
      headers, 
      body: JSON.stringify({username: e.target.input.value})
    })
    .then(resp => resp)
    .then(data => console.log(data)) //Save data value to username global  
  })
}

function buttonSetup() {

}

function startGame() {

}

function logGame() { 

}