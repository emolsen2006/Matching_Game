
//build initial list of unique cards
var cards = ['<i class="fa fa-motorcycle fa-lg"></i>',
            '<i class="fa fa-motorcycle fa-lg"></i>',
            '<i class="fa fa-truck fa-lg"></i>',
            '<i class="fa fa-truck fa-lg"></i>',
            '<i class="fa fa-fighter-jet fa-lg"></i>',
            '<i class="fa fa-fighter-jet fa-lg"></i>',
            '<i class="fa fa-ship fa-lg"></i>',
            '<i class="fa fa-ship fa-lg"></i>',
            '<i class="fa fa-train fa-lg"></i>',
            '<i class="fa fa-train fa-lg"></i>',
            '<i class="fa fa-rocket fa-lg"></i>',
            '<i class="fa fa-rocket fa-lg"></i>',
            '<i class="fa fa-ambulance fa-lg"></i>',
            '<i class="fa fa-ambulance fa-lg"></i>',
            '<i class="fa fa-wheelchair fa-lg"></i>',
            '<i class="fa fa-wheelchair fa-lg"></i>'];


// Shuffle function, modified from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length;
  var temp;
  var randomIndex;
  while (currentIndex !==0){
    randomIndex = Math.floor(Math.random() * currentIndex); //returns 0-16
    currentIndex--;
    temp = array[currentIndex];               //temp holds the old value
    array[currentIndex] = array[randomIndex]; //random value goes to current
    array[randomIndex] = temp;                //old value goes to random
  }
  return array;
}

//shuffle the deck
shuffle(cards);

function deal(cards) {
  var firstCard = document.querySelector('.deck').firstElementChild;
  firstCard.innerHTML = cards[0];
  var nextCard = firstCard

  for (var i = 1; i < cards.length; i++) {
    nextCard = nextCard.nextElementSibling;
    nextCard.innerHTML = cards[i];
    console.log(nextCard);
  }
}

//deal the cards
deal(cards);
