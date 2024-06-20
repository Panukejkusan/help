import {board} from './exampleInput.js';

// const row = board[i];
// const column = board[i][j];
let position = findPosition(board);
let direction = generateDirection(); //będzie jedną z 4 opcji
const UP_RIGHT = 0;
const DOWN_RIGHT = 1;
const DOWN_LEFT = 2;
const UP_LEFT = 3;


for( let i = 0; i < 10; i++){
  move();
  printBoard();
  console.log(position);
}



// while(true) {
//   move(); // w tej funkcji sprawdzam direcrion i w jakim kierunku iść//
//   console.log(position);
//   // printBoard();
// }

function findPosition(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === '1') {
          // board[row][col] = '0';
          // console.log(`Your current position is row: ${row} and column: ${col}.`)
        return {row, col};
      }
    }
  }
  return null;
}

function generateDirection(){
  const randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

function changePosition(direction){
  if (direction === 0) {
    position.row -= 1;
    position.col += 1;
  } else if(direction === 1) {
    position.row += 1;
    position.col += 1;
  } else if(direction === 2) {
    position.row += 1;
    position.col -= 1;
  } else if(direction === 3) {
    position.row -= 1;
    position.col -= 1;
  } 
}

function move(){
  if(direction === 0) {
    moveUpRight();
  } else if(direction === 1){
    moveDownRight();
  } else if(direction === 2){
    moveDownLeft();
  } else if(direction === 3){
    moveUpLeft();
  }
}

function printBoard(){
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) { // TUUUU JEST PROBLEMMMM GDZIEŚ CHYBA
      }
      console.log(board[row].toString().replaceAll(',', ' '));
    }
  }

function moveUpRight(){
  let currentField = board[position.row][position.col];
  let nextField = board[position.row - 1][position.col + 1];
  currentField = '0';
  if(nextField === '0'){
     
    nextField = '1'; 
    position.row -= 1; 
    position.col += 1;
  } else if(nextField === 'X'){
      let neighbourLeft = board[position.row][position.col - 1]; //neighbour nextFielda
      let neighbourDown = board[position.row + 1][position.col]; // neighbour nextFielda
       if(neighbourDown === 'X' && neighbourLeft !== 'X'){
        // moveUpLeft();
        position.row -= 1;
        position.col -= 1;
        direction = UP_LEFT;
      } else if(neighbourLeft === 'X' && neighbourDown !== 'X'){
        // moveDownRight();
        position.row += 1;
        position.col += 1;
        direction = DOWN_RIGHT;
      } else {
        // moveDownLeft();
        position.row += 1;
        position.col -= 1;
        direction = DOWN_LEFT;
      }
      nextField = '1';
  } else if(nextField === 'Y'){
    currentField = '0'; // currentField wpisać 0
    nextField = '1'; // nextField wpisać 1 zamiast Y
    position.row = 
    direction = generateDirection();// wylosować nowy kierunek
    changePosition(direction);
  }
}

function moveDownRight(){
  // const coordinates = {position.row, position.col};
  let currentField = board[position.row][position.col];
  let nextField = board[position.row + 1][position.col + 1];
  board[position.row - 1][position.col - 1] = '0'; //currentField wpisać 0
  if(nextField === '0'){    
    board[position.row][position.col] = '1'; // nextField wpisać 1
    position.row += 1; //row i col ustawić na nowe współrzędne
    position.col += 1; 
    // printBoard();
  } else if(nextField === 'X'){
      let neighbourLeft = board[position.row + 1][position.col]; //neighbour nextFielda
      let neighbourUp = board[position.row][position.col + 1]; // neighbour nextFielda
       if(neighbourUp === 'X' && neighbourLeft !== 'X'){
        // moveDownLeft();
        position.row += 1;
        position.col -= 1;
        direction = DOWN_LEFT;
      } else if(neighbourLeft === 'X' && neighbourUp !== 'X'){
        // moveUpRight();
        position.row -= 1;
        position.col += 1;
        direction = UP_RIGHT;
      } else {
        // moveUpLeft();
        position.row -= 1;
        position.col -= 1;
        direction = UP_LEFT;
      }
  } else if(nextField === 'Y'){
    board[position.row - 1][position.col - 1] = '0'; // currentField wpisać 0
    direction = generateDirection();// wylosować nowy kierunek
    changePosition(direction);
    board[position.row][position.col] = '1'; // nextField wpisać 1 zamiast Y
    
  }
}

function moveDownLeft(){
  let currentField = board[position.row][position.col];
  let nextField = board[position.row + 1][position.col - 1];
  currentField = '0';
  if(nextField === '0'){
     //currentField wpisać 0
    nextField = '1'; // nextField wpisać 1
    position.row += 1; //row i col ustawić na nowe współrzędne
    position.col -= 1;  
    // printBoard();
  } else if(nextField === 'X'){
      let neighbourRight = board[position.row][position.col + 1]; //neighbour nextFielda
      let neighbourUp = board[position.row - 1][position.col]; // neighbour nextFielda
       if(neighbourUp === 'X' && neighbourRight !== 'X'){
        // moveDownRight();
        position.row += 2;
        position.col += 1;
        direction = DOWN_RIGHT;
      } else if(neighbourRight === 'X' && neighbourUp !== 'X'){
        // moveUpLeft();
        position.row += 1;
        position.col -= 1;
        direction = UP_LEFT;
      } else {
        // moveUpRight();
        position.row -= 1;
        position.col += 1;
        direction = UP_RIGHT;
      }
      nextField = '1';
  } else if(nextField === 'Y'){
    currentField = '0'; // currentField wpisać 0
    nextField = '1'; // nextField wpisać 1 zamiast Y
    direction = generateDirection();// wylosować nowy kierunek
    changePosition(direction);
  }
}

function moveUpLeft(){
  let currentField = board[position.row][position.col];
  let nextField = board[position.row - 1][position.col - 1];
  currentField = '0';
  if(nextField === '0'){
     //currentField wpisać 0
    nextField = '1'; // nextField wpisać 1
    position.row -= 1; //row i col ustawić na nowe współrzędne
    position.col -= 1; 
    // printBoard(); 
  } else if(nextField === 'X'){
      let neighbourRight = board[position.row][position.col + 1]; //neighbour nextFielda
      let neighbourDown = board[position.row + 1][position.col]; // neighbour nextFielda
       if(neighbourDown === 'X' && neighbourRight !== 'X'){
        position.row -= 1;
        position.col += 1;
        direction = UP_RIGHT;
      } else if(neighbourRight === 'X' && neighbourDown !== 'X'){
        position.row += 1;
        position.col -= 1;
        direction = DOWN_LEFT;
      } else {
        position.row += 1;
        position.col += 1;
        direction = DOWN_RIGHT;
      }
      nextField = '1';  
  } else if(nextField === 'Y'){
    currentField = '0'; // currentField wpisać 0
    nextField = '1'; // nextField wpisać 1 zamiast Y
    direction =  generateDirection();// wylosować nowy kierunek
    changePosition(direction);
  }
}