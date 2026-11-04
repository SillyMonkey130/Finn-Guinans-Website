const inputBox = document.getElementById("inputBox");
import { WORDS } from "./words.js";
const answer = WORDS[Math.floor(Math.random() * WORDS.length)];
let attempt = 0;   // First guess is attempt 0, then 1 then 2, ...
const ATTEMPTS = 6; 
createBoard();
const tiles = document.querySelectorAll(".tiles");
let gameOver = false;
let guess = [];

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && guess.length == 5 && attempt < ATTEMPTS && !gameOver){
        if (WORDS.includes(guess.join(""))){
            let scale = checkColor(guess);
            colorDivs(tiles, scale, guess, (attempt * 5));
            attempt++;
        }
        else{window.alert("Invalid word");}
        guess = [];
    }
    else if (/^[a-z]$/.test(event.key)) {
        guess.push(event.key.toLowerCase());
        updateBoard(tiles, guess, (guess.length - 1) + 5 * (attempt));
    }
    else if (event.key == "Backspace"){
        guess.pop();
    }
})

function checkColor(guess){
    const colors = new Array(5).fill("grey");
    let ansArr = answer.split("");
    let guessArr = [...guess];
    for (let i = 0; i < 5; i++){
        if (guessArr[i] === ansArr[i]){
            colors[i] = "green";
            guessArr[i] = null;
            ansArr[i] = null;
        }
    }
    if (colors.every(element => element === "green")){
        gameOver = true;
        setTimeout(() => {
            window.alert("You guessed " + answer + " in " + attempt + " attempts");
        }, 150);
    }
    for (let i = 0; i < 5; i++){
        if (guessArr[i] != null){
            let index = ansArr.indexOf(guessArr[i]);
            if (index != -1){
                colors[i] = "yellow";
                guessArr[i] = null;
                ansArr[index] = null;
            }
        }
    }
    return colors;
}
function colorDivs(row, colors, guess, index){
    for (let i = index; i < (index + 5); i++){
        row.item(i).style.backgroundColor = colors[i % 5];
        row.item(i).style.boxShadow = `3px 3px 3px ${colors[i % 5]}`;
    }
    if (attempt === (ATTEMPTS - 1) && !gameOver){
        setTimeout(() => {
            window.alert("You lost. Answer was " + answer);
            gameOver = true;
            console.log(gameOver);
        }, 150);
    }
}
function createBoard(){
    for (let i = 0; i < (ATTEMPTS * 5); i++){
        const tile = document.createElement("div");
        tile.classList.add("tiles") 
        const parentElement = document.getElementById("container");
        parentElement.appendChild(tile);
    }
}
function updateBoard(row, guess, index){
    row.item(index).textContent = guess[guess.length - 1].toUpperCase();
    row.item(index).style.fontSize = "4em";
    row.item(index).style.textAlign = "center";
}
