/*
Användaren ska kunna mata in med tangentbordet bokstäver

Användaren ska kunna se vilka bokstäver den gissar rätt på och var i ordet de hamnar

Vid varje fel ska en del av gubben visas 

Ifall användaren gissar på rätt ord så ska en ”Du vann”-skärm visas med en fråga om man vill spela igen,

Ifall användaren inte hinner gissa rätt ska en ”Du förlorade”-skärm visas med det rätta ordet och en fråga om man vill spela igen.

Du ska enbart kunna gissa på en bokstav i taget. 

Ordet får inte vara hårdkodat i Javascript-filen när den ska jämföras
*/

const words = ['array', 'object', 'event', 'class', 'element', 'function', 'variable', 'arrow', 'loop'];
const wrongMsgElem = document.querySelector('.wrong-message');
const wrongElem = document.querySelector('.wrong-letters');
const gamesPlayedElem = document.querySelector('.games');
const wonGamesElem = document.querySelector('.wins');
const livesElem = document.querySelector('.lives');
let wonGames = 0;
let gamesPlayed = 0;
let lives = 5;
let guessedLetters = [];
let guessedLetter;
let finalWord = document.querySelector('.words')
let correctWord = randomWord();
let correctLetters = [];
const maxAttempts = 5;
let incorrectGuess = 0;
let wrongLetters = [];
gameTime(); // Start timer

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

// User letter guess
window.addEventListener('keypress', (event) => { 
    wrongMsgElem.innerHTML = ""; 
    if(event.key >= 48 || event.key <= 57 || event.key === 'Enter' || incorrectGuess == maxAttempts) {
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
        wrongMsgElem.innerHTML = `You have already guessed ${guessedLetter}`;
        return
    }
};

function compareLetters() {
    const correctWordLetters = document.querySelectorAll('.correct-letter');
    for(let i = 0; i < correctWord.length; i++ ) {
        if(correctWord[i].includes(guessedLetter)) {
            correctLetters.push(guessedLetter);                
            correctWordLetters[i].classList.remove('hide');
            correctWordLetters[i].parentNode.classList.add('score')
        }       
    } if(!correctWord.includes(guessedLetter)) {
        incorrectGuess++;
        wrongLetters.push(guessedLetter)
        wrongElem.innerHTML = wrongLetters.join(" ");
        livesElem.innerHTML = `Lives : ${lives - incorrectGuess}`
        showHangman();
    }   
        winGame();     
};

function winGame() {
    if(correctLetters.length == correctWord.length) {        
        setTimeout(endGame, 1000);
    } else if(incorrectGuess == maxAttempts) {
        setTimeout(endGame, 1000);
    } else {
        return
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
const overlayText = document.querySelector('.overlay-text')
function endGame() {
    if(overlayGame.classList.contains('hidden')) {
        if(incorrectGuess >= maxAttempts || timeleft == 0) {  
            overlayText.innerHTML = `You lost! The correct word was ${correctWord}.` 
        } else {
            wonGames++;
            overlayText.innerHTML = `You won! You had ${incorrectGuess} wrong letters and ${timeleft} seconds left!`;
        }
    }
    gamesPlayed++;
    overlayGame.classList.remove('hidden');
}

let timeleft = 60;
let countdownElem =  document.querySelector(".countdown");
function gameTime() {
const gameTimer = setInterval(function(){
  if(timeleft <= 0){
    endGame()
  } else {
    countdownElem.innerHTML = `Time left : ${timeleft} s`;
  }
  timeleft--;
}, 1000);
}

function resetGame() {  
    wrongMsgElem.innerHTML = ""; 
    timeleft = 60; 
    lives = 5;
    correctLetters = [];
    guessedLetters = [];
    wrongLetters = [];
    incorrectGuess = 0;    
    overlayText.innerHTML = "";
    countdownElem.innerHTML = "";    
    wrongElem.innerHTML = "";
    finalWord.innerHTML = "";
    overlayGame.classList.add('hidden');   
    correctWord = randomWord();
    document.querySelector('figure').classList.remove('scaffold');
    document.querySelector('figure').classList.remove('head');
    document.querySelector('figure').classList.remove('body');
    document.querySelector('figure').classList.remove('arms');
    document.querySelector('figure').classList.remove('legs');    
    gamesPlayedElem.innerHTML = `Games played : ${gamesPlayed}`;
    wonGamesElem.innerHTML = `Won games : ${wonGames}`;
    livesElem.innerHTML = `Lives : ${lives - incorrectGuess}`
    countdownElem.innerHTML = `Time left : ${timeleft} s`;
};

const resetButton = document.querySelector('.reset-btn');
resetButton.addEventListener('click', () => {
    resetGame()
});





