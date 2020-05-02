import * as helper from './helper.js';


export function Player(name, age) {
    return {
        name: name,
        age: age,
        ownedDeeds: []
    }
}

export function generateEvent(player, tile) {
    console.log(`${player.name} has landed on ${tile}`);
}

