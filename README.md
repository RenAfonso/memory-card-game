# Memory Card Game

### Description

This is a project made for Udacity's front end nanodegree.

## Table of Contents

* [Gameplay](#instructions)
* [Build](#build)
* [Future features](#future features)
* [Contributing](#contributing)

## Gameplay

Please, download or clone this repository and run `index.html` locally.

On run you'll encounter two main areas: the score panel and the deck, in this order.

#### Score panel
    
    The moves flag counts how many moves you made. Every time you test a pair of cards for a match, it logs one move.

    The timer flag counts the time since you flipped the first card.

    The star flag rates your ability, or luck, on finishing the game. You start with 3 and it goes all the way down to 0, depending on the number of made moves.

    The new game button resets the above flags, flips all cards back down and reshuffles the deck, thus allowing a new game.


#### Deck

    You have 16 cards facing down. You goal is to match the pairs by flipping the pair over on the same move.
    
    On click, a card will flip over and show its symbol. It will remain open until you flip a second card over.

    After flipping over the second card, the game will test if the cards match. If they match, their background changes to green and they lock on open position for the remainder of the game. If they don't match, they'll shake and turn red briefly before flipping back down.

    The game is won when all 8 pairs are matched, prompting a congratulatory message with time ellapsed and star rating. You'll have the option to play again.

## Build

This web app was built using HTML5, CSS3 and JavaScript - shuffle function in `app.js` was provided by Udacity.

- Card symbols from [Font Awesome](https://fontawesome.com/)
- Font from Google Fonts (Coda)
- Background from [wallpaperbrowse](https://wallpaperbrowse.com/)
- Icon by [monkik](https://www.flaticon.com/authors/monkik) at [FlatIcon](https://www.flaticon.com/) 

## Future features

- List of symbols, icons or other images to be selected upon web app load. Some children may prefer a specific cartoon or parents may want to use the app to teach some new words to their children.
- Leaderboard that will register top 5 scores while the web app is open.

## Contributing

Please check out [CONTRIBUTING.md](CONTRIBUTING.md). Pull requests are accepted.