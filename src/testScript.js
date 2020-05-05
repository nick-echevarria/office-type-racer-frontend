document.addEventListener("DOMContentLoaded", event => {
    getQuotes()

    wordInput.addEventListener('input', () => { 
        const arrayQuote = currentWord.querySelectorAll('span')
        const arrayValue = wordInput.value.split('')
        arrayQuote.forEach((characterSpan,index)=> {
            let letter = arrayValue[index]
            if (letter == null){                                    // If they haven't typed anything out yet 
                characterSpan.classList.remove('correct')           // Don't color the text at all
                characterSpan.classList.remove('incorrect')
            }else if (letter === characterSpan.innerText){          // If what they type out is correct
                characterSpan.classList.add('correct')              // make it green 
                characterSpan.classList.remove('incorrect') 
            } else {
                characterSpan.classList.remove('correct')           // if what they type is incorrect
                characterSpan.classList.add('incorrect')            // make it red
            }
        })
    });

    wordInput.addEventListener('click', stopwatch)                  // Start Timer
    wordInput.addEventListener('keypress',event => {                // Stops Timer 
        if(event.keyCode == 13){                                   
            stop()                                                  // Stops time and shows WPM... find a place to put it
        }
    })

})


// URLs
const url = `http://127.0.0.1:3000/quotes`
// DOM Elements
const wordInput = document.querySelector('#word-input');            // User Input
const currentWord = document.querySelector('#current-word');        // Quote Prompt
const scoreDisplay = document.querySelector('#score');              // Score
const timeDisplay = document.querySelector('#time');                // Time
const message = document.querySelector('#message');                 // Message *May Delete
const seconds = document.querySelector('#seconds');                 // Seconds

// ACCESSING DATABASE 
function getQuotes() {
    fetch(url)
        .then(resp => resp.json())
        .then(json => {
            getQuoteToDom(json);
        })
}
// IMPORTING THE RANDOM QUOTE TO DOM
let wordCount
let characterSpan

async function getQuoteToDom(array) {                           // APPEND QUOTE TO DOM 
    const randIndex = Math.floor(Math.random() * array.length); //random INDEX to randomly choose quote from json array
    
    let quote = array[randIndex].quote
    wordCount = quote.split(' ').length                         // Integer that represents number of words in a string 

    quote.split('').forEach(character =>{
        characterSpan = document.createElement('span')          // create span tag for each letter
        characterSpan.innerText = character                     // append letter to span 
        currentWord.appendChild(characterSpan)                  // append entire element to div
    })
    wordInput.value = null
    console.log(quote)
    console.log(wordCount)                                      
}

// TIMER SETUP
let timer = 0
let clock
function stopwatch() {
    clock = setInterval(function () {
        timer += 1
        seconds.innerText = timer
    }, 1000)
}
function stop(){
    clearInterval(clock)                                        // STOPS the timer
    wpm()                                                       // When timer stops, do WPM logic
}

// WPM LOGIC 

function wpm(){
    let wpm = (wordCount/timer) *60
    console.log(wpm)
} 
