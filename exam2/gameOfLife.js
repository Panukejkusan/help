const cellSize = 10;
const rows = 20;
const cols = 20;

let grid = createGrid(rows, cols);

function createGrid(rows, cols) {
    const grid = [];
    for (let row = 0; row < rows; row++) {
        const rowArr = [];
        for (let col = 0; col < cols; col++) {
            rowArr.push(Math.random() > 0.8 ? 1 : 0); // Randomly set cells to alive
        }
        grid.push(rowArr);
    }
    return grid;
}

function printGrid(grid) {
    console.clear();
    for (let row = 0; row < grid.length; row++) {
        console.log(grid[row].map(cell => (cell ? '■' : '□')).join(' '));
    }
}

function getNeighborCount(grid, row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                count += grid[newRow][newCol];
            }
        }
    }
    return count;
}

function nextGeneration(grid) {
    const newGrid = createGrid(rows, cols);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const neighbors = getNeighborCount(grid, row, col);
            if (grid[row][col] === 1) {
                newGrid[row][col] = neighbors === 2 || neighbors === 3 ? 1 : 0;
            } else {
                newGrid[row][col] = neighbors === 3 ? 1 : 0;
            }
        }
    }
    return newGrid;
}

function update() {
    grid = nextGeneration(grid);
    printGrid(grid);
    setTimeout(update, 1000); // Update every second
}

// Initialize and start the game
printGrid(grid);
setTimeout(update, 1000);
