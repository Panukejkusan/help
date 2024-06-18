
const row0 = [34, 21, 32, 41, 25];
const row1 = [14, 42, 43, 14, 31];
const row2 = [54, 45, 52, 42, 23];
const row3 = [33, 15, 51, 31, 35];
const row4 = [21, 52, 33, 13, 23];
const table = [row0, row1, row2, row3, row4];
const startingField = row0[0]; 
const nextField = start(table);


start(table);



// for(nextField; nextField == previousField; i++ ){
//     // let previousField = nextField;
//     // if(nextField == nextField){
//     //     console.log('STOP!!! TREASURE FOUND!!!')
//     // } 
// }

function start(table, startingField){
    console.log(startingField);
    const startingFieldString = JSON.stringify(startingField);
    const startingFieldArray = startingFieldString.split('');
    const rowNumber = startingFieldArray[0];
    const columnNumber = startingFieldArray[1];
    const nextField = table[rowNumber - 1][columnNumber - 1];
    console.log(nextField);
    const path = [];
    const previousField = path.length - 1;
    path.push(nextField);
    if(nextField == previousField){
        console.log('GRATULACJE PANIE ZŁOTY SKARB ZNALAZŁEŚ');
    } else {
        findNextField();
    }
    console.log(row2);
    function findNextField(){
        const previousFieldString = JSON.stringify(previousField);
        const previousFieldArray = previousFieldString.split('');
        console.log()

    }
    return nextField;
}

function findTreasure(){
    // findNextField(tab)
}
//                   +-------------------------+
//                   ¦ 34 ¦ 21 ¦ 32 ¦ 41 ¦ 25  ¦
//                   +----+----+----+----+-----¦
//                   ¦ 14 ¦ 42 ¦ 43 ¦ 14 ¦ 31  ¦
//                   +----+----+----+----+-----¦
//                   ¦ 54 ¦ 45 ¦ 52 ¦ 42 ¦ 23  ¦
//                   +----+----+----+----+-----¦
//                   ¦ 33 ¦ 15 ¦ 51 ¦ 31 ¦ 35  ¦
//                   +----+----+----+----+-----¦
//                   ¦ 21 ¦ 52 ¦ 33 ¦ 13 ¦ 23  ¦
//                   +-------------------------+

// Do you like treasure hunts? 
// In this problem you are to write a program to explore the above array for a treasure. 
// The values in the array are clues. 
// Each cell contains an integer between 11 and 55;
// for each value the ten's digit represents the row number and 
// the unit's digit represents the column number of the cell containing the next clue. 
// Starting in the upper left corner (at 1,1), use the clues to guide your search of the array. 
// (The first three clues are 11, 34, 42). 
// The treasure is a cell whose value is the same as its coordinates. 
// Your program should output the cells it visits during its search 
// and a message indicating where you found the treasure.

// const columns = [34, 21, 32, 41, 25];
// const rows = [34, 14, 54, 33, 21];
 // Function to create a matrix with incrementing values

// function createMatrix(rows, columns) {
//     const matrix = [];
//     let value = undefined;
//         for(let i = 0; i < rows; i++){
//             const row = []
//             for(let j = 0; j < columns; j++){
//                 row.push(value++);
//             }
//             matrix.push(row);
//         } 
// }

// const matrix = [];
// for(let i = 0; i < 5; i++) {
//     matrix[i] = new Array(5);
// }
// console.log(matrix[0][0]);

