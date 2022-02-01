const words = ['array', 'object', 'event', 'class', 'element', 'function', 'variable', 'arrow', 'loop', 'grid', 'html',
                'flexbox', 'undefined', 'constant', 'string', 'selector', 'argument'];
const wrongMsgElem = document.querySelector('.wrong-message');
const wrongElem = document.querySelector('.wrong-letters');
const gamesPlayedElem = document.querySelector('.games');
const wonGamesElem = document.querySelector('.wins');
const livesElem = document.querySelector('.lives');
let wonGames = 0;
let gamesPlayed = 0;
let lives = 5;
const lost = 0;
let guessedLetters = [];
let guessedLetter;
let finalWord = document.querySelector('.words')
let correctWord = randomWord();
let correctLetters = [];
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
window.addEventListener('keypress', keyboardInput); 
function keyboardInput() {
    wrongMsgElem.innerHTML = ""; 
    if(event.keyCode >= 97 && event.keyCode <= 122 ) {
        guessedLetter = event.key.toUpperCase();
        checkGuess(guessedLetter);   
        }
        else {
            return false;
        }  
}

// Function to not include the same letter multiple times
function checkGuess(guessedLetter) {
    if(!guessedLetters.includes(guessedLetter)) {
        guessedLetters.push(guessedLetter);        
        compareLetters(guessedLetter);
    } else {
        wrongMsgElem.innerHTML = `DOH! You have already guessed ${guessedLetter}!`;
        return;
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
        lives--;
        wrongLetters.push(guessedLetter);
        wrongElem.innerHTML = wrongLetters.join(" ");
        livesElem.innerHTML = `Lives : ${lives}`
        showHangman();
    }   
        gameEnd();     
};

// End of game 
function gameEnd() {    
    if(correctLetters.length == correctWord.length || lives == lost) {       
        window.removeEventListener('keypress', keyboardInput); 
        setTimeout(gameOverlay, 1000);
    } else {
        return;
    }
};

// Adding pieces of the hangman depending on how many lives the user have
function showHangman() {
    if(lives == 4) {
        document.querySelector('figure').classList.add('scaffold');
    } else if(lives == 3) {
        document.querySelector('figure').classList.add('head');
    } else if(lives == 2) {
        document.querySelector('figure').classList.add('body');
    } else if(lives == 1) {
        document.querySelector('figure').classList.add('arms');
    } else if(lives == 0) {
        document.querySelector('figure').classList.add('legs');
    } 
};

// End of game - add overlay
let endTemplate;
const overlayGame = document.querySelector('.overlay');
const overlayText = document.querySelector('.overlay-text');
function gameOverlay() {        
    if(overlayGame.classList.contains('hidden')) {
        if(lives <= lost || timeleft == 0) {  
            overlayText.innerHTML = `You lost! The correct word was ${correctWord}.` 
        } else {
            wonGames++;
            overlayText.innerHTML = `You won! You had ${lives} lives and ${timeleft} seconds left!`;
        }        
    }
    gamesPlayed++;    
    overlayGame.classList.remove('hidden');
};

// Timer function
let timeleft = 60;
let countdownElem =  document.querySelector(".countdown");
function gameTime() {
    const gameTimer = setInterval(function() {
        if(timeleft <= lost){
            clearInterval(gameTimer);
            gameOverlay();        
        } else if(!overlayGame.classList.contains('hidden')) {
            clearInterval(gameTimer);
        } else {
            countdownElem.innerHTML = `Time left : ${timeleft} s`;
        }
        timeleft--;
    }, 1000);
};

// Resetting the game - restoring all variables, classes and innerHTML to its origin
function resetGame() {   
    window.addEventListener('keypress', keyboardInput); 
    timeleft = 60;    
    gameTime();    
    wrongMsgElem.innerHTML = "";     
    lives = 5;
    correctLetters = [];
    guessedLetters = [];
    wrongLetters = [];
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
    livesElem.innerHTML = `Lives : ${lives}`
    countdownElem.innerHTML = `Time left : ${timeleft} s`;
};

const resetButton = document.querySelector('.reset-btn');
resetButton.addEventListener('click', () => {
    resetGame();
});