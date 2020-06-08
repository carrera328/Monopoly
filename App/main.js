/*
* Main script to execute game
*/

import * as controller from "./controller.js";
import * as helper from "./helper.js";
import schema from "./schema.js";



// create 2 players
function createPlayers(listOfPlayers) {
    let createdPlayers = [];
    if (listOfPlayers) {
        for (let i = 0; i < listOfPlayers.length; i++) {
            createdPlayers.push(helper.Player(listOfPlayers[i]));         
        }
        return createdPlayers;
    }

    return;
}

// document.getElementsByClassName("btn").forEach(element => {
//     element.addEventListener('click', hello);    
// });

console.log(document.getElementsByClassName("btn"));
// for (let i = 0; i < document.getElementsByClassName("btn").length; i++) {
//     document.getElementsByClassName("btn")[i].addEventListener('click', hello);
// }
let gameBoard = helper.playerBoard(schema.Board);

//console.log(helper.getBoardPlaceInfo(3));
let sal = new helper.Player("Sal");
helper.generateTurn(sal, gameBoard);
console.log(schema.Board);

document.getElementsByClassName("btn")[3].addEventListener('click', function() {
    helper.generateTurn(sal, gameBoard);
});

document.getElementById("mainBtn").addEventListener('click', function() {
    
    helper.prepareModal(sal, gameBoard);
});

// hiding modal while working on front page
document.getElementById("mainModal").style.display = 'none';

let arrayOfInputs = document.getElementsByClassName("inputs");
console.log(arrayOfInputs);

document.getElementById("submitPlayersBtn").addEventListener('click', function() {
    helper.createPlayers();
})