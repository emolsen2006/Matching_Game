
//statically build the inner HTML of the deck
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

//our face-up array for matching
var faceUp = [];

//deal the cards
deal(cards);

//shuffles, sets innerHTML, and adds mouse EventListener
function deal(cards) {
  //shuffle the deck
  shuffle(cards);
  //beccause of the DOM lookup, the first card is special
  var firstCard = document.querySelector('.deck').firstElementChild;
  firstCard.innerHTML = cards[0];
  makeClickable(firstCard);
  var nextCard = firstCard

  //iterate through the deck by 'next sibling'
  for (var i = 1; i < cards.length; i++) {
    nextCard = nextCard.nextElementSibling;
    nextCard.innerHTML = cards[i];
    makeClickable(nextCard);  //method to add event listeners
  }
}

//alternates between CSS classes to show sides of cards and animation
function makeClickable(card) {
  //TODO: user should only click to show, not both
  card.addEventListener('click', function(){
    if (card.className === 'card'){
      //TODO: add to the open card list
      card.className = 'card show';
      compare(card);
    } else {
      card.className = 'card';
    }
  });
}

function compare(card) {
  //if empty or even numbered
  if (faceUp.length === 0 || (faceUp.length % 2 ===0)) {
    faceUp.push(card);
    // console.log(card);
    // console.log(faceUp.value);
  } else {
    for (var i = 0; i < faceUp.length; i++) {
      if (card.innerHTML === faceUp[i].innerHTML) {
        console.log('match');
      } else {
        console.log('mismatch');
      }
    }
  }

}

// Shuffle function, slightly modified from http://stackoverflow.com/a/2450976
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
