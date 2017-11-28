/*
 * Create a list that holds all of your cards
 */

// cards array holds all cards
var card = document.getElementsByClassName("card");
var cards = [...card]
console.log(cards);

// deck of all cards in game
var deck = document.getElementById("card-deck");

// declaring move variable
var moves = 0;
var counter = document.querySelector(".moves");

var stars = document.querySelectorAll(".fa-star");

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
// Shuffle game when page is refreshed
document.body.onload = startGame();

// startGame function to shuffle cards 
function startGame(){
    cards = shuffle(cards);
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
    }
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


// function to add and remove open and show class from cards so they display
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
};

// array for opened cards
var openedCards = [];

// function to add opened cards to OpenedCards list
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
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
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open");
        openedCards[1].classList.remove("show", "open");
        enable();
        openedCards = [];
    },400);
}

//function to disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}
//function to enable cards 
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
    });
}

// function to count player's movessss
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    // setting rates based on moves
    if (moves > 7 && moves < 14){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.color = "#000";
            }
        }
    }
    else if (moves > 14 && moves < 21){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.color = "#000";
            }
        }
    }
    else if (moves > 21){
        for( i= 0; i < 3; i++){
            stars[i].style.color = "#000";
        }
    }
}


// loop to add event listeners to each cards
for (var i = 0; i < cards.length; i++){
    var card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", moveCounter)
};
