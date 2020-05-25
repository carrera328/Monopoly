import * as schema from './schema.js';
import * as controller from './controller.js';
import * as main from './main.js';

export function test() {
    return document.createElement("h1");
}

export function getBoardPlaceInfo(boardPlace, copyBoard) {
   // console.log(schema.default.Board[boardPlace]);
    return copyBoard[boardPlace];            
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

export function playerBoard(templateBoard) {
    console.log('this is template board');
    console.log(templateBoard);
    let newBoard = JSON.parse(JSON.stringify(templateBoard));
    return newBoard;
}

export function generateTurn(player, gameBoard) {
    
    let roll = this.roll();
    let timesRolledDoubles = 0;
    let currentProperty = this.getBoardPlaceInfo(player.placeOnboard + roll.rolled, gameBoard);

    let placeOnboard = player.placeOnboard + roll.rolled;
    console.log(player.name + " rolled a " + roll.rolled);
    player.placeOnboard = placeOnboard;
    console.log('current property: ');
    console.log(currentProperty);
    console.log('current place on board');
    console.log(player.placeOnboard);
    console.log('total spaces on board ' + gameBoard.length);
    
    if (player.placeOnboard > gameBoard.length - 12) {
        if (player.placeOnboard  > gameBoard.length) {
            player.placeOnboard = (player.placeOnboard + roll.rolled) - gameBoard.length;
        }
    } else {
        player.placeOnboard = placeOnboard;
    }
    
    
    this.prepareModal(player,gameBoard);
    
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

// prep modal

export function prepareModal(player, gameBoard) {
    let modal = document.getElementById("mainModal");
    // if (modal.style.display === "none") {
        modal.style.display = "block";
        let heading = document.getElementById("nameOfBoardPlace");
        let price = document.getElementsByClassName("upperStuff");
        price.innerHTML = gameBoard[player.placeOnboard].price;
        heading.innerHTML = gameBoard[player.placeOnboard].name;
        let liBoxes = document.getElementsByTagName("li");
        let currentProperty = this.getBoardPlaceInfo(player.placeOnboard, gameBoard);
        document.getElementById("mainModal").style.backgroundColor = currentProperty.color;
        console.log(currentProperty);
        console.log(liBoxes);
        console.log(currentProperty.rent);
        let  rentValues = Object.values(Object.values(currentProperty.rent));
        rentValues = rentValues.sort((a, b) => {return a - b});
        console.log(rentValues);
        let secondHeading = document.getElementsByClassName("upperStuff")[0];
        secondHeading.innerHTML = '$'+currentProperty.price;
        for (let i = 0; i < liBoxes.length; i++) {
            if (i != 0 && i != 6 && i!= 1) {
                liBoxes[i].innerHTML = ` Rent with ${i - 1} house(s) ${rentValues[i]}` ;
            } else if (i == 1) {
                liBoxes[i].innerHTML = `Rent with Monopoly $${rentValues[i]}`;
            } else if (i == 0) {
                liBoxes[i].innerHTML = `Rent $${rentValues[i]}`;
            } else {
                liBoxes[i].innerHTML = `Rent with Hotel $${rentValues[i]}`;
            }
        }
    // } else {
    //     modal.style.display = "none";
    // }

    // rent info 

    

    
    

}