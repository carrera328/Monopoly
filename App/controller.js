import * as helper from './helper.js';
import * as schema from './schema.js';








export function generateEvent(player, rolled) {
    console.log(`${player.name} has rolled a ${rolled} and landed on ${schema.default.Board[rolled].name}`);
    
    // is property owned?
    // stopping point 5/3/2020
    console.log(`is property owned? : ${schema.default.Board[rolled].name} is owned: ${schema.default.Board[rolled].owner}`);
}

