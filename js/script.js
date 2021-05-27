// list of letters already guessed
const guessedLettersElement = document.querySelector(".guessed-letters");

// guess button
const guessButton = document.querySelector(".guess");

// box where user inputs a guess
const letterInput = document.querySelector(".letter");

// word in progress paragraph
const wordInProgress = document.querySelector(".word-in-progress");

// remaining guesses paragraph
const remainingGuesses = document.querySelector(".remaining");

// span to show remaining number of guesses
const numRemaining = document.querySelector(".remaining span");

// messages to the user
const message = document.querySelector(".message");

// play again button (hidden initially)
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholders = function(word) {
    placeholderSymbols = [];
    for (let letter of word) {
        //console.log(letter);
        placeholderSymbols.push("●");
    }
    wordInProgress.innerText = placeholderSymbols.join("");
};

placeholders(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    userGuess = letterInput.value;
    //console.log(userGuess);
    letterInput.value = "";
    message.innerText = "";
    const validatedGuess = validateInput(userGuess); //I had "input" previously; why not input?
    console.log(validatedGuess);
    if (validatedGuess !== undefined){
        makeGuess(validatedGuess);
    }
});

// testing whether to use input or input.value, on a simpler function first
// conclusion: just input. also remember triple ===
/*
const validateInput = function(input) {
    if (input === ""){ //was input.value
        message.innerText = "blank";
    } else {
        message.innerText = input; //was input.value; how come don't need to specify 'value'?
    }
};
*/

const validateInput = function(input) { //why not a function of userGuess?
    const acceptedLetter = /[a-zA-Z]/;
    if (input === ""){
        message.innerText = "Oops, you left it blank.  Please enter a letter from A to Z."
    } else if (input.length > 1){ 
        message.innerText = "That's too many letters.  Please enter just one letter from A to Z."
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Letters only, please! No numbers or special characters."
    } else {
        return input;
        //console.log(input);
    }
};

const makeGuess = function(validatedGuess){ //"accepts a letter as the parameter" NB: and ONLY a letter
    validatedGuess.toUpperCase();
    if (guessedLetters.includes(validatedGuess)) {
        message.innerText = "Oops, you've already guessed that one! Try another."
    } else {
        guessedLetters.push(validatedGuess);
    }
    console.log(guessedLetters);
};