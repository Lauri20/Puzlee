const puzzle = document.getElementById('puzzle');
const shuffleButton = document.getElementById('shuffleButton');
let emptyTile = { row: 3, col: 3 };

const createPuzzle = () => {
    let numbers = [...Array(15).keys()].map(n => n + 1);
    numbers.push(null);

    numbers.forEach((number, index) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.index = index;

        if (number) {
            tile.textContent = number;
        } else {
            tile.classList.add('empty');
        }

        tile.addEventListener('click', () => moveTile(index));
        puzzle.appendChild(tile);
    });
};

const moveTile = index => {
    const tile = document.querySelector(`.tile[data-index='${index}']`);
    const tileRow = Math.floor(index / 4);
    const tileCol = index % 4;

    if (
        (tileRow === emptyTile.row && Math.abs(tileCol - emptyTile.col) === 1) ||
        (tileCol === emptyTile.col && Math.abs(tileRow - emptyTile.row) === 1)
    ) {
        puzzle.children[emptyTile.row * 4 + emptyTile.col].classList.remove('empty');
        puzzle.children[emptyTile.row * 4 + emptyTile.col].textContent = tile.textContent;
        tile.classList.add('empty');
        tile.textContent = '';
        emptyTile = { row: tileRow, col: tileCol };
    }
};

const shuffle = () => {
    const tiles = Array.from(puzzle.children);
    const tilePositions = tiles.map(tile => tile.dataset.index);
    let shuffleCount = 100;

    while (shuffleCount > 0) {
        const validMoves = [];
        if (emptyTile.row > 0) validMoves.push((emptyTile.row - 1) * 4 + emptyTile.col);
        if (emptyTile.row < 3) validMoves.push((emptyTile.row + 1) * 4 + emptyTile.col);
        if (emptyTile.col > 0) validMoves.push(emptyTile.row * 4 + emptyTile.col - 1);
        if (emptyTile.col < 3) validMoves.push(emptyTile.row * 4 + emptyTile.col + 1);

        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        moveTile(randomMove);
        shuffleCount--;
    }
};

shuffleButton.addEventListener('click', shuffle);

createPuzzle();