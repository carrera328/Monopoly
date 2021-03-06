import * as schema from './schema.js';
import * as controller from './controller.js';
import * as main from './main.js';

export let GLOBALBOOLS = {
    newModalClicked: false,
    numPlayersSelected: false,
    done: false
}

export let playersThisGame = [];

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
    console.log(player); 
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
}

export async function preRollModal(players) {
    show('firsRollModal');
    document.getElementById('rollWinner').innerHTML = `${players[0].name} has won first roll!`;
    document.getElementById('rollOrder').innerHTML = `Roll Order: `;
    for (let i = 0; i < players.length; i++) {
        document.getElementById('rollOrder').innerHTML += `${players[i].name}  `;
    }
    
    await startMainGame();
    hide('firsRollModal');
}

export function assignTurn(players) {
    let firstRollOutcomes = new Map();
    for (let i in players) {
        firstRollOutcomes.set(players[i], this.roll().rolled);
    }
    console.log(firstRollOutcomes);
}

export function generateInputs() {
    return new Promise(function(resolve, reject) {
        let inputsToCreate = 0;
        let numOfInputs = document.getElementById("numPlayers").value;
        inputsToCreate = numOfInputs;
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
        // alternate way to create players
        enter.addEventListener('click', () => {
            for (let i = 0; i < inputsToCreate; i++) {
                if (!document.getElementById(`input${i + 1}`).value) {
                    console.log(`Missing name for player ${i + 1}`);
                    let message = prompt(`player ${i + 1} is missing a name, would like to provide one here?\na blank entry will default this name to \'Player ${i + 1}\'`);
                    if (!message) {
                     playersThisGame.push(new Player(`Player ${i + 1}`));   
                    } else {
                    playersThisGame.push(new Player(message));
                    }
                } else {
                    playersThisGame.push(new Player(document.getElementById(`input${i + 1}`).value));
                }
            }
            resolve();
        });
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 13) {
                for (let i = 0; i < inputsToCreate; i++) {
                    if (!document.getElementById(`input${i + 1}`).value) {
                        console.log(`Missing name for player ${i + 1}`);
                        let message = prompt(`player ${i + 1} is missing a name, would like to provide one here?\na blank entry will default this name to \'Player ${i + 1}\'`);
                        if (!message) {
                         playersThisGame.push(new Player(`Player ${i + 1}`));   
                        } else {
                        playersThisGame.push(new Player(message));
                        }
                    } else {
                        playersThisGame.push(new Player(document.getElementById(`input${i + 1}`).value));
                    }
                }
                resolve();
            }
        }, {once: true})
        
    })
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
            document.getElementById(modalId).classList.remove('hide');
            console.log(`Displaying ${document.getElementById(modalId).id}`);
        } else {
          alert('this item is already showing');  
        }
    }
}

export function handleNewGameModal() {
    return new Promise(function(resolve, reject)  {
        show('newGameModal');
        let newGame = document.getElementById("newGameBtn");
        let loadGame = document.getElementById("loadGameBtn");
        newGame.addEventListener('click', function() {
            console.log('newGame clicked');
            GLOBALBOOLS.newModalClicked = true;
            resolve();
        });
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 13) {
                console.log('newGame clicked');
                GLOBALBOOLS.newModalClicked = true;
                resolve();
            }
        }, {once:true});
    })
    
}

export function handleEnterNumPlayersModal() {
    return new Promise(function(resolve, reject) {
        let nextBtn = document.getElementById('nextBtn');
        if (GLOBALBOOLS.newModalClicked) {
            hide('newGameModal');
            show('inputPlayerParent');
            nextBtn.addEventListener('click', () => {
                GLOBALBOOLS.numPlayersSelected = true;
                resolve();
            });
            window.addEventListener('keydown', (e) => {
                if (e.keyCode == 13) {
                    GLOBALBOOLS.numPlayersSelected = true;
                    resolve();    
                }
            }, {once: true});
            
        } else {
            alert('Tests are passing');
        }
    })
}

export function getGlobalBools() {
    alert(GLOBALBOOLS.numPlayersSelected);
}

export function enterCreatePlayersModal() {
return new Promise(function(resolve, reject) {
        if (GLOBALBOOLS.numPlayersSelected = true) {
            hide('inputPlayerParent');
            show('inputHead');
            show('playerInputContainer');
            show('inputRender');
            show('enterBackBtns');
            resolve();
        }
    })
        
}    
export function startMainGame() {
    return new Promise(function(resolve, reject) {
        document.getElementById('mainGame').addEventListener('click', ()=>{
            resolve('new game!');
        });
        window.addEventListener('keydown', (e) => {
            resolve('new game!')
        }, {once:true});    
    })
}    
export async function getPlayersAfterInput() {
    await handleNewGameModal().then(handleEnterNumPlayersModal).then(enterCreatePlayersModal).then(generateInputs);
    for (let i in playersThisGame) {
        console.log(playersThisGame[i]);
    }
    return playersThisGame;
} 

export function whoRollsFirst(players) {
    
    if (players && players.length > 1) {
        return players.sort(() => Math.random() - 0.5);        
    } else { 
        console.log(`There should be more than one player in a game cuz`);
        return false;
    }
}

export function handleNewTurn(player, board) {
    
}