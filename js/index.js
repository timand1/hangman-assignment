/*
Användaren ska kunna mata in med tangentbordet bokstäver

Användaren ska kunna se vilka bokstäver den gissar rätt på och var i ordet de hamnar

Vid varje fel ska en del av gubben visas 

Ifall användaren gissar på rätt ord så ska en ”Du vann”-skärm visas med en fråga om man vill spela igen,

Ifall användaren inte hinner gissa rätt ska en ”Du förlorade”-skärm visas med det rätta ordet och en fråga om man vill spela igen.

Du ska enbart kunna gissa på en bokstav i taget. 

Ordet får inte vara hårdkodat i Javascript-filen när den ska jämföras - words-array
*/

//  För att toggla SVG:en
//  document.querySelector('figure').classList.add('scaffold')
//  document.querySelector('figure').classList.add('head')
//  document.querySelector('figure').classList.add('body')
//  document.querySelector('figure').classList.add('arms')
//  document.querySelector('figure').classList.add('legs')

function showHangman() {
    if(incorrectGuess == 1) {
        document.querySelector('figure').classList.add('scaffold')
    } else if(incorrectGuess == 2) {
        document.querySelector('figure').classList.add('head')
    } else if(incorrectGuess == 3) {
        document.querySelector('figure').classList.add('body')
    } else if(incorrectGuess == 4) {
        document.querySelector('figure').classList.add('arms')
    } else if(incorrectGuess == 5) {
        document.querySelector('figure').classList.add('legs')
    } 
}

// Word array
const words = ['ord', 'ordet', 'ordetigen'];
const guessedLetters = [];
let guessedLetter;
const correctWord = randomWord();
const correctLetters = [];
let attempts = 0;
const maxAttempts = 5;
let incorrectGuess = 0;

function randomWord() {
    const randomInput = Math.floor(Math.random() * (words.length -1));
    return words[randomInput];
};

const guessElem = document.querySelector('.guess')
// User letter guess
window.addEventListener('keypress', (event) => {
    
    guessedLetter =  event.key
    checkGuess(guessedLetter);
    compareLetters(guessedLetter)
    guessElem.innerHTML = guessedLetters.join(" ");
    winGame();
});

// Function to not include the same letter multiple times
function checkGuess(guessedLetter) {
    if(!guessedLetters.includes(guessedLetter)) {
        guessedLetters.push(guessedLetter);
        attempts++;
    } else {

        console.log('You have already guessed that letter')
    }
};


const correctLetterElem = document.querySelector('.correct')
function compareLetters() {
    for(let i = 0; i < correctWord.length; i++ ) {
        if(correctWord.includes(guessedLetter)) {
            correctLetters.push(guessedLetter);
            correctLetterElem.innerText = correctLetters.join(" ");
        } else {
            incorrectGuess++;
            showHangman()
        }        
    }
};

function winGame() {
    if(correctLetters.length == correctWord.length) {
        console.log('You Win!')
        // overlay.classList.add('.show');
    } else if(attempts == maxAttempts) {
        console.log('förlust');
    } { return }
}

