// variables used for:
let seconds; //counting time
let countSeconds;
let moves = 0; // counting moves
let finalStars; // for displaying stars
let flipFirst = 1; // to check first flipped card
let flippedSymbol = []; // stores flipped font awesome comparison
let flippedId = []; // stores flipped card ID
let matched = []; // stores matched cards
let cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb']; //classes for font awesome
let cardid = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']; //id for cards

// variables used to call elements
const deck = document.getElementById('deck');
const newDeck = document.getElementById('new');
const regMoves = document.getElementById('moves');
const timer = document.getElementById('timer');
const firstStar = document.getElementById('first-star');
const secondStar = document.getElementById('second-star');
const thirdStar = document.getElementById('third-star');
const modal = document.getElementById('myModal');
const close = document.getElementById('close');
const again = document.getElementById('again');

// calls function to build the deck when DOM is loaded
document.addEventListener('DOMContentLoaded', buildDeck());

/*
 * builds the deck:
 * - creates a fragment
 * - shuffles the array which contains the font awesome icons
 * - loops through array to create list elements with id (sequential one to sixteen in this order), class and random font awesome icon from array
 * - appends all to fragment and fragment to parent unordered list element
 */
function buildDeck() {
    const fragment = document.createDocumentFragment();

    shuffle(cards);

    for (let i = 0; i <= cards.length - 1; i += 1) {

        const listItem = document.createElement('li');

        listItem.id = cardid[i];
        listItem.className = 'card';
        listItem.innerHTML = '<i class="fa ' + cards[i] + '"></i>';

        fragment.appendChild(listItem);
    }

    deck.appendChild(fragment);

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// adds event listener that calls function to rebuild the deck
newDeck.addEventListener('click', rebuild);

//function that resets the counter for first card flipped, moves counter, timer, star color and rebuilds the deck
function rebuild() {
    clearInterval(countSeconds);
    resetVariables();

    deck.innerHTML = '';

    buildDeck();
}

function resetVariables () {
    matched = [];
    flipFirst = 1;
    moves = 0;
    seconds = 0;
    timer.innerHTML = "00";
    regMoves.textContent = moves;

    thirdStar.firstChild.style.color = '#bdbd00';
    secondStar.firstChild.style.color = '#bdbd00';
    firstStar.firstChild.style.color = '#bdbd00';
}

// adds event listener to click cards and flip them (gameplay)
deck.addEventListener('click', clickCard);

// function checks if it's the first click, calls function that flips cards and checks for game win
function clickCard(evt) {
    if (flipFirst) {
        flipCard(evt.target);
        flipFirst = 0;
        start();
    } else {
        flipCard(evt.target);
        checkWin();
    }
}

// function that flips cards, tests matching cards, adds and removes classes accordingly, calls function to change stars and increases moves counter
function flipCard(item) {
    let openCard = item.innerHTML;
    let openId = item.getAttribute('id');

    flippedSymbol.push(openCard);
    flippedId.push(openId);

    // open a second card
    if (flippedSymbol.length === 2) {
        moves += 1;
        regMoves.textContent = moves;

        calcStars();

        let secondId = flippedId.pop();
        let firstId = flippedId.pop();

        let firstCard = document.getElementById(firstId);
        let secondCard = document.getElementById(secondId);

        // matched cards
        if (flippedSymbol[0] === flippedSymbol[1]) {
            firstCard.classList.remove('open');
            firstCard.classList.add('match');
            secondCard.classList.add('match');
            matched.push(firstId, secondId);
            firstCard.removeEventListener('click', clickCard);
            secondCard.removeEventListener('click', clickCard);
        // not matched
        } else {
            secondCard.classList.add('open');
            secondCard.classList.add('show');
            setTimeout(() => {
                firstCard.classList.add('not');
                firstCard.classList.remove('open');
                secondCard.classList.add('not');
                secondCard.classList.remove('open');
            }, 500);
            setTimeout(() => {
                secondCard.classList.remove('show');
                firstCard.classList.remove('show');
                secondCard.classList.remove('not');
                firstCard.classList.remove('not');
            }, 750);
        }
        flippedSymbol.length = 0;
    // open a random card
    } else {
        item.classList.add('open');
        item.classList.add('show');
    }
}

// function to count stars by changing color to grey as moves increment
function calcStars() {
    if (moves >= 24) {
        firstStar.firstChild.style.color = '#2e3d49';
    } else if (moves >= 20) {
        secondStar.firstChild.style.color = '#2e3d49';
    } else if (moves >= 14) {
        thirdStar.firstChild.style.color = '#2e3d49';
    }
}

// function to check if all cards were matched and game is won
function checkWin() {
    if (matched.length === 16) {
        end();
    }
}

// timer function to start counting ellapsed time using setInterval
function start() {
    seconds = 0;

    countSeconds = setInterval(countTime, 1000);
}

// increments time and writes to html
function countTime() {
    seconds += 1;

    if (seconds >= 10) {
        timer.innerHTML = seconds;
    } else {
        timer.innerHTML = '0' + seconds;
    }
}

// timer function to stop counting ellapsed time, display game duration and congratulation message (sweetalert2)
function end() {
    clearInterval(countSeconds);

    const star = '<i class="fa fa-star"></i>';

    if (moves >= 24) {
        finalStars = '';
    } else if (moves >= 20) {
        finalStars = star;
    } else if (moves >= 14) {
        finalStars = star + star;
    } else {
        finalStars = star + star + star;
    }

    openModal();
}

// function that opens the modal and displays a play again and close buttons
function openModal() {
    const displayStars = document.getElementById('display-stars');
    const displaySeconds = document.getElementById('display-seconds');

    displayStars.innerHTML = finalStars;
    displaySeconds.innerHTML = seconds;
    modal.style.display = "block";

    close.addEventListener('click', closeModal);
    again.addEventListener('click', playAgain);
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
    modal.style.display = 'none';
}

function playAgain() {
    modal.style.display = 'none';
    rebuild();
}