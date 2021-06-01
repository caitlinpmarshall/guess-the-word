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

const word = "magnolia"; //magnolia
const guessedLetters = [];
const wordUpper = word.toUpperCase();
const wordArray = wordUpper.split("");

const placeholders = function (word) {
    placeholderSymbols = [];
    for (let letter of word) {
        //console.log(letter);
        placeholderSymbols.push("●");
    }
    wordInProgress.innerText = placeholderSymbols.join("");
};

placeholders(word);

//can I put event listener at the bottom of the code, so it all flows in order?

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

const makeGuess = function (validatedGuess) { //"accepts a letter as the parameter" NB: and ONLY a letter
    //validatedGuess.toUpperCase(); toUpperCase is now appended to input inside the validator 
    //validatedGuess was defined only within event listener, but I'm using it here; is that possible b/c makeGuess is called inside event listener?
    if (guessedLetters.includes(validatedGuess)) {
        message.innerText = "Oops, you've already guessed that one! Try another."
    } else {
        //guessedLetters.push(validatedGuess); used to have just this line of code
        showLetterGuessed(validatedGuess);
        updateWordInProgress(guessedLetters);
    }
    console.log(guessedLetters);
};

const showLetterGuessed = function (validatedGuess) { // parameter = validatedGuess?
    guessedLettersElement.innerHTML = "";
    const li = document.createElement("li");
    li.innerText = `${validatedGuess}`; //why does putting a space here no longer allow word in progress to show?
    guessedLetters.push(li.innerText);
    guessedLettersElement.innerHTML = `${guessedLetters.join("")}`; //add a .join()?
};

const updateWordInProgress = function (guessedLetters) {
    //if word includes guessed letters, replace a dot with the correct letter
    //const wordUpper = word.toUpperCase(); made this global above
    //const wordArray = wordUpper.split(""); made this global above
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) { // why don't need a for loop to cycle through guessedLetters?
            revealWord.push(letter);
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    
    checkWin(revealWord); // why no parameter required, but also ok to pass one?
};

const checkWin = function(revealWord){ //why no parameter required?
    //confirm whether the word in progress matches final word
    //used stringify, since this situation truly requires just strings
    if (JSON.stringify(wordArray) === JSON.stringify(revealWord)){
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
};

