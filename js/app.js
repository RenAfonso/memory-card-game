/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

document.addEventListener("DOMContentLoaded", buildDeck()); //when DOM is loaded calls build deck function

function buildDeck() {
    const newList = document.createElement('ul'); //creates new ul without li

    newList.className = 'deck'; //adds class to ul above
    const mainContain = document.querySelector('.container');

    mainContain.appendChild('newList'); //appends ul as last child to main div

    shuffle(cards); //shuffles the cards array

    for (let i = 0; i <= cards.Length - 1; i++) { //creates 16 cards
        const listItem = document.createElement('li');

        listItem.className = 'card'; //adds class to li

        listItem.innerHTML = '<i class="fa" ' + cards[i] + '></i>'; //adds fontawesome through array new order to li, thus creating the ul inside the comments of HTML file
        newList.appendChild(listItem);
    }
}

// document.body.appendChild(fragment);

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
// https://github.com/shannonj498/memory-matching-game/blob/master/js/app.js