const board = document.querySelectorAll(".box");
const winBox = document.getElementById("winBox");
const sound = new Audio('../../sounds/winningSound.mp3');

let isBlueTurn = false;
const wins = [[0, 1, 2],
              [3, 4, 5],
              [6, 7, 8],
              [0, 3, 6],
              [1, 4, 7],
              [2, 5, 8],
              [0, 4, 8],
              [2, 4, 6],];
let redPlays = [];
let bluePlays = [];
let plays = 0;

board.forEach((box, index) => {
    box.addEventListener('click', (event) => {
         if (isBlueTurn && !(event.target.classList.contains('boxBlue') || event.target.classList.contains('boxRed')) && plays >= 0) {
            event.target.classList.add('boxBlue');
            isBlueTurn = !isBlueTurn;
            bluePlays.push(index);
            checkWin(bluePlays, "BLUE");
        } 
        else if (!isBlueTurn && !(event.target.classList.contains('boxBlue') || event.target.classList.contains('boxRed')) && plays >= 0) {
            event.target.classList.add('boxRed');
            isBlueTurn = !isBlueTurn;
            redPlays.push(index);
            checkWin(redPlays, "RED");
        } 
    });
});

function checkWin(array, winner){
    plays++;
    wins.forEach((winPaths) => {
        let count = 0;
        winPaths.forEach((indexWin) => {
            array.forEach((indexPlace) => {
                if (indexPlace === indexWin){
                    count++;
                }
            });
        });
        if (count === 3){
            sound.currentTime = 0;
            sound.play();
            winBox.style.display = `flex`;
            winBox.textContent = `${winner} WINS`
            plays = -1;
        }
        count = 0;
    });
    if (plays == 9){
        winBox.style.display = `flex`;
        winBox.textContent = `IT'S A TIE`
    }
}
function reset(){
    redPlays = [];
    bluePlays = [];
    isBlueTurn = false;
    board.forEach((element) => {
        element.classList.remove('boxBlue');
        element.classList.remove('boxRed');
        winBox.style.display = `none`;
        winBox.textContent = ``;
    })
    plays = 0;
}