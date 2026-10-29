const inputBox = document.getElementById("inputBox");
const submitBtn = document.getElementById("submitBtn");
const answer = ("daddy").split("");
let attempt = 0;
createBoard();
const tiles = document.querySelectorAll(".tiles");

submitBtn.addEventListener("click", () => {
    let scale = checkColor(inputBox.value);
    colorDivs(tiles, scale, inputBox.value, (attempt * 5));
    attempt++;
    inputBox.value = "";
})

function checkColor(guess){
    const colors = new Array(5).fill("grey");
    let guessArr = guess.split("");
    for (let i = 0; i < 5; i++){
        if (guessArr[i] === answer[i]){
            colors[i] = "green";
            guessArr[i] = null;
            answer[i] = null;
        }
    }
    for (let i = 0; i < 5; i++){
        if (guessArr[i] != null){
            let index = answer.indexOf(guessArr[i]);
            if (index != -1){
                colors[i] = "yellow";
                guessArr[i] = null;
                answer[index] = null;
            }
        }
    }
    return colors;
}
function colorDivs(row, colors, guess, index){
    for (let i = index; i < (index + 5); i++){
        row.item(i).style.backgroundColor = colors[i % 5];
        row.item(i).textContent = guess[i % 5].toUpperCase();
        row.item(i).style.fontSize = "4em";
        row.item(i).style.textAlign = "center";
    }
}
function createBoard(){
    for (let i = 0; i < 30; i++){
        const tile = document.createElement("div");
        tile.classList.add("tiles") 
        const parentElement = document.getElementById("container");
        parentElement.appendChild(tile);
    }
}