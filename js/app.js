/*
 * variables used for gameplay
 */
let timer; //for counting time
let moves = 0; //for counting moves
let sec = 0; //counts time...
let flipFirst = 1; //to check first flipped card
let flipped = []; //stores flipped cards
let matched = []; //stores matched cards
let cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb']; //classes for font awesome
let cardid = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']; //id for cards

/*
 * variables used to call deck or elements
 */
const deck = document.getElementsByClassName('deck');
const start = document.getElementsByClassName('restart');
const firstStar = document.getElementById('first-star');
const secondStar = document.getElementById('second-star');
const thirdStar = document.getElementById('third-star');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

document.addEventListener('DOMContentLoaded', buildDeck()); //builds deck on load

function buildDeck() {
    const fragment = document.createDocumentFragment(); // uses a DocumentFragment instead of a <div>

    shuffle(cards); //shuffles the array

    for (let i = 0; i <= cards.length - 1; i += 1) { //cycles through the length of the array cards

        const listItem = document.createElement('li'); //creates list element for each string in the array

        listItem.id = cardid[i];
        listItem.className = 'card'; //adds class to each list element
        listItem.innerHTML = '<i class="fa ' + cards[i] + '"></i>'; //adds fontawesome to each list element

        fragment.appendChild(listItem); //appends list elements to deck element runs the code
    }
    deck[0].appendChild(fragment);

    addClick(); //adds click event listener to each card
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

// loops through all .card elements and adds the event listener to each
function addClick() {
    const card = document.getElementsByClassName('card');

    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener('click', clickCard); //calls function to check first click on .card click
    }
}

//checks if it's the first click.
function clickCard() {
    if (flipFirst) { //if it's the first click, starts the timer,calls the function that flips the card
        //start timer function
        flipCard(this);
        flipFirst = 0;
    } else { //if not      
        flipCard(this);
    }
}

function flipCard(item) {
    item.className = 'card open show';
}