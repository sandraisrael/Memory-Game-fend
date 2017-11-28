/*
 * Create a list that holds all of your cards
 */

var cards = document.getElementsByClassName("card");
console.log(cards);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
};


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


// function to add and remove open and show class from cards so they display
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
};

// function for when cards match
function matched(){
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards= [];
}

// function for when cards don't match
function unmatched(){
    console.log(openedCards);
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");  
    openedCards= [];  
}

// array for opened cards
var openedCards = [];

// function to add opened cards to OpenedCards list
function addOpen() {
    openedCards.push(this);
    if(openedCards.length === 2){
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    } else {
        console.log("Select another card");
    }

};

// loop to add event listeners to each cards
for (var i = 0; i < cards.length; i++){
    var card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", addOpen);
};
