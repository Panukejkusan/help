import {board} from './exampleInput.js';

// const row = board[i];
// const column = board[i][j];
let position = findPosition(board);
let direction = generateDirection(); //będzie jedną z 4 opcji
const UP_RIGHT = 0;
const DOWN_RIGHT = 1;
const DOWN_LEFT = 2;
const UP_LEFT = 3;

console.log(position);
printBoard();

// for( let i = 0; i < 30; i++){
//   move();
//   console.log(position);
  
// }

// while(true) {
//   move(); // w tej funkcji sprawdzam direcrion i w jakim kierunku iść//
//   console.log(position);
//   // printBoard();
//   // console.log('');
// }



function findPosition(board) {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === '1') {
            board[row][col] = '0';
            console.log(`Your current position is row: ${row} and column: ${col}.`)
          return {row, col};
        }
      }
    }
    return null;
  }

function moveUpRight(){
  let currentField = board[position.row][position.col];
  let nextField = board[position.row - 1][position.col + 1];
  currentField = '0';
  if(nextField === '0'){
     //currentField wpisać 0
    nextField = '1'; // nextField wpisać 1
    position.row -= 1; //row i col ustawić na nowe współrzędne
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
    direction = generateDirection();// wylosować nowy kierunek
  }
}

function moveDownRight(){
  // const coordinates = {position.row, position.col};
  let currentField = board[position.row][position.col];
  let nextField = board[position.row + 1][position.col + 1];
  currentField = '0';
  if(nextField === '0'){
     //currentField wpisać 0
    nextField = '1'; // nextField wpisać 1
    position.row += 1; //row i col ustawić na nowe współrzędne
    position.col += 1;  
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
      nextField = '1';
  } else if(nextField === 'Y'){
    currentField = '0'; // currentField wpisać 0
    nextField = '1'; // nextField wpisać 1 zamiast Y
    direction = generateDirection();// wylosować nowy kierunek
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
  }
}

function generateDirection(){
  const randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

function move(){
  // const randomNumber = Math.floor(Math.random() * 4);
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
    for (let col = 0; col < board[row].length; col++) {
      // randomDirection();
      console.log(board[row].toString().replaceAll(',', ' '));  
    }
    // console.log('');
  }
}