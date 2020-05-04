document.addEventListener("DOMContentLoaded", event => {
    getQuotes()

    wordInput.addEventListener('input', () => { // TYPE OUT QUOTE EXACTLY TO SEE MESSAGE
        if (wordInput.value === currentWord.innerHTML) {
            message.innerHTML = 'Correct!!!';
            return true;
        } else {
            message.innerHTML = '';
            return false;
        }
    });

    wordInput.addEventListener('click', stopwatch)
    wordInput.addEventListener('keypress',event => {
        if(event.keyCode == 13){
            stop()
        }
    })

})

let timer = 0
// URLs
const url = `http://127.0.0.1:3000/quotes`
// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word'); // This is where we append our quote 
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

function getQuotes() {
    fetch(url)
        .then(resp => resp.json())
        .then(json => {
            getQuoteToDom(json);
        })
}

function getQuoteToDom(array) { // RANDOM QUOTE TO DOM 
    const randIndex = Math.floor(Math.random() * array.length); //random INDEX 
    currentWord.innerHTML = array[randIndex].quote // DISPLAYING QUOTE INTO DOM
}

let clock
function stopwatch() {
    clock = setInterval(function () {
        timer += 1
        seconds.innerText = timer
    }, 1000)
}
function stop(){
    clearInterval(clock)
}
