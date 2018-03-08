// variables used for:
let startTimer; // counting time
let stopTimer; // counting time
let moves = 0; // counting moves
let flipFirst = 1; // to check first flipped card
let flippedSymbol = []; // stores flipped font awesome comparison
let flippedId = []; // stores flipped card ID
let matched = []; // stores matched cards
let cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb']; //classes for font awesome
let cardid = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']; //id for cards


// variables used to call elements
const deck = document.getElementById('deck');
const newDeck = document.getElementById('new');
const firstStar = document.getElementById('first-star');
const secondStar = document.getElementById('second-star');
const thirdStar = document.getElementById('third-star');
const regMoves = document.getElementById('moves');

// class function to build the deck when DOM is loaded
document.addEventListener('DOMContentLoaded', buildDeck()); //builds deck on load


function buildDeck() {
    const fragment = document.createDocumentFragment(); // uses a DocumentFragment instead of a <div>

    shuffle(cards); //shuffles the array

    for (let i = 0; i <= cards.length - 1; i += 1) { //cycles through the length of the array cards

        const listItem = document.createElement('li'); //creates list element for each string in the array

        listItem.id = cardid[i]; //adds id in sequential order to each li element
        listItem.className = 'card'; //adds class to each list element
        listItem.innerHTML = '<i class="fa ' + cards[i] + '"></i>'; //adds fontawesome to each list element

        fragment.appendChild(listItem); //appends list elements to deck element runs the code
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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

newDeck.addEventListener('click', rebuild);

//function that resets the counter for first card flipped, moves counter, star color and rebuilds the deck
function rebuild() {
    flipFirst = 1;
    moves = 0;
    regMoves.textContent = moves;

    thirdStar.firstChild.style.color = '#bdbd00';
    secondStar.firstChild.style.color = '#bdbd00';
    firstStar.firstChild.style.color = '#bdbd00';

    deck.innerHTML = '';

    buildDeck();
}

deck.addEventListener('click', clickCard);

//function checks if it's the first click.
function clickCard(evt) {
    if (flipFirst) { //if first click, starts the timer, calls the function that flips the card and sets const to false
        start();
        flipCard(evt.target);
        flipFirst = 0;
    } else { //calls the function that flips the card and checks if the flipped card equates to a win
        flipCard(evt.target);
        checkWin();
    }
}

//function that flips cards and tests for matches
function flipCard(item) {
    let openCard = item.innerHTML;
    let openId = item.getAttribute('id');

    flippedSymbol.push(openCard);
    flippedId.push(openId);

    if (flippedSymbol.length === 2) {
        moves += 1;
        regMoves.textContent = moves;

        countStars();

        let secondId = flippedId.pop();
        let firstId = flippedId.pop();

        let firstCard = document.getElementById(firstId);
        let secondCard = document.getElementById(secondId);

        if (flippedSymbol[0] === flippedSymbol[1]) {
            firstCard.classList.remove('open');
            firstCard.classList.add('match');
            secondCard.classList.add('match');
            matched.push(firstId, secondId);
        } else {
            secondCard.classList.add('open');
            secondCard.classList.add('show');
            setTimeout(() => {
                secondCard.classList.remove('show');
                firstCard.classList.remove('show');
                secondCard.classList.remove('open');
                firstCard.classList.remove('open');
            }, 500);
        }
        flippedSymbol.length = 0;
    } else {
        item.classList.add('open');
        item.classList.add('show');
    }
}

//function to count stars by changing color to grey as moves increment
function countStars() {
    if (moves >= 24) {
        firstStar.firstChild.style.color = '#a9a9a9';
    } else if (moves >= 20) {
        secondStar.firstChild.style.color = '#a9a9a9';
    } else if (moves >= 14) {
        thirdStar.firstChild.style.color = '#a9a9a9';
    }
}

//function to check if all cards were matched and game is won
function checkWin() {
    if (matched.length === 16) {
        end();
    }
}

//timer function to start counting ellapsed time
function start() {
    startTimer = new Date();
}

//timer function to stop counting ellapsed time, display game duration and congratulation message
function end() {
    stopTimer = new Date();
    let seconds = stopTimer - startTimer;

    seconds /= 1000; //from ms to s
    swal(
        'Congratulations!',
        'You took ' + seconds + ' seconds to complete this card game!',
        'success'
    );
}