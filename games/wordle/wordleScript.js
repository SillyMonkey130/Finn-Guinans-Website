import { WORDS } from "./words.js";
import words from './wordAnswer.js';
const answer = words[Math.floor(Math.random() * words.length)];
let attempt = 0;   // First guess is attempt 0, then 1 then 2, ...
const ATTEMPTS = 6; 
createBoard();
const tiles = document.querySelectorAll(".tiles");
let gameOver = false;
let guess = [];

// TO DO:
// 1) Make the Reset button work
// 2) Make it so the colors on the keyboard do not downgrade.

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        enter();
    }
    else if (/^[a-z]$/.test(event.key) && guess.length < 5) {
        updateBoard(event.key);
    }
    else if (event.key == "Backspace"){
        remove();
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
        document.getElementById(guess[i % 5]).style.backgroundColor = colors[i % 5];
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
function updateBoard(letter){
    let value = tiles.item((guess.length) + 5 * (attempt));
    guess.push(letter.toLowerCase());
    value.textContent = guess[guess.length - 1].toUpperCase();
}
function remove(){
    if (guess.length === 0) return;
    guess.pop();
    tiles.item(guess.length + 5 * attempt).textContent = "";
}

function enter(){
    if (guess.length == 5 && attempt < ATTEMPTS && !gameOver){
        if (WORDS.includes(guess.join(""))){
            colorDivs(tiles, checkColor(guess), guess, (attempt * 5));
            attempt++;
            guess = [];
        }
        else{window.alert("Invalid word");}
    }
}
window.remove = remove;
window.updateBoard = updateBoard;
window.enter = enter;
