//Global variables
const moveCounter = document.querySelector('.moves');
let moves = 0;  //move counter
let firstCard, secondCard = true; //control measure for fast clickers
const star1 = document.getElementById('star1');
const star2 = document.getElementById('star2');
const star3 = document.getElementById('star3');
let startTime;
const timerDisplay = document.querySelector('#timer');
let gameWon = false;
let firstClick = false;
let gameReset = false;

//array that holds face up cards
const faceUp = []; //our face-up array for matching

//statically built the inner HTML of the deck, a little painful, but very stable
const cards = ['<i class="fa fa-motorcycle fa-lg"></i>',
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


//starts and resets the game upond loading of DOM
deal(cards);

//shuffles, sets innerHTML, and adds mouse EventListener
function deal(cards) {
  //most of this is needed when the game resets after winning or manual reset
  moves = 0; //reset move counter
  moveCounter.innerHTML = moves; //update display
  firstClick = false; //reset timer start event
  resetStars(); //painful reset of starts
  faceUp.length = 0; //reset the faceUp list

  shuffle(cards); //uses the provided stackoverflow shuffle function

  //beccause of the DOM lookup, the first card gets special treatement
  const firstCard = document.querySelector('.deck').firstElementChild;
  firstCard.innerHTML = cards[0]; //assign the card value
  firstCard.className = 'card'; //makes the card be face down
  makeClickable(firstCard); //method that adds the event listner to the card
  let nextCard = firstCard //next card will be everything else

  //iterate through the deck by 'nextElementSibling'
  for (let i = 1; i < cards.length; i++) {
    nextCard = nextCard.nextElementSibling; //select next 'ul' tag
    nextCard.className = 'card';  //set the card face down
    nextCard.innerHTML = cards[i]; //assign the card value
    makeClickable(nextCard);  //add event listener
  }
}

//alternates between CSS classes to show sides of cards and needed animation
function makeClickable(card) {
  card.addEventListener('click', function(){
    if (card.className === 'card'){ //if card is face down
      if(firstCard || secondCard){    //two booleans prevents a 3rd card flip
        card.className = 'card open'; //flips the card for display
        compare(card); //comparison and main game logic
      }
    } else {
      // unused, but useful for detecting and logging missed events
    }
  });
}

//main game logic generated from mouseclick event listener
function compare(card) {
  //if fistClick is false, this tells the game to start the timer and cease reseting
  if (!firstClick) {
    firstClick = true; //prevents a second run
    startTime = getTime() //fetches current time with private function
    startTimer(); //private function that starts game timer
    gameReset = false;  //needed to control the reset of the timer html
  }

  //************main game logic***********************//
  //Step 1: Flip an initial card for comparison
  if (faceUp.length === 0 || faceUp.length % 2 === 0) { // first card is flipped
    faceUp.push(card);  //push first card for comparison into the faceup array
    firstCard = false;  //lock the first card for the earlier boolean check

  } else {

    //credit to stackoverflow at: https://stackoverflow.com/questions/1141302
    //Step 2: Flip other card to compare; cards match
    secondCard = false; //lock card so impatient players don't mess up the logic

    setTimeout(function(){ //delay total time to 1.2 seconds for human processing/animation
      if (faceUp[faceUp.length - 1].innerHTML === card.innerHTML){  // both cards match
        faceUp[faceUp.length - 1].className = 'card match'; //apply match CSS class
        card.className = 'card match';  // apply match CSS class
        faceUp.push(card);  //push newly matched card onto array

        //CHECK FOR WINNING CRITERIA//
        if (faceUp.length === 16) {
          gameWon = true; //boolean to assist in stopping the game timer
          winGame(); //private function below
        }

        firstCard, secondCard = true; //unlock the first and second card for flipping
      } else {

        //Step 3: Cards don't match and both are flipped back over
        //use setTimeout function for phased shift of CSS class
        //this logic works like a stack data strucure; outer-most is executed first
        setTimeout(function(){ //encapsulates incorrect CSS animation and flipping back
          setTimeout(function() { //just incorrect CSS animation
            card.className = 'card';
            faceUp[faceUp.length - 1].className = 'card';
            faceUp.pop(); //clears top value of comparison array
            firstCard, secondCard = true; //unlock cards for future flipping
          }, 400);  //wait .4 seconds to slip back
          card.className = 'card return'; //css class to flip card back over
          faceUp[faceUp.length - 1].className = 'card return'; //same
        }, 400);  //take .4 seconds to generate incorrect animation
        card.className = 'card mismatch';
        faceUp[faceUp.length - 1].className = 'card mismatch';
      }

    }, 1200); //1,200 delays card flip by 1.2 seconds
    moves++;  //increment move counter, works for both matches and mis-matches
  }

  moveCounter.innerHTML = moves;  //update HTML tag with new moves
  updateStars(moves); //check if player has exceeded star rating

}//end of compare(cards) method

// Shuffle function, slightly modified from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length;
  let temp;
  let randomIndex;
  while (currentIndex !==0){
    randomIndex = Math.floor(Math.random() * currentIndex); //returns 0-16
    currentIndex--;
    temp = array[currentIndex];               //temp holds the old value
    array[currentIndex] = array[randomIndex]; //random value goes to current
    array[randomIndex] = temp;                //old value goes to random
  }
  return array;
}

//set reset event executed upon DOM loading
const reset = document.getElementById('restart')
reset.addEventListener('click', function(){ //event listener added to reset icon
  gameReset = true; //without this, the set interval function would continue
  moveCounter.innerHTML = 0;  //reset the move counter
  timerDisplay.innerHTML = '0:00';
  deal(cards);  //re-deal the hands and use initial reset instructions
});

//player evaluation criteria...I'll let my boys know if this is fair
function updateStars(moves){
  if (moves > 22) {
    star2.style.display = 'none';
  } else if (moves > 18) {
    star3.style.display = 'none';
  }
}

//works, but makes me think that using javascript for inline styling is poor design
function resetStars() {
  star1.style.display = '';
  star2.style.display = '';
  star3.style.display = '';
}

//fetches number of stars for string output on the winning menu
function getStars() {
  if (moves > 22) {
    return 1;
  }else if (moves > 18) {
    return 2;
  } else {
    return 3;
  }
}

//for time calculations, I placed it here so it wouldn't clutter the code above
function getTime() {
  let date = new Date()
  let time = date.getTime();
  return time;
}

//starts the game timer and calculates values for html display
function startTimer() {
  if (firstClick) {
    let timer = setInterval(function() {
      let now = getTime();
      let distance = now - startTime;
      let minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
      let seconds = Math.floor(distance % (1000 * 60) / 1000);
      //create a leading zero seconds less than 10
      if (seconds < 10) {
        seconds = '0' + seconds; //a strongly typed language would never allow this
      }
      //when the player clicks reset
      if (!gameReset) {
        timerDisplay.innerHTML = minutes + ':' + seconds;
      }
      //was needed to stop the html from counting up after winning
      if (gameWon){
        clearInterval(timer);
        timerDisplay.innerHTML = '0:00';
      }
    }, 1000); //updates the timer every second
  }
} //end of startTimer()

//triggered when the faceUp array equals 16 cards
function winGame() {
  let finishTime = getTime() - startTime; //calculate finish time with above functions
  //generate html for display
  let minutes = Math.floor(finishTime % (1000 * 60 * 60) / (1000 * 60));
  let seconds = Math.floor(finishTime % (1000 * 60) / 1000);
  let stars = 'stars!';

  //inner function for the quirks of the English language
  //this could become very complicated in Russian or Spanish
  if (getStars() === 1) {
    stars = 'star!';
  }

  //Game data that is displayed to the user
  //I got a little lazy and didn't update to ES6 notation
  let gameData = 'You won in ' + minutes + ' minutes ' + seconds
  + ' seconds and in ' + moves + ' moves! You also earned ' + getStars()
  + ' ' + stars;
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('overlay-container').style.display = 'block';
  document.getElementById('game-data').innerHTML = gameData;

  //decorated reset button for restarting the game
  const btn = document.getElementById('play-button');
  btn.addEventListener('click', function() {
    //turns off the overlay and returns to main game view
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('overlay-container').style.display = 'none';

    deal(cards); //resets game variables
    gameWon = false; //prevents this from executing again
  })
} //end of gameWon function
