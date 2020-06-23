import * as helper from './helper.js';
import schema from './schema.js';
import * as main from './main.js';


// creating the players and board
export function init() {
    let board = helper.playerBoard(schema.Board);
    helper.handleNewGameModal();
        
}


