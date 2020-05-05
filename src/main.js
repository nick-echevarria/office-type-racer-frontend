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
// D E C L A R A T I O N S 
let wordCount
let characterSpan
let form = document.querySelector(".form")



document.addEventListener("DOMContentLoaded", () => {
  //Main function
  getQuotes();
  toggleLogInForm()                                                 //Add logic to have username form pop when users reaches bottom of window
  formSetup()                                                       // Set up submit form for username 

  // Red and Green Validation 

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
  // START AND STOP CLOCK 

  wordInput.addEventListener('click', event =>{
    if(username == null){
      alert('Create Username')
    }else{
      stopwatch()
    }
  })                    // Start Timer
  wordInput.addEventListener('keypress', event => {                 // Stops Timer 
    if (event.keyCode == 13) {
      stop()                                                        // Stops time and shows WPM... find a place to put it
    }
  })

 

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
        console.log(data)
        usernameDisplay.innerText = data.username
        usernameDisplay.dataset.id = data.id
      })
      .catch(function(error){
          console.log(error.message)
      }) 
    })
  }

  // function buttonSetup() {

  // }

  // function startGame() {

  // }

  // function logGame() { 
  //      fetch(get username from last object)

  // }

  // J O H N S O N 

  // ACCESSING DATABASE 
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
  let timer = 0
  let clock
  function stopwatch() {
    clock = setInterval(function () {
      timer += 1
      seconds.innerText = timer
    }, 1000)
  }
  function stop() {
    clearInterval(clock)                                        // STOPS the timer
    wpm()                                                       // When timer stops, do WPM logic
  }
  // WPM LOGIC 

  function wpm() {
    let wpm = (wordCount / timer) * 60
    scoreDisplay.innerText = Math.round(wpm)
  }

})


