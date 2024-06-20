
 

function createDynamicMatrix(rows, cols) {
    const matrix = [];
    let value = 1;

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(value++);
            console.log(row);
        }
        matrix.push(row);
    }

    return matrix;
}

// Function to print the matrix in a readable format
function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(' '));
    }
}

// Create a 3x3 matrix with incrementing values
const myDynamicMatrix = createDynamicMatrix(3, 3);
console.log("Matrix with incrementing values:");
printMatrix(myDynamicMatrix);

// Access and print the value at the 3rd row and 3rd column (index 2, 2)
const rowIndex = 2; // 3rd row (indexing starts from 0)
const colIndex = 2; // 3rd column (indexing starts from 0)
const value = myDynamicMatrix[rowIndex][colIndex];
console.log(`Value at row ${rowIndex + 1}, column ${colIndex + 1}:`, value);
