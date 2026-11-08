import { WORDS } from "./words.js";
import words from './wordAnswer.js';
let randomWord = () => words[Math.floor(Math.random() * words.length)];
let answer = randomWord();
let attempt = 0;   // First guess is attempt 0, then 1 then 2, ...
const ATTEMPTS = 6; 
const WORD_LENGTH = 5;
createBoard();
const tiles = document.querySelectorAll(".tiles");
let gameOver = false;
let guess = [];
const colorOrder = ['white', 'grey', 'yellow', 'green'];
// TO DO:
// 1) Make the Reset button work

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        enter();
    }
    else if (/^[a-z]$/i.test(event.key) && guess.length < WORD_LENGTH) {
        updateBoard(event.key);
    }
    else if (event.key === "Backspace"){
        remove();
    }
})

function checkColor(guess){
    const colors = new Array(WORD_LENGTH).fill("grey");
    let ansArr = answer.split("");
    let guessArr = [...guess];
    for (let i = 0; i < WORD_LENGTH; i++){
        if (guessArr[i] === ansArr[i]){
            colors[i] = "green";
            guessArr[i] = null;
            ansArr[i] = null;
        }
    }
    for (let i = 0; i < WORD_LENGTH; i++){
        if (guessArr[i] !== null){
            let index = ansArr.indexOf(guessArr[i]);
            if (index !== -1){
                colors[i] = "yellow";
                guessArr[i] = null;
                ansArr[index] = null;
            }
        }
    }
    return colors;
}
function colorDivs(colors){
    let index = attempt * 5
    for (let i = index; i < (index + WORD_LENGTH); i++){
        tiles[i].style.backgroundColor = colors[i % WORD_LENGTH];
        tiles[i].style.boxShadow = `3px 3px 3px ${colors[i % WORD_LENGTH]}`;
        const letter = document.getElementById(guess[i % 5]);
        if (colorOrder.indexOf(letter.style.backgroundColor) < colorOrder.indexOf(colors[i % 5])){
            letter.style.backgroundColor = colors[i % WORD_LENGTH];
        }
    }
}
function createBoard(){
    const container = document.getElementById("container");
    for (let i = 0; i < (ATTEMPTS * WORD_LENGTH); i++){
        const tile = document.createElement("div");
        tile.classList.add("tiles");
        container.appendChild(tile);
    }
}
function updateBoard(letter){
    tiles[guess.length + WORD_LENGTH * attempt].textContent = letter.toUpperCase();
    guess.push(letter.toLowerCase());
}
function remove(){
    if (guess.length === 0) return;
    guess.pop();
    tiles[guess.length + WORD_LENGTH * attempt].textContent = "";
}

function enter(){
    const colors = checkColor(guess);
    if (guess.length == WORD_LENGTH && attempt < ATTEMPTS && !gameOver){
        if (WORDS.includes(guess.join(""))){
            colorDivs(colors);
            attempt++;
            guess = [];
        }
        else{window.alert("Invalid word");}
    }
    if (colors.every(element => element === "green")){endGame(`You guessed ${answer} in ${attempt} attempts`);}
    else if (attempt === ATTEMPTS) endGame(`You lost. Answer was ${answer}`);
}
function endGame(message) {
  gameOver = true;
  setTimeout(() => alert(message), 150);
}
function reset(){
    for (let i = 0; i < ATTEMPTS * WORD_LENGTH; i++){
        tiles.item(i).style.backgroundColor = "bisque";
        tiles.item(i).style.boxShadow = `3px 3px 3px hsl(33, 90%, 75%)`;
        tiles.item(i).textContent = "";
    }
    const letter = document.querySelectorAll(".letter");
    letter.forEach(element => {
        element.style.backgroundColor = "white";});
    attempt = 0;
    guess = [];
    gameOver = false;
    answer = randomWord();
}
window.remove = remove;
window.updateBoard = updateBoard;
window.enter = enter;
window.reset = reset;
