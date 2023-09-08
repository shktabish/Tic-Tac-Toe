'use strict'

let turn = "X"
let gameInProgress = true;
let playerOneScore = 0;
let playerTwoScore = 0;
const boxes = document.querySelectorAll('.box');
const clickSound = new Audio('music/click sound.mp3');
//const winSound = new Audio('music/winning sound.mp3');

function changeTurn() {
    turn = (turn === "X") ? "O" : "X";
}

function checkForWinner() {
    const winPos = [
        [0,1,2],[3,4,5],
        [6,7,8],[0,3,6],
        [1,4,7],[2,5,8],
        [0,4,8],[2,4,6],
    ];

    winPos.forEach((e) => {
        if(boxes[e[0]].innerHTML === boxes[e[1]].innerHTML && boxes[e[2]].innerHTML === boxes[e[1]].innerHTML && boxes[e[2]].innerHTML !== "" ) {
            gameInProgress = false;
            //winSound.play();

            // Add the 'animate' class to the winning positions
            for(let i=0; i<3; i++) {
                boxes[e[i]].classList.add('animate');
            }

            // Incrementing the score of the winner
            if(boxes[e[0]].innerHTML === "X") {
                playerOneScore++;
                document.querySelector('.p1').innerHTML = playerOneScore;
            } else {
                playerTwoScore++;
                document.querySelector('.p2').innerHTML = playerTwoScore;
            }

            // Remove the 'animate' class after a short delay
            setTimeout(() => {
                for (let i = 0; i < 3; i++) {
                    boxes[e[i]].classList.remove('animate');
                }
            }, 1500); //1500ms or 1.5s
        }
    });
}

function initGame() { 
    Array.from(boxes).forEach((element) => {
        element.addEventListener('click', () => {
            if(element.innerHTML == ""  && gameInProgress) {
                element.innerHTML = turn;
                clickSound.play();
                checkForWinner();
                changeTurn();
            }
        });
    });
}

document.querySelector('.playAgain').addEventListener('click', () => {
    Array.from(boxes).forEach((e) => {
    e.innerHTML = "";
    turn = "X";
    gameInProgress = true;
    initGame();
    });
});

document.querySelector('.restart').addEventListener('click', () => {
    Array.from(boxes).forEach((e) => {
        e.innerHTML = "";
        turn = "X";
        gameInProgress = true;
        playerOneScore = 0;
        playerTwoScore = 0;
        document.querySelector('.p1').innerHTML = playerOneScore;
        document.querySelector('.p2').innerHTML = playerTwoScore;
        initGame();
    });
});

initGame();