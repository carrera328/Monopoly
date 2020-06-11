import * as helper from './helper.js';
import schema from './schema.js';
import * as main from './main.js';


// creating the players and board
export function init() {
    let players =  helper.createPlayers();
    let board = helper.playerBoard(schema.Board);
    helper.assignTurn(players);
}
