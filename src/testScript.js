document.addEventListener("DOMContentLoaded", event => {
    getQuotes()

    wordInput.addEventListener('input', () => { // TYPE OUT QUOTE EXACTLY TO SEE MESSAGE
        if (wordInput.value === currentWord.innerHTML) {
            message.innerHTML = 'Correct!!!';
            return true;
        } else {
            message.innerHTML = 'Back up';
            return false;
        }
    });

    wordInput.addEventListener('click', stopwatch) // Starst Timer
    wordInput.addEventListener('keypress',event => { // Stops Timer 
        if(event.keyCode == 13){
            stop()
        }
    })

})


// URLs
const url = `http://127.0.0.1:3000/quotes`
// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word'); // This is where we append our quote 
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

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
function getQuoteToDom(array) { // RANDOM QUOTE TO DOM 
    const randIndex = Math.floor(Math.random() * array.length); //random INDEX 
    currentWord.innerHTML = array[randIndex].quote // DISPLAYING QUOTE INTO DOM
    wordCount = array[randIndex].quote.split(' ').length
    console.log(array[randIndex].quote) // String
    console.log(wordCount) // Word Count

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
    clearInterval(clock) // STOPS the timer but does not clear it 
    wpm()
}

// WPM LOGIC 
// GET STRING FROM IMPORT SECTION
// REGEX FOR SPACES TO DISTINGUISH WORDS 
// Find a place for this in the DOM
function wpm(){
    let wpm = (wordCount/timer) *60
    console.log(wpm)
} 


// Create logic for validating the user input matches the string 