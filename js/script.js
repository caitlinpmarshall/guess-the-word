//document variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const numRemaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

//global variables
let word = "magnolia"; //magnolia
const guessedLetters = [];
//const wordUpper = word.toUpperCase(); //avoid declaring lotsa global variables, so best practice is go put these in their homes
//const wordArray = wordUpper.split("");
let remainingGuesses = 8;

// async to fetch a random word
const getWord = async function () {
    const randomWords = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const randomWordsFormatted = await randomWords.text();
    const randomWordsArray = randomWordsFormatted.split("\n");
    //const randomWordsArray = ["rock", "paper", "scissors"]; simple array to check if randomIndex is working
    const randomIndex = Math.floor(Math.random()*randomWordsArray.length);
    const oneRandomWord = randomWordsArray[randomIndex].trim();
    //math randomizer to generate an index of length of array minus 1
    console.log(oneRandomWord);
    word = oneRandomWord;
    placeholders(word);
    
};

getWord();

// hide the word to guess as a series of dots
const placeholders = function (word) {
    placeholderSymbols = [];
    for (let letter of word) {
        //console.log(letter);
        placeholderSymbols.push("●");
    }
    wordInProgress.innerText = placeholderSymbols.join("");
};



//can I put event listener at the bottom of the code, so it all flows in order?

//user clicks the "guess" button to submit a letter
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    userGuess = letterInput.value;
    //console.log(userGuess);
    letterInput.value = "";
    message.innerText = "";
    const validatedGuess = validateInput(userGuess); //I had "input" previously; why not input?
    console.log(`This is the acceptable letter you guessed: ${validatedGuess}`);
    if (validatedGuess !== undefined) {
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

//validate whether user input is acceptable
const validateInput = function (input) { //why not a function of userGuess?
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = "Oops, you left it blank.  Please enter a letter from A to Z."
    } else if (input.length > 1) {
        message.innerText = "That's too many letters.  Please enter just one letter from A to Z."
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Letters only, please! No numbers or special characters."
    } else {
        return input.toUpperCase(); // this .toUpperCase was inside the makeGuess function 
        //console.log(input);
    }
};

//once guess is validated as a letter, checks whether it's already been guessed. if not, runs functions to show the letter, tally remaining guesses, and update the word in progress
const makeGuess = function (validatedGuess) { //"accepts a letter as the parameter" NB: and ONLY a letter
    //validatedGuess.toUpperCase(); toUpperCase is now appended to input inside the validator 
    //validatedGuess was defined only within event listener, but I'm using it here; is that possible b/c makeGuess is called inside event listener?
    if (guessedLetters.includes(validatedGuess)) {
        message.innerText = "Oops, you've already guessed that one! Try another."
    } else {
        //guessedLetters.push(validatedGuess); used to have just this line of code
        showLetterGuessed(validatedGuess);
        countGuessesRemaining(validatedGuess);
        updateWordInProgress(guessedLetters);
    }
    //console.log(guessedLetters);
};

//shows user a list of all letters guessed, whether in the word or not
const showLetterGuessed = function (validatedGuess) { // parameter = validatedGuess?
    guessedLettersElement.innerHTML = "";
    const li = document.createElement("li");
    li.innerText = `${validatedGuess}`; //why does putting a space here no longer allow word in progress to show?
    guessedLetters.push(li.innerText);
    guessedLettersElement.innerHTML = `${guessedLetters.join("")}`; //add a .join()?
};

//replaces dots with letters, when user guesses a letter that is in the word
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) { 
            revealWord.push(letter);
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    console.log(wordArray);
    console.log(revealWord);
    checkWin(revealWord); // why no parameter required, but also ok to pass one?
};

//tallies remaining guesses allowed
const countGuessesRemaining = function(input) { //userGuess, input, or validatedGuess as the parameter? userGuess and validatedGuess aren't global, so I'm going with input
    //tell user if their guess is in the word
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(input)) {
        remainingGuesses -= 1;
        message.innerText = "Sorry! That's not a letter in the word.";
    } else {
        message.innerText = `Good guess! ${input} is in the word.`;
    }
    //update tally of remaining guesses
    if (remainingGuesses === 0) {
        message.innerText = `Game over! The word was ${wordUpper}. Better luck next time!`;
    } else if (remainingGuesses === 1) {
        remainingGuessesElement.innerText = "You have just one guess left!";
    } else {
        console.log(remainingGuesses);
        numRemaining.innerText = `${remainingGuesses} guesses`;
    }
}; 

//checks if user has guessed all the right letters
const checkWin = function(revealWord){ //why no parameter required? why are wordArray and revealWord okay to use as parameters? Is it because they're defined in updateWordInProgress, where checkWin is called?
    //confirm whether the word in progress matches final word
    //used stringify, since this situation truly requires just strings
    if (JSON.stringify(wordArray) === JSON.stringify(revealWord)){
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
};

