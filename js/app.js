
var moveCounter = document.querySelector('.moves');
var moves = 0;  //move counter
var firstCard, secondCard = true; //control measure for fast clickers
var star1 = document.getElementById('star1');
var star2 = document.getElementById('star2');
var star3 = document.getElementById('star3');
var startTime;
var timerDisplay = document.querySelector('#timer');
var gameWon = false;
var firstClick = false;
var gameReset = false;

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
            '<i class="fa fa-tree fa-lg"></i>',
            '<i class="fa fa-tree fa-lg"></i>'];



//starts and resets the game
deal(cards);

//shuffles, sets innerHTML, and adds mouse EventListener
function deal(cards) {
  moves = 0; //reset move counter
  moveCounter.innerHTML = moves; //update display
  firstClick = false; //reset timer start event
  resetStars(); //painful reset of starts
  faceUp.length = 0; //reset the faceUp list
  shuffle(cards); //shuffle function below

  //beccause of the DOM lookup, the first card gets special treatement
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
      if(firstCard || secondCard){    //locks card flip for a third card
        card.className = 'card open'; //flips the card for display
        compare(card); //comparison and main game logic
      }
    } else {
      // console.log('already flipped');
    }
  });
}

//main game logic generated from mouseclick event listener
function compare(card) {
  //if the first click, lock the firstClick boolean, start the timer, and clear reset lock
  if (!firstClick) {
    firstClick = true;
    startTime = getTime()
    startTimer();
    gameReset = false;
  }
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
        faceUp[faceUp.length - 1].className = 'card match'; //match css
        card.className = 'card match';  //match CSS
        faceUp.push(card);  //push newly matched card onto array
        //if array equals 16, declare victory for player
        if (faceUp.length === 2) {
          gameWon = true;
          winGame();
        }
        firstCard, secondCard = true; //unlock the first and second card
      } else {
        //Step 3: Cards don't match and both are flipped back over
        //use setTimeout function for phased shift of CSS class
        setTimeout(function(){
          setTimeout(function() {
            card.className = 'card'; //flips the card back over
            faceUp[faceUp.length - 1].className = 'card'; //flip card over
            faceUp.pop(); //remove from array for new comparison
            firstCard, secondCard = true; //unlock cards
          }, 400);
          card.className = 'card return';
          faceUp[faceUp.length - 1].className = 'card return';
        }, 400);
        card.className = 'card mismatch';
        faceUp[faceUp.length - 1].className = 'card mismatch';
      }
    }, 1200); //1,000 delays card flip by 1 second
    moves++;  //increment move counter, works for matches and mis-matches
  }
  moveCounter.innerHTML = moves;  //update HTML tag with new moves
  updateStars(moves);
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
  gameReset = true;
  moveCounter.innerHTML = 0;  //reset the move counter
  timerDisplay.innerHTML = '0:00';
  deal(cards);  //re-deal the hands

});

function updateStars(moves){
  if (moves > 28) {
    star1.style.display = 'none';
  } else if (moves > 22) {
    star2.style.display = 'none';
  } else if (moves > 18) {
   star3.style.display = 'none';
  }
}

//this makes me think that using javascript for inline styling is not good design
function resetStars() {
  star1.style.display = '';
  star2.style.display = '';
  star3.style.display = '';
}

//for time calculations
function getTime() {
  var date = new Date()
  var time = date.getTime();
  return time;
}

//may need to generate a first mouse click event
function startTimer() {
  console.log('firstClick: ' + firstClick);
  if (firstClick) {
    var timer = setInterval(function() {
      var now = getTime();
      var distance = now - startTime;
      var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
      var seconds = Math.floor(distance % (1000 * 60) / 1000);
      //create leading zero
      if (seconds < 10) {
        seconds = '0' + seconds; //a strongly typed language would never allow this
      }
      //update html timer
      if (!gameReset) {
        timerDisplay.innerHTML = minutes + ':' + seconds;
      }
      if (gameWon){
        clearInterval(timer);
        timerDisplay.innerHTML = '0:00';
      }
    }, 1000);
  }
}

function winGame() {
  var finishTime = getTime() - startTime;
  var minutes = Math.floor(finishTime % (1000 * 60 * 60) / (1000 * 60));
  var seconds = Math.floor(finishTime % (1000 * 60) / 1000);
  var gameData = 'You won in ' + minutes + ' minutes ' + seconds
  + ' seconds and in ' + moves + ' moves' ;
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('overlay-container').style.display = 'block';
  document.getElementById('game-data').innerHTML = gameData;

  var btn = document.getElementById('play-button');
  btn.addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('overlay-container').style.display = 'none';
    deal(cards);
    gameWon = false;
  })

}
