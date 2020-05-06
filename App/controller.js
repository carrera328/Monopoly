import * as helper from './helper.js';
import * as schema from './schema.js';

export function generateEvent(player, incomingRoll) {
    let actualRoll = incomingRoll.rolled;
    console.log(`actual roll: ${actualRoll}`);
    let tileincomingRollOn = schema.default.Board[actualRoll];
    console.log(tileincomingRollOn.name);
    
    let choice = 'Yes';

    // input validation currently not working 5/5/2020

    if (tileincomingRollOn.owner == null || tileincomingRollOn.owner == undefined) {
        while (choice !='Yes'); {
            console.log(`you\'re gonna pay! ${choice}`);
            let input = prompt(`${player.name} would you like to purchase ${tileincomingRollOn.name} for $${tileincomingRollOn.price}?`);
            console.log(input);
        } 
       
    }
    
}

