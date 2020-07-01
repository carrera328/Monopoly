import * as helper from './helper.js';
import schema from './schema.js';
import * as main from './main.js';


// creating the players and board
export function init() {
    let board = helper.playerBoard(schema.Board);
    let pregameModals = true;
    //helper.pregame();
    //helper.handleNewGameModal().then(helper.handleEnterNumPlayersModal).then(helper.enterCreatePlayersModal).then(helper.generateInputs);
    let players = helper.getPlayersAfterInput();
} 