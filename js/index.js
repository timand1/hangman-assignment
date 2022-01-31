/*
Användaren ska kunna mata in med tangentbordet bokstäver

Användaren ska kunna se vilka bokstäver den gissar rätt på och var i ordet de hamnar

Vid varje fel ska en del av gubben visas 

Ifall användaren gissar på rätt ord så ska en ”Du vann”-skärm visas med en fråga om man vill spela igen,

Ifall användaren inte hinner gissa rätt ska en ”Du förlorade”-skärm visas med det rätta ordet och en fråga om man vill spela igen.

Du ska enbart kunna gissa på en bokstav i taget. 

Ordet får inte vara hårdkodat i Javascript-filen när den ska jämföras
*/

// Word array
const words = ['array', 'object', 'event', 'class', 'element', 'function', 'variable', 'arrow', 'loop'];
let guessedLetters = [];
let guessedLetter;
let finalWord = document.querySelector('.words')
let correctWord = randomWord();
let correctLetters = [];
const maxAttempts = 5;
let incorrectGuess = 0;
let wrongLetters = [];


function randomWord() {
    const randomInput = Math.floor(Math.random() * (words.length));    
    const wordCorrect = words[randomInput].toUpperCase();
    for(let i = 0; i < words[randomInput].length; i++) {
        let template = 
        `
        <article class="correct-letter--container"> 
        <p class="correct-letter hide">${wordCorrect[i]}</p>
        </article>
        `;
        finalWord.insertAdjacentHTML('beforeend', template);
    }
    return words[randomInput].toUpperCase();
};

const guessElem = document.querySelector('.guess')
// User letter guess
window.addEventListener('keypress', (event) => {  
    if(event.key >= 48 || event.key <= 57) {
        return false;
    }  
    guessedLetter = event.key.toUpperCase();
    checkGuess(guessedLetter);     
});

// Function to not include the same letter multiple times
function checkGuess(guessedLetter) {
    if(!guessedLetters.includes(guessedLetter)) {
        guessedLetters.push(guessedLetter);        
        compareLetters(guessedLetter)
    } else {
        console.log('You have already guessed that letter')
        return
    }
};

const testing = document.querySelectorAll('.correct-letter');
const correctLetterElem = document.querySelector('.correct');
const wrongElem = document.querySelector('.wrong-letters');
function compareLetters() {
    for(let i = 0; i < correctWord.length; i++ ) {
        if(correctWord[i].includes(guessedLetter)) {
            correctLetters.push(guessedLetter);                
                testing[i].classList.remove('hide');
        }       
    } if(!correctWord.includes(guessedLetter)) {
        incorrectGuess++;
        wrongLetters.push(guessedLetter)
        wrongElem.innerHTML = wrongLetters.join(" ");
        showHangman();
    }   
        winGame();     
};

function winGame() {
    if(correctLetters.length == correctWord.length) {
        setTimeout(endGame, 1000);
    } else if(incorrectGuess == maxAttempts) {
        setTimeout(endGame, 1000);
    }
};

function showHangman() {
    if(incorrectGuess == 1) {
        document.querySelector('figure').classList.add('scaffold');
    } else if(incorrectGuess == 2) {
        document.querySelector('figure').classList.add('head');
    } else if(incorrectGuess == 3) {
        document.querySelector('figure').classList.add('body');
    } else if(incorrectGuess == 4) {
        document.querySelector('figure').classList.add('arms');
    } else if(incorrectGuess == 5) {
        document.querySelector('figure').classList.add('legs');
    } 
};

let endTemplate;
const overlayGame = document.querySelector('.overlay')
function endGame() {
    if(incorrectGuess >= maxAttempts || timeleft == 0) {
        endTemplate = 
        `
        <p>You suck!</p>
        <p>The correct word was ${correctWord}.</p>
        `;
    } else {
        endTemplate = 
        `
        <p>You won!</p>
        <p>You had ${incorrectGuess} wrong letters.</p>
        <p>You had ${timeleft} seconds left!</p>
        `;
    }
     overlayGame.classList.toggle('hidden');
     overlayGame.insertAdjacentHTML('afterbegin', endTemplate);
}

let timeleft = 60;
const gameTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(gameTimer);
    endGame()
  } else {
    document.querySelector(".countdown").innerHTML = timeleft + " seconds remaining";
  }
  timeleft -= 1;
}, 1000);

function resetGame() {
    correctWord = randomWord();
    correctLetters = [];
    guessedLetters = [];
    incorrectGuess = 0;
    wrongLetters = [];
    overlayGame.innerHTML = "";
    overlayGame.classList.toggle('hidden');
    finalWord.innerHTML = "";
    correctWord = randomWord();
}

const resetButton = document.querySelector('.reset-btn');
resetButton.addEventListener('click', () => {
    resetGame()
})


