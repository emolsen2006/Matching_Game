
var moveCounter = document.querySelector('.moves');
var moves = 0;  //move counter
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

  //iterate through the deck by 'nextElementSibling'
  for (var i = 1; i < cards.length; i++) {
    nextCard = nextCard.nextElementSibling;
    nextCard.innerHTML = cards[i];
    makeClickable(nextCard);  //add event listeners with compare function
  }
}

//alternates between CSS classes to show sides of cards and animation
function makeClickable(card) {
  //TODO: user should only click to show, not both
  card.addEventListener('click', function(){
    if (card.className === 'card'){
      card.className = 'card show';
      //add comparison at time of event listen
      compare(card);
      //TODO: throw in sleep command for the player
    } else {
      //delete this once you fix the game logic
      //displays when a showing card is clicked again
      console.log('error');
    }
  });
}

//game logic:
//Overall: This is iterative and launched on each card mouse click
//1. If even, puts the card in the faceUp stack
//2. Otherwise, peaks the stack and compares innerHTML
//3. If they match, push the card to stackoverflow
//4. If they don't match, pop the stack
//5. In both outcomes, increment the moves counter
//6. Check if the stack === 16, if so, player wins, if not, continue
function compare(card) {
  if (faceUp.length === 0 || faceUp.length % 2 === 0) {
    //pushes first card for comparison into the array
    faceUp.push(card);
  } else {
    //takes the newly selected card and compares to the last card
    //credit to stackoverflow at: https://stackoverflow.com/questions/1141302
    setTimeout(function(){ //should delay comparison by 1 sec
      if (faceUp[faceUp.length - 1].innerHTML === card.innerHTML){
        console.log('match');
        faceUp.push(card);
      } else {
        console.log('no match');
        //TODO: sleep for 1 second...much harder in Javascript than I thought

        card.className = 'card';
        faceUp[faceUp.length - 1].className = 'card';
        faceUp.pop();
      }
    }, 1000);
    moves++;
  }
  moveCounter.innerHTML = moves;
  console.log(moves);
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
