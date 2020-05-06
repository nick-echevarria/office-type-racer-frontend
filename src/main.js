// G L O B A L S 
headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}
const usersUrl = "http://127.0.0.1:3000/users"
const quotesUrl = "http://127.0.0.1:3000/quotes"
const roundsUrl = "http://127.0.0.1:3000/rounds"

// D O M   E L E M E N T S
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');              // Score
const timeDisplay = document.querySelector('#time');                // Time
const message = document.querySelector('#message');                 // Message *May Delete
const seconds = document.querySelector('#time');
const usernameDisplay = document.querySelector('#username')
let form = document.querySelector(".form")
let currentUsername = document.querySelector(".text-success")

// D E C L A R A T I O N S 
let wordCount
let characterSpan
let timer = 0
let clock

document.addEventListener("DOMContentLoaded", () => {
  //Main function
  getQuotes();
  toggleLogInForm()                                                 //Add logic to have username form pop when users reaches bottom of window
  formSetup()                                                       // Set up submit form for username 

  // I N P U T  V A L I D A T I O N
  wordInput.addEventListener('input', () => {
    const arrayQuote = currentWord.querySelectorAll('span')
    const arrayValue = wordInput.value.split('')

    arrayQuote.forEach((characterSpan, index) => {
      let letter = arrayValue[index]
      if (letter == null) {                                     // If they haven't typed anything out yet 
        characterSpan.classList.remove('correct')               // Don't color the text at all
        characterSpan.classList.remove('incorrect')
      } else if (letter === characterSpan.innerText) {          // If what they type out is correct
        characterSpan.classList.add('correct')                  // make it green 
        characterSpan.classList.remove('incorrect')
      } else {
        characterSpan.classList.remove('correct')               // if what they type is incorrect
        characterSpan.classList.add('incorrect')                // make it red
      }
    })
  });

  // S T A R T / S T O P  G A M E  C L O C K 
  wordInput.addEventListener('click', event =>{
    if(currentUsername.innerText === '...'){
      alert('Create Username')
    }else{
      stopwatch()
    }
  })

  // T I M E R  S T A R T 
  wordInput.addEventListener('keypress', event => {                 // Stops Timer 
    if (event.keyCode == 13) {
      stop()                                                        // Stops time and shows WPM... find a place to put it
    }
  }) 

 // P O S T  R O U N D S
  function logGame() { 
    fetch(roundsUrl, {
        method: "POST", 
        headers, 
        body: JSON.stringify({
            user_id: parseInt(currentUsername.dataset.id),
            quote_id: parseInt(currentWord.dataset.id), 
            score: parseInt(scoreDisplay.textContent), 
            completion_time: parseInt(timeDisplay.textContent)
        })
    })
  }

  function toggleLogInForm() {
    let form = document.querySelector(".form")
    form.style.display = "block"
  }
  
  function formSetup() {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = form.querySelector("#login-field").value
      console.log(username)

      fetch(usersUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          username: username 
        })
      })
      .then(resp => resp.json())
      .then(data => {
        usernameDisplay.innerText = ` ${data.username}!`
        usernameDisplay.dataset.id = data.id
      })
      .catch(function(error){
          console.log(error.message)
      }) 
    })
  }

  // G E T  A L L  Q U O T E S
  function getQuotes() {
    fetch(quotesUrl)
      .then(resp => resp.json())
      .then(json => {
        getQuoteToDom(json);
      })
  }  

  async function getQuoteToDom(array) {                           // APPEND QUOTE TO DOM 
    const randIndex = Math.floor(Math.random() * array.length); //random INDEX to randomly choose quote from json array
    let pick = array[randIndex] 
    let quote = pick.quote
    wordCount = quote.split(' ').length                         // Integer that represents number of words in a string 

    quote.split('').forEach(character => {
      characterSpan = document.createElement('span')          // create span tag for each letter
      characterSpan.innerText = character                     // append letter to span 
      currentWord.appendChild(characterSpan)                  // append entire element to div
      currentWord.dataset.id = pick.id
    })
    wordInput.value = null
    console.log(quote)
    console.log(wordCount)
  }

  // T I M E R 
  function stopwatch() {
    clock = setInterval(function () {
      timer += 1
      seconds.innerText = timer
    }, 1000)
  }

  function stop() {
    clearInterval(clock)                                        // STOPS the timer
    wpm()       
    logGame()                                                // When timer stops, do WPM logic
  }

  // WPM LOGIC 
  function wpm() {
    let wpm = (wordCount / timer) * 60
    scoreDisplay.innerText = Math.round(wpm)
  }

})


