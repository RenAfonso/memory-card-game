/*
 * variables used for gameplay
 */
let timer; //for counting time
let moves = 0; //for counting moves
let sec = 0; //counts time...
let flipFirst = 1; //to check first flipped card
let flippedSymbol = []; //stores flipped font awesome for comparison
let flippedId = []; //stores flipped card ID
let matched = []; //stores matched cards
let cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb']; //classes for font awesome
let cardid = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']; //id for cards
let teste;
//let secondId;
/*
 * variables used to call deck or elements
 */
const deck = document.getElementById('deck');
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
        //listItem.addEventListener('click', clickCard);

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

// loops through all .card elements and adds the event listener to each
/*function addClick() {
    const card = document.getElementsByClassName('card');

    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener('click', clickCard); //calls function to check first click on .card click
    }
}*/
deck.addEventListener('click', clickCard);

//function checks if it's the first click.
function clickCard(evt) {
    if (flipFirst) { //if first click, starts the timer,calls the function that flips the card and sets const to false
        //start timer function
        flipCard(evt.target);
        flipFirst = 0;
    } else { //calls the function that flips the card
        flipCard(evt.target);
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

        let secondId = flippedId.pop();
        let firstId = flippedId.pop();

        let firstCard = document.getElementById(firstId);
        let secondCard = document.getElementById(secondId);

        if (flippedSymbol[0] === flippedSymbol[1]) {
            firstCard.classList.remove('open');
            firstCard.classList.add('match');
            secondCard.classList.add('match');
        } else {
            secondCard.classList.add('open');
            secondCard.classList.add('show');
            setTimeout(function() {
                secondCard.classList.remove('show');
                secondCard.classList.remove('open');
                firstCard.classList.remove('show');
                firstCard.classList.remove('open');
            }, 1100)
        }
        flippedSymbol.length = 0;
    } else {
        item.classList.add('open');
        item.classList.add('show');
    }
}

    /*if (array[0] === array[1]) {
        firstItem.classList.remove('open');
        firstItem.classList.add('match');
        secondItem.classList.add('match');
        //testWin();
    } else {
        secondItem.classList.add('open');
        secondItem.classList.add('show');
    }*/
