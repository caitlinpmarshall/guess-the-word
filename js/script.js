// note: console logs left in to show examples of dev process; for all production code, logs removed

//document variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const inputLabel = document.querySelector(".guess-form label");
const letterInput = document.querySelector(".letter");
const guessButton = document.querySelector(".guess");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const numRemaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

//global variables
// let word = "magnolia"; //magnolia, for testing
let word = "";
let guessedLetters = [];
let remainingGuesses = 8;

// async to fetch a random word
const getWord = async function () {
    // get data
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const randomWordsFormatted = await response.text();
    const randomWordsArray = randomWordsFormatted.split("\n");
    // console.log(randomWordsArray);
    const randomIndex = Math.floor(Math.random()*randomWordsArray.length);
    const oneRandomWord = randomWordsArray[randomIndex].trim();
    word = oneRandomWord; 
    // console.log(`value of variable word: ${word}`);
    // display data, masked with placeholder
    placeholders(word);
};

// hide the word to guess as a series of dots
const placeholders = function (word) {
    placeholderSymbols = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderSymbols.push("●");
    }
    wordInProgress.innerText = placeholderSymbols.join("");
};

getWord();

//user clicks the "guess" button to submit a letter
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    userGuess = letterInput.value;
    //console.log(userGuess);
    // console.log(remainingGuesses);
    
    const validatedGuess = validateInput(userGuess); 
    // console.log(`This is the acceptable letter you guessed: ${validatedGuess}`);
    if (validatedGuess !== undefined) { //refactor bc falsy
        makeGuess(validatedGuess);
    }
    letterInput.value = "";
});

// testing whether to use input or input.value, on a simpler function first
// conclusion: just input. also remember triple ===
/*
const validateInput = function(input) {
    if (input === ""){ //was input.value
        message.innerText = "blank";
    } else {
        message.innerText = input; //was input.value;
    }
};
*/

//validate whether user input is acceptable
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = "Oops, you left it blank.  Please enter a letter from A to Z."
    } else if (input.length > 1) {
        message.innerText = "That's too many letters.  Please enter just one letter from A to Z."
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Letters only, please! No numbers or special characters."
    } else {
        return input.toUpperCase(); 
        //console.log(input);
    }
};

//once guess is validated as a letter, checks whether it's already been guessed. if not, runs functions to show the letter, tally remaining guesses, and update the word in progress
const makeGuess = function (validatedGuess) { 
    if (guessedLetters.includes(validatedGuess)) {
        message.innerText = "Oops, you've already guessed that one! Try another."
    } else {
        //guessedLetters.push(validatedGuess);
        showLetterGuessed(validatedGuess);
        countGuessesRemaining(validatedGuess);
        updateWordInProgress(guessedLetters);
    }
    //console.log(guessedLetters);
};

//shows user a list of all letters guessed, whether in the word or not
const showLetterGuessed = function (validatedGuess) {
    guessedLettersElement.innerHTML = "";
    console.log(`the validated guess: ${validatedGuess}`);
    guessedLetters.push(validatedGuess);
    console.log(`the guessed letters array: ${guessedLetters}`);
    // join to make string of li's, not array of them
    const displayGuesses = guessedLetters.map((letter) => `<li>${letter}</li>`).join("");
    console.log(displayGuesses);
    guessedLettersElement.innerHTML = displayGuesses;

    // const li = document.createElement("li");
    // li.innerText = `${validatedGuess}`;
    // guessedLetters.push(li.innerText);
    // guessedLettersElement.innerHTML = `${guessedLetters}`;
};

//replaces dots with letters, when user guesses a letter that is in the word
const updateWordInProgress = function (guessedLetters) {
    //if word includes guessed letters, replace a dot with the correct letter
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    // console.log(revealWord);
    
    checkWin(revealWord); // why no parameter required, but also ok to pass one?
};

//tallies remaining guesses allowed
const countGuessesRemaining = function(userGuess) {
    //tell user if their guess is in the word
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(userGuess)) {
        remainingGuesses -= 1;
        message.innerText = "Sorry! That's not a letter in the word.";
    } else {
        message.innerText = `Good guess! ${userGuess} is in the word.`;
    }
    //update tally of remaining guesses
    if (remainingGuesses <= 0) { 
        message.innerText = `Game over! The word was "${word}". Better luck next time!`;
        startOver();
    } else if (remainingGuesses === 1) {
        numRemaining.innerText = `${remainingGuesses} guess`;
    } else {
        // console.log(remainingGuesses);
        numRemaining.innerText = `${remainingGuesses} guesses`;
    }
}; 

//checks if user has guessed all the right letters
const checkWin = function(){ //why no parameter required?
    //confirm whether the word in progress matches final word
    // console.log(`checkWin word variable: ${word.toUpperCase()}`);
    // console.log(wordInProgress.innerText);
    if (word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
        startOver();
    }
};

//hides and shows elements at the end of the game
const startOver = function (){
    inputLabel.classList.add("hide");
    letterInput.classList.add("hide");
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

//user clicks the "play again" button to reset the game
playAgainButton.addEventListener("click", function(){
    message.classList.remove("win");
    message.innerText = "";
    remainingGuesses = 8;
    // console.log(remainingGuesses);
    guessedLetters = []; //this is breaking it...why? needed to make the global guessedLetters into a let, not const
    numRemaining.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";

    getWord();

    inputLabel.classList.remove("hide");
    letterInput.classList.remove("hide");
    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
});
