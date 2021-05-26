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
    console.log(userGuess);
    letterInput.value = "";
});

