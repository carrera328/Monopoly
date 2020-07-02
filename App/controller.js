import * as helper from './helper.js';
import schema from './schema.js';
import * as main from './main.js';


// creating the players and board
export async function init() {
    let board = helper.playerBoard(schema.Board);
    let pregameModals = true;
    //helper.pregame();
    //helper.handleNewGameModal().then(helper.handleEnterNumPlayersModal).then(helper.enterCreatePlayersModal).then(helper.generateInputs);
    let players = await helper.getPlayersAfterInput();

    const gameDetails = {
        'players': players,
        'board': board,
    }

    return gameDetails;
}

export async function game() {
    let gameOver = false;
    let gameInputs = await init();
    let players = gameInputs.players;
    let board = gameInputs.board;
    console.log('boardBelow');
    console.log(board);
    helper.hide('inputRender');
    // main game logic
        helper.show("mainModal");
        helper.generateTurn(players[0], board);
    
}