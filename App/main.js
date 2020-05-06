/*
* Main script to execute game
*/

import * as controller from "./controller.js";
import * as helper from "./helper.js";
import schema from "./schema.js";

// create 2 players
let playerOne = helper.Player("Casey", 27, []);
let playerTwo = helper.Player("Sal", 27, []);

controller.generateEvent(playerTwo, helper.roll());