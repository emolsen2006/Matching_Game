# Memory game

### Description

This project is a 4 x 4 card flipping game. The game logic is event driven by
each mouse click on an un-flipped card. This project is largely intended as a
means of integrating Javascript, CSS, and HTML into one cohesive package using
Git and including a README.md (this document).

Objectives:
 - Clicking the card flips is and adds to an **array** for comparison.
 - Clicking a second card locks future card flips until comprison is complete.
 - When cards match they both stay in the array second card is **pushed** into array.
 - When cards do not match the stored card is **popped** from array and returned.
 - Game is won when the stored array **equals 16**.
 - Javascript slows the code down to allow for **_user memory_** and **_animation_**.
 - A moves and timer variable are triggered by the first mouse clickers.
 - A comparison function launches which evaluates a **star** performance.
 - The shuffle feature was provided by Udacity which originated from stackoverflow.

## Points for Improvement

This game may have been better suited with an Object Oriented design with a
card class containing a flip and compare method. The deck could have had a
shuffle and reset method. That would have simplified the logic of the game JS
which could have focused on event listeners. The way it is now, it kind of
exploded in complexity.

### Dependencies

The application uses Font Awesome which requires an external link. I'm in
Iraq and that feature sometimes killed the functionality for browsers which
hadn't cached this capability.

### Future Uses

The intent is to hang this project on my public web server and see if my
two boys (8 and 4) can figure out how to play it. I may take a version of This
in the future and turn it into a more complicated web card game once I
develop on OOD that fits it well.
