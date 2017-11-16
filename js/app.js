/*
 * Create a list that holds all of your cards
 */

var cards = document.getElementsByClassName("card");
console.log(cards);

var cardFunction = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
};

for (var i = 0; i < cards.length; i++){
    cards[i].addEventListener("click", cardFunction);
}


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
