/*
* Main script to execute game
*/

import * as controller from "./controller.js";
import * as helper from "./helper.js";
import schema from "./schema.js";



// create 2 players
export function hello() {
    alert("HELLO VIETNAM!")
}

// document.getElementsByClassName("btn").forEach(element => {
//     element.addEventListener('click', hello);    
// });

console.log(document.getElementsByClassName("btn"));
for (let i = 0; i < document.getElementsByClassName("btn").length; i++) {
    document.getElementsByClassName("btn")[i].addEventListener('click', hello);
}
let gameBoard = helper.playerBoard(schema.Board);

//console.log(helper.getBoardPlaceInfo(3));
let sal = new helper.Player("Sal");
helper.generateTurn(sal, gameBoard);
console.log(schema.Board);

document.getElementById("mainBtn").addEventListener('click', function() {
    
    helper.prepareModal(sal, gameBoard);
});