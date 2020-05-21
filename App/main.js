/*
* Main script to execute game
*/

import * as controller from "./controller.js";
import * as helper from "./helper.js";
import schema from "./schema.js";

// create 2 players

console.log(helper.getBoardPlaceInfo(3));
let sal = new helper.Player("Sal");
helper.generateTurn(sal, helper.roll());