document.addEventListener("DOMContentLoaded", () => {
    //Main function
    init();

    // Globals 
    let currentUsername // keep in mind when this variable is set and make sure it isn't NULL
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    const usersUrl = "http://127.0.0.1:3000/users"
    const quotesUrl = "http://127.0.0.1:3000/quotes"
    const roundsUrl = "http://127.0.0.1:3000/rounds"
    // let form = document.querySelector(".form")

    // DOM Elements
    // const form = document.querySelector(".form")
    const quoteInput = document.querySelector('#quote-input');
    const currentQuote = document.querySelector('#current-quote');

    // Functions
    function init() { 
        setInterval(toggleLogInForm, 3000)// Add logic to have username form pop when users reaches bottom of window
        setInterval(formSetup, 3500) // Set up submit form for username 
        // buttonSetup() // Self-explanatory
        // startGame() // Timer/Load quotes
        // logGame() // Saving stats (username/completion time/score) + play again? 
    }

    function toggleLogInForm() {
        let form = document.querySelector(".form")
        form.style.display = "block"
        // if (form.style.display === "none") { 
        //     form.style.display = "block"
        // } else { 
        //     form.style.display = "none"
        // }
    }

    function formSetup() {        
        let form = document.querySelector(".form")
        form.addEventListener("submit", (e) => { 
            e.preventDefault(); 
            const username = e.target.querySelector("#login-field").value
            
            fetch(usersUrl, {
                method: "POST", 
                headers, 
                body: JSON.stringify({username})
            })
            // .then(resp => resp.json())
            // .then(data => console.log(data))
            // .catch(function(error){
            //     console.log(error.message)
            // })
            //     {
            //     let username = e.target.querySelector("#login-field").value
            //     console.log(username)
            // }
            //Save data value to username global  
        })
    }

    // function buttonSetup() {

    // }

    // function startGame() {

    // }

    // function logGame() { 
    //      fetch(get username from last object)

    // }

})