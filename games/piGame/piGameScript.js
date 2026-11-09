const container = document.getElementById("container");

const NUMBERS = 100;
let current = 0;
let guess = [];
let PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
let gameOver = false;
let correct = 0;
createBoard();

const tiles = document.querySelectorAll(".tiles");
updateBoard('3');
updateBoard('.');

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        enter();
    }
    else if (/^[0-9]$/i.test(event.key) && current < NUMBERS) {
        updateBoard(event.key);
    }
    else if (event.key === "Backspace"){
        remove();
    }
})


function createBoard(){
    for (let i = 0; i < NUMBERS; i++){
        const tile = document.createElement("div");
        tile.classList.add("tiles");
        container.appendChild(tile);
    }
}

function updateBoard(number){
    tiles[current].textContent = number;
    guess.push(number);
    current++;
}
function remove(){
    if (current <= 2) return;
    guess.pop();
    tiles[current - 1].textContent = "";
    current--;
}
function enter(){
    if (!gameOver){
        for (let i = 2; i < current; i++){
            if (guess[i] === PI[i]){
                tiles[i].style.backgroundColor = "lightGreen";
                tiles[i].style.boxShadow = "3px 3px 5px darkGreen";
                correct++;
            }
            else{
                tiles[i].textContent = PI[i];
                tiles[i].style.color = "red";
                tiles[i].style.backgroundColor = "grey";
                tiles[i].style.boxShadow = "3px 3px 5px black";
            }
        }
        for (let i = current; i < NUMBERS; i++){
            tiles[i].textContent = PI[i];
            tiles[i].style.color = "tomato";
        }
        gameOver = true;
    }
}
function reset(){
    for (let i = 2; i < NUMBERS; i++){
            tiles[i].textContent = "";
            tiles[i].style.backgroundColor = "bisque";
            tiles[i].style.boxShadow = "3px 3px 5px hsl(33, 90%, 75%)";
            tiles[i].style.color = "black";
    }
    current = 2;
    guess = ['3', '.'];
    gameOver = false;
    correct = 0;
}