
var moveCounter = document.querySelector('.moves');
var moves = 0;  //move counter
var firstCard, secondCard = true; //control measure for fast clickers
var faceUp = []; //our face-up array for matching

//statically built the inner HTML of the deck
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



//deal the cards
deal(cards);

//shuffles, sets innerHTML, and adds mouse EventListener
function deal(cards) {
  moves = 0; //reset move counter
  shuffle(cards); //shuffle function below
  //beccause of the DOM lookup, the first card is special
  var firstCard = document.querySelector('.deck').firstElementChild;
  firstCard.innerHTML = cards[0];
  firstCard.className = 'card'; //used during the reset button
  makeClickable(firstCard);
  var nextCard = firstCard

  //iterate through the deck by 'nextElementSibling'
  for (var i = 1; i < cards.length; i++) {
    nextCard = nextCard.nextElementSibling;
    nextCard.className = 'card';  //used during the rest button
    nextCard.innerHTML = cards[i];
    makeClickable(nextCard);  //add event listeners with compare function
  }
}

//alternates between CSS classes to show sides of cards and animation
function makeClickable(card) {
  card.addEventListener('click', function(){
    if (card.className === 'card'){
      if(firstCard || secondCard){    //locks card flip when checking for match
        card.className = 'card show'; //flips the card for display
        compare(card); //comparison and main game logic
      }
    } else {
      //displays when a showing card is clicked again
      console.log('already flipped');
    }
  });
}

function compare(card) {
  //Step 1: Flip an initial card for comparison
  if (faceUp.length === 0 || faceUp.length % 2 === 0) { //is empty or even
    faceUp.push(card);  //pushes first card for comparison into the array
    firstCard = false;  //lock the first card for earlier boolean check
  } else {
    //credit to stackoverflow at: https://stackoverflow.com/questions/1141302
    //Step 2: Flip other card to compare; cards match
    secondCard = false; //lock card so impatient players don't mess up the logic
    setTimeout(function(){ //delay the flipping by one second for human processing
      if (faceUp[faceUp.length - 1].innerHTML === card.innerHTML){  // both cards match
        // card.className = 'card match';
        faceUp.push(card);  //push newly matched card onto array
        //if array equals 16, declare victory for player
        if (faceUp.length === 16) {
          alert('winner!!!');
        }
        firstCard, secondCard = true; //unlock the first and second card
      } else {
        //Step 3: Cards don't match and both are flipped back over
        //TODO: add CSS animation class
        card.className = 'card'; //flips the card back over
        faceUp[faceUp.length - 1].className = 'card'; //flip card over
        faceUp.pop(); //remove from array for new comparison
        firstCard, secondCard = true; //unlock cards
      }
    }, 1000); //1,000 delays card flip by 1 second
    moves++;  //increment move counter, works for matches and mis-matches
  }
  moveCounter.innerHTML = moves;  //update HTML tag with new moves
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

//set reset event
var reset = document.getElementById('restart')
reset.addEventListener('click', function(){
  deal(cards);  //re-deal the hands
  moveCounter.innerHTML = 0;  //reset the move counter
  //TODO: reset the game timer when built
});
