const inputBox = document.getElementById("inputBox");
import { WORDS } from "./words.js";
const answer = WORDS[Math.floor(Math.random() * WORDS.length)];
let attempt = 0;   // First guess is attempt 0, then 1 then 2, ...
const ATTEMPTS = 6; 
console.log(answer);
createBoard();
const tiles = document.querySelectorAll(".tiles");

document.addEventListener("keydown", (event) => {
    guessArr = inputBox.value.split("");
    if (event.key === "Enter" && guessArr.length == 5 && attempt < ATTEMPTS){
        if (WORDS.includes(guessArr.join(""))){
            let scale = checkColor(guessArr);
            colorDivs(tiles, scale, inputBox.value.split(""), (attempt * 5));
            attempt++;
        }
        else{
            window.alert("Invalid word");
        }
        inputBox.value = "";
        guessArr.length = 0;
    }
})



function checkColor(guess){
    const colors = new Array(5).fill("grey");
    let ansArr = answer.split("");
    for (let i = 0; i < 5; i++){
        if (guess[i] === ansArr[i]){
            colors[i] = "green";
            guess[i] = null;
            ansArr[i] = null;
        }
    }
    if (colors.every(element => element === "green")){
        setTimeout(() => {
            window.alert("You guessed " + answer + " in " + attempt + " attempts");
        }, 150);
    }
    for (let i = 0; i < 5; i++){
        if (guess[i] != null){
            let index = ansArr.indexOf(guess[i]);
            if (index != -1){
                colors[i] = "yellow";
                guess[i] = null;
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
        row.item(i).textContent = guess[i % 5].toUpperCase();
        row.item(i).style.fontSize = "4em";
        row.item(i).style.textAlign = "center";
    }
    if (attempt === (ATTEMPTS - 1)){
        setTimeout(() => {
            window.alert("You lost. Answer was " + answer);
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
