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
let replayButton = document.querySelector('#replay')
let countdownElement = document.querySelector('#countdown')

// D E C L A R A T I O N S 
let wordCount
let characterSpan
let timer = 0
let clock
let quote
wordInput.disabled = true


document.addEventListener("DOMContentLoaded", () => {
  //Main function
  getQuotes();
  toggleLogInForm()                                                 //Add logic to have username form pop when users reaches bottom of window
  formSetup()                                                       // Set up submit form for username 

  // I N P U T  V A L I D A T I O N
  wordInput.addEventListener('input', () => {
    const arrayQuote = currentWord.querySelectorAll('span')
    const arrayValue = wordInput.value.split('')
    let lastLetter = currentWord.lastChild
    lastLetter.dataset.last = true
    arrayQuote.forEach((characterSpan, index) => {
      let letter = arrayValue[index]
      if (letter == null) {                                     // If they haven't typed anything out yet 
        characterSpan.classList.remove('correct')               // Don't color the text at all
        characterSpan.classList.remove('incorrect')
      } else if (letter === characterSpan.innerText) {          // If what they type out is correct
        characterSpan.classList.add('correct')                  // make it green 
        characterSpan.classList.remove('incorrect')
        if(characterSpan == lastLetter){
          stop()                                                // T I M E R   S T O P  
        }
      } else {
        characterSpan.classList.remove('correct')               // if what they type is incorrect
        characterSpan.classList.add('incorrect')                // make it red
      }
    })
  });
 

 // P O S T  R O U N D S
  function logGame() { 
    fetch(roundsUrl, {
        method: "POST", 
        headers, 
        body: JSON.stringify({
            user_id: parseInt(currentUsername.dataset.id),
            quote_id: parseInt(currentWord.dataset.id), 
            score: parseInt(scoreDisplay.textContent), 
            completion_time: parseInt(timeDisplay.textContent),
            user: {id:parseInt(currentUsername.dataset.id), username: currentUsername.innerText},
            quote: {id:parseInt(currentWord.dataset.id), quote: quote}

        })
    })
  }

  function toggleLogInForm() {
    let form = document.querySelector(".form")
    form.style.display = "block"
  }
  // C R E A T E   U S E R N A M E
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
        usernameDisplay.innerText = ` ${data.username}!`              // USERNAME LOCATION
        usernameDisplay.dataset.id = data.id                          // USERNAME ID LOCATION
        countdown()
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
    const randIndex = Math.floor(Math.random() * array.length);   //random INDEX to randomly choose quote from json array
    let pick = array[randIndex] 
    quote = pick.quote
    wordCount = quote.split(' ').length                           // Integer that represents number of words in a string 

    quote.split('').forEach(character => {
      characterSpan = document.createElement('span')          // create span tag for each letter
      characterSpan.innerText = character                     // append letter to span 
      currentWord.appendChild(characterSpan)                  // append entire element to div
      currentWord.dataset.id = pick.id                        // quote ID location
    })
    wordInput.value = null
    console.log(quote)
    console.log(wordCount)
  }

  // T I M E R 
  function stopwatch() {                                      // TIMER LOGIC 
    clock = setInterval(function () {
      timer += 1
      seconds.innerText = timer
    }, 1000)
  }

  function stop() {
    clearInterval(clock)                                        // STOPS the timer
    wpm()                                                       // When timer stops, do WPM logic
    logGame()                                                   // POST to ROUNDS API
  }

  // W P M  L O G I C  
  function wpm() {                                               // Word Count divided by Timer value
    let wpm = (wordCount / timer) * 60
    scoreDisplay.innerText = Math.round(wpm)
  }

    // P R E - G A M E  C O U N T D O W N
    function countdown(){   
        let cdTimer = 5                                      // Called when user is created
        const cd = setInterval(function() {                             // decrement by 1 
        cdTimer -= 1
        countdownElement.innerText = cdTimer   
        if (cdTimer === 0) { 
            wordInput.disabled = false
            clearInterval(cd)
            stopwatch()
        }                   // append to DOM
    }, 1000)
    }

})




