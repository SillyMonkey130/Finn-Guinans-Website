createBoard();
const tiles = document.querySelectorAll(".tiles");
let playerTurn = true;
let playerPieces = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],];
let computerPieces =[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],];
let count = 0;
let ships = ["red", "blue", "green"];
let rotation = 0
document.addEventListener('keydown', (event) =>{
    if (event.key == "z"){rotation = 1;}
    if (event.key == "c"){rotation = 0;}
});

tiles.forEach((tile, index) => {
    tile.addEventListener('click', (event) => {
        const row = Math.floor((index) / 10);
        const column = index % 10;
        if (count < 5){
            if (playerPieces[row][column] == 0){
                if (count == 0 && ((row > 0 && rotation == 0) || (column > 0 && rotation == 1))){
                    placePiece(2, count, "red", index);
                }
                else if (count == 1 && ((row > 1 && rotation == 0) || (column > 1 && rotation == 1))){
                    placePiece(3, count, "blue", index);
                }
                else if (count == 2 && ((row > 1 && rotation == 0) || (column > 1 && rotation == 1))){
                    placePiece(3, count, "green", index);
                }
                else if (count == 3 && ((row > 2 && rotation == 0) || (column > 2 && rotation == 1))){
                    placePiece(4, count, "orange", index);
                }
                else if (count == 4 && ((row > 3 && rotation == 0) || (column > 3 && rotation == 1))){
                    placePiece(5, count, "yellow", index);
                }
            }
        }
        else if (playerTurn){
            event.target.textContent = "X";
            computerBasic();
        }
        console.log(playerPieces);
    });
});

function placePiece(size, type, color, index, array){
    const row = Math.floor((index + 1) / 10);
    const column = index % 10;
    if (rotation == 0){
        for (let i = 0; i < size; i++){
            playerPieces[row - i][column] = type;
            tiles[index - (10 * i)].style.backgroundColor = color;
        }
    }
    else{
        for (let i = 0; i < size; i++){
            playerPieces[row][column - i] = type;
            tiles[index - i].style.backgroundColor = color;
        }
    }
    count++;
}
function createBoard(){
    const container = document.getElementById("container");
    for (let i = 0; i < 100; i++){
        const tile = document.createElement("div");
        tile.classList.add("tiles");
        container.appendChild(tile);
    }
}
function computerBasic(){
    const row = Math.floor(Math.random() * 10);
    const column = Math.floor(Math.random() * 10);
    const index = (row * 10) + column;
    playerTurn = true;
    if (playerPieces[row][column] != 0){
        tiles[index].textContent = "!";
    }
    else{
        tiles[index].textContent = "*";
    }
}