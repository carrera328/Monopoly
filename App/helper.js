import * as schema from './schema.js';
import * as controller from './controller.js';
import * as main from './main.js';

export function createPlayers() {
    // ask user how many players are playing and then create the players based on name
    // removing this functionality for testing, will create players by hard coding in mean time
    //let numPlayers = prompt("How many players are players are player please enter 1 - 4 players");
    
    let numPlayers = 2;
    if (isNaN(numPlayers) || (numPlayers < 1 || numPlayers > 4)) {
        do {
            numPlayers = prompt("enter a valid number of players pls");
        } while (isNaN(numPlayers) || (numPlayers < 1 || numPlayers > 4));
    }
    //alert(`Number of players for this session: ${numPlayers}`);
    let numberPlayersArr = [];
    for (let i = 0; i < numPlayers; i++) {
        //numberPlayersArr[i] = new Player(prompt(`Please enter player ${i + 1}\'s name`));
        numberPlayersArr[i] = new Player(`Player ${i}`);
    }

    console.log(`Players created`);
    console.log(numberPlayersArr);

    return numberPlayersArr;
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
    
    console.log(templateBoard);
    let newBoard = JSON.parse(JSON.stringify(templateBoard));
    console.log(newBoard);
    return newBoard;
}

export function generateTurn(player, gameBoard) { 
    // open roll modal
    
    
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
    
    // prep the modal
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
                liBoxes[i].innerHTML = ` Rent with ${i - 1} house(s) $${rentValues[i]}` ;
            } else if (i == 1) {
                liBoxes[i].innerHTML = `Rent with Monopoly $${rentValues[i]}`;
            } else if (i == 0) {
                liBoxes[i].innerHTML = `Rent $${rentValues[i]}`;
            } else {
                liBoxes[i].innerHTML = `Rent with Hotel $${rentValues[i]}`;
            }
        }

        console.log(document.getElementsByClassName("btn")[2].addEventListener('click', function() {
            modal.style.display = 'none';
        }));
    // } else {
    //     modal.style.display = "none";
    // }
    // rent info 
}

export function prerRollModal(player, gameBoard) {

}

export function assignTurn(players) {
    let firstRollOutcomes = new Map();
    for (let i in players) {
        firstRollOutcomes.set(players[i], this.roll().rolled);
    }
    console.log(firstRollOutcomes);
}

// create game object

export function Game(players, board) {
    let gameOver = false;
    
    // who rolls first functionality
    
    // generateTurns until one player wins or quit game is clicked

    if (!gameOver) {
        do {
            //generateTurn(players, board);//
            //for (let i in players) {

            
        } while (!gameOver)
    }
    
    // invoke post game
}

export function handler() {
    generateInputs();
}

export function generateInputs() {
    let inputsToCreate = 0;
    let numOfInputs = document.getElementById("numPlayers").value;
    inputsToCreate = numOfInputs;
    alert(inputsToCreate);
    let container = document.getElementById("playerInputContainer");
    let back = document.getElementById("backBtn");
    let next = document.getElementById("nextBtn");
    let enter = document.getElementById("enter");
    container.classList.remove("hide");
    for (let i = 0; i < inputsToCreate; i++) {
        let input = document.createElement("input");
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', `Player ${i + 1}`);
        input.setAttribute('id', `input${i + 1}`);
        container.appendChild(input);
    }
    back.addEventListener("click", () => {
    })
    next.classList.add('hide');
    document.getElementsByClassName("enterBackBtns")[0].classList.remove('hide');
    document.getElementById('enter').addEventListener('click', () => {
        alert(document.getElementById('input1').value);
    });

    let parent = document.getElementById('inputPlayerParent');
    console.log(parent);

    
}

export function hide(modalId) {
    if (modalId) {
        try {
            document.getElementById(modalId).classList.add('hide');
        } catch (err) {
            alert(err.message);
        }
    } else {
        alert('No id provided');
    }
}

export function show(modalId) {
    if (modalId) {
        if (document.getElementById(modalId).classList.contains('hide')) {
            alert('this element has hide class applied already');
        } else {
            alert(`Hiding ${document.getElementById(modalId)}`);
            document.getElementById(modalId).classList.remove('hide');
        }
    }
}

export function handleNewGameModal() {

}

export function handleEnterNumPlayersModal() {

}

export function enterCreatePlayersModal() {

}

export function whoRollsFirst() {
    
}