import * as schema from './schema.js';
export function test() {
    return document.createElement("h1");
}

export function getBoardPlaceInfo(boardPlace) {
   // console.log(schema.default.Board[boardPlace]);
    return schema.default.Board[boardPlace];            
}

export function Player(name) {
    return {
        name: name,
        placeOnboard: 0,
        money: 1500,
        ownedDeeds: []
    }
}

export function roll() {
    let die1 = Math.ceil(Math.random() * 6);
    let die2 = Math.ceil(Math.random() * 6);
    return {
        "die1": die1,
        "die2": die2,
        "rolled": die1 + die2,
        "doubles": die1 == die2 ? true:false
    }
}

export function generateTurn(player) {
    // doubles stuff
    let roll = this.roll();
    let timesRolledDoubles = 0;
    let currentProperty = this.getBoardPlaceInfo(player.placeOnboard + roll.rolled);
    let placeOnboard = player.placeOnboard + roll.rolled;

    console.log('current property: ');
    console.log(currentProperty);


    player.placeOnboard = placeOnboard;
    if (player.money > currentProperty.price && currentProperty.owner == null) {
    
        alert("this property is available for purchaae");
        
        let answer = prompt("Would you like to purchase this property? Y or y to Purchase or N or to decline");
        
        // while (!answer.includes('Y')) {
        //     answer = prompt("Would you like to purchase this property? Y or y to Purchase or N or to decline");
        // }
        if (answer.includes('y') || answer.includes("Y")) {
            alert(`congratulations ${player.name} you have just purchased ${currentProperty.name} for $${currentProperty.price}`);
            alert(`$${player.money} - $${currentProperty.price} = $${player.money - currentProperty.price}`);
            currentProperty.owner = player;
            console.log(currentProperty);
            player.money = player.money - currentProperty.price;

            
        }

        
    }
    
    


    if (roll.doubles) {
        timesRolledDoubles++;
        console.log(roll);
        console.log(`${player.name} has rolled doubles! roll again`);
        let secondRoll = this.roll();
        console.log(secondRoll);
        secondRoll.doubles ? console.log(player.name +  " : rolled another double ") : console.log('didn\'t roll a double wit your stupid ass ')
        if (secondRoll.doubles) {
            timesRolledDoubles++;
            console.log(`${player.name} has rolled doubles twice my guy`);
            let thirdRoll = this.roll();
            console.log(thirdRoll);
            if (thirdRoll.doubles) {
                timesoRlledDoubles++;
                console.log('you have rolled doubles 3 times GO TO JAIL!');
                console.log('times rolled doubles: ' + timesRolledDoubles);
            } else {
                console.log('You have rolled 3 times without a double'); 
            }
            
        }
    }
}