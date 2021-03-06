
var view = {
	displayMessage: function(msg) {
			var messageArea = document.getElementById("messageArea");
			messageArea.innerHTML = msg;
			messageArea.style.visibility = "visible";
	},

	displayHit: function(location) {
			var cell = document.getElementById(location);
			cell.setAttribute("class", "hit");
	},

	displayMiss: function(location) {
			var cell = document.getElementById(location);
			cell.setAttribute("class", "miss");
	},

	displayFireButton: function() {
		var guessPrompt = document.getElementById("guessPrompt");
		guessPrompt.style.display = "block";
		var fireButtton = document.getElementById("fireButton");
		fireButton.style.display = "inline";
		var guessInput = document.getElementById("guessInput");
		guessInput.style.display = "inline";
		guessInput.focus();
		var readyButton = document.getElementById("playerReady");
		readyButton.style.display = "none";
	},

	hideFireButton: function() {
		var guessPrompt = document.getElementById("guessPrompt");
		guessPrompt.style.display = "none";
		var fireButtton = document.getElementById("fireButton");
		fireButton.style.display = "none";
		var guessInput = document.getElementById("guessInput");
		guessInput.style.display = "none";
		var message = "Player " + (model.playerNum + 1);
		view.displayMessage(message);
	}
};


var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: [0,0],
	numPlayers: 1,
	playerNum: 0,
	curShipIndex: 0,
	misses: [[],[]],

	ships: [[{ locations: [0, 0, 0],  hits: ["", "", ""] },
			{ locations: [0, 0, 0],  hits: ["", "", ""] },
			{ locations: [0, 0, 0],  hits: ["", "", ""] }],

			[{ locations: [0, 0, 0],  hits: ["", "", ""] },
			{ locations: [0, 0, 0],  hits: ["", "", ""] },
			{ locations: [0, 0, 0],  hits: ["", "", ""] }]],

	fire: function(guess) {
		if (this.numPlayers == 1) {
			var player = 0;
		} else {
			var player = this.playerNum;						// swap player num to display other player's board
			if(player == 0) {
				player = 1;
			} else {
				player = 0;
			}
		}

		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[player][i];
			for(j=0; j< this.shipLength; j++) {
				if(ship.locations[j] == guess){
					ship.hits[j] = "hit";
					view.displayHit(guess);
					view.displayMessage("HIT!");
					if (this.isSunk(ship)) {
						view.displayMessage("You sank my battleship!");
						(this.shipsSunk[player])++;
					}
					return true;
				}
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed!");
		this.misses[this.playerNum].push(guess);
		return false;
	},

	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
					locations = this.generateShip();
				} while (this.collision(locations));
			this.ships[0][i].locations = locations;
		}
	},

	generateShip: function () {
		var direction = Math.floor(Math.random() * 2);
		var row;
		var col;

		if (direction === 1) {
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
		} else {
			row = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
			return newShipLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = model.ships[this.playerNum][i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	},

	isSunk: function(ship) {
			for (var i = 0; i < this.shipLength; i++) {
				if (ship.hits[i] !== "hit") {
					return false;
				}
			}
			return true;
		}
	};


var controller = {
	guesses: [[0],[0]],

	processGuess: function(guess) {
		var player = model.playerNum;
		var location = parseGuess(guess);
		if (location) {
			this.guesses[player]++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk[player] == model.numShips) {
				view.displayMessage("You sank all my battleships, in " + this.guesses[player] + " guesses");
			} 
		} else {
			return -1;
		}
	}
};


function parseGuess(guess) {
	var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

	if (guess === null) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar.toUpperCase());
		var column = guess.charAt(1);

		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
			return -1;
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
			return -1;
		} else {
			return row + column;
		}
	}
	return null;
}

function handleKeyPress(e) {
	var key = e.keyCode;
	if (key === 13) {
		var fireButton = document.getElementById('fireButton');
		fireButton.click();
		return false;
	}
}

function setNumPlayers(e) {
	var buttonID = e.srcElement;
	var players = buttonID.value;
	model.numPlayers = players;

	if (players == 2) {
		var message = document.getElementById("message");
		message.innerHTML = 'Select <input type="button" id="computer" value="Computer"> or <input type="button" id="manual" value="Manual"> ship placement';
		var computerGen = document.getElementById("computer");
		var manualGen = document.getElementById("manual");
		manualGen.onclick = manualShipSetup;
		computerGen.onclick = computerShipSetup;
	} else {
		computerShipSetup();
	}
}

function computerShipSetup() {
	// set message to show player 1
	model.generateShipLocations();
	view.displayFireButton();
}

function manualShipSetup() {
	clearBoard();
	var player = model.playerNum;
	var message = document.getElementById("message");
	message.innerHTML = "<em>Player " + (player+1) + "</em>:  Click on a ship to enter starting and ending coordinates.  Click below to lock in positions.";
	var initialLocs = [[21,22,23],[32,33,34],[43,44,45]];
	
	for (i = 0; i < model.numShips; i++) {
			for(j = 0; j < model.shipLength; j++) {
				model.ships[player][i].locations[j] = initialLocs[i][j];
				view.displayHit(initialLocs[i][j]);
			}
	}
	
	lockMsg = document.getElementById("lockMsg");
	lockMsg.style.display = "inline";
	lockMsg.onclick = lockShips;

	var locations = document.getElementsByClassName("hit");
	for( i=0; i < locations.length; i++) {
		locations[i].onclick = selectShip;
	}

}

function selectShip(e) {
	var shipLoc = e.srcElement;
	var shipPos = shipLoc.id;
	var player = model.playerNum;

	for (i=0; i < model.numShips; i++) {
		for(j = 0; j < model.shipLength; j++) {
			if (model.ships[player][i].locations[j] == shipPos) {
				model.curShipIndex = i;
			}
		}
	}
	getCoordinates()
}

function getCoordinates(e) {
	var message = document.getElementById("message");
	message.innerHTML = 'Enter First and Last coordinates: " <input type="text" id="newPos" placeholder="A0,A2">';

	var newPos = document.getElementById("newPos");
	newPos.focus();
	newPos.onkeypress = SetCoordinates;
}

function SetCoordinates(e) {
	var shipSet = document.getElementById("newPos");
	var coordinates = shipSet.value;

	if(e.keyCode == 13){
		var start = coordinates.substring(0,2);
		var end = coordinates.substring(3,5);
		parseGuess(start);
		parseGuess(end);
		resetCurrentPosition(start, end);
	}
}

function resetCurrentPosition(start, end) {
	var r1 = start.substring(0,1); 
	var c1 = start.substring(1,2);
	var r2 = end.substring(0,1);
	var c2 = end.substring(1,2);

	var player = model.playerNum;
	var curRow = model.curShipIndex;
	var cell = 0;

	var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
	var firstChar = start.charAt(0);
	var row = Number(alphabet.indexOf(firstChar.toUpperCase()));
	var col = Number(start.charAt(1));
	var collision = false;
	var direction = 0;

	if (r1 != r2 && c1 != c2) {
		direction = 2;				//diagonal
	} else if (r1 == r2 ) {
		direction = 0;				//horizontal
	} else {
		direction = 1;				//vertical
	}

	var newShipLocations = [];									// build new ship locations
	for(var i = 0; i < model.shipLength; i++) {
		if (direction === 2) {
				newShipLocations.push((row + i) + "" + (col + i));
		} else if (direction === 1) {
				newShipLocations.push((row + i) + "" + col);
		} else {
				newShipLocations.push(row + "" + (col + i));
		}
	}

	for(i = 0; i < model.numShips; i++) {						// check for collisions
		if (i != curRow) {
			for (var j=0; j < model.shipLength; j++) {
				if (newShipLocations[i] == model.ships[player][i].locations[j]) {  
					var collision = true;
					i = model.numShips;
					j = model.shipLength;
				}
			}
		}
	}

	if (collision) {														// if collision try again
		var message = document.getElementById("message");
		message.innerHTML = 'Ships may not overlap!  Try again. " <input type="button" id="collision" value="OK">';
		var collision = document.getElementById("collision");
		collision.onclick = getCoordinates;
	} else {
		var oldShipLocations = model.ships[player][curRow].locations;		// clear old locations
		for (i=0; i < model.numShips; i++) {
			cell = document.getElementById(oldShipLocations[i]);
			cell.removeAttribute("class");
		}

		model.ships[player][curRow].locations = newShipLocations;			// set new locations
		var message = document.getElementById("message");
		message.innerHTML = "<em>Player " + (player+1) + "</em>:  Click on a ship to enter starting and ending coordinates.  Click below to lock in positions.";

		for (i=0; i < model.shipLength; i++) {								// show on board as "hit"
			document.getElementById(newShipLocations[i]).setAttribute("class", "hit");
		}
	}
}

function setBoardForCurPlayer() {
		var opponent = model.playerNum;						// swap player num to check opponent's locations
		if(opponent == 0) {
			opponent = 1;
		} else {
			opponent = 0;
		}

		var message = document.getElementById("messageArea");
		message.style.visibility = "hidden";
		clearBoard();

		for (i = 0; i < model.numShips; i++) {						// use hits from opponent's locations
			var hit = model.ships[opponent][i].hits;					// place hits on board
			for (var j = 0; j < model.shipLength; j++)  {
				if (hit[j] != "") {
				var hitLoc = document.getElementById(model.ships[opponent][i].locations[j]);
				hitLoc.setAttribute("class", "hit");
				}			
			}
		}
		
		var miss = model.misses[model.playerNum];					// use actual playerNum's misses
		for (i=0; i < miss.length; i++) {							// place misses on board
			cell = document.getElementById(miss[i]);
			cell.setAttribute("class", "miss");
		}
}

function clearBoard() {
	for (var i=0; i < model.boardSize; i++) {					
		for (var j = 0; j < model.boardSize; j++)  {
		var cell = document.getElementById(i + "" + j);
		cell.removeAttribute("class");
		}	
	}

}

function lockShips() {
	if(model.playerNum == 0) {
		model.playerNum = 1;
		manualShipSetup();
	} else {
		clearBoard();
		var lockMsg = document.getElementById("lockMsg");
		lockMsg.style.display = "none";
		var message = document.getElementById("message");
		message.style.display = "none";
		model.playerNum = 0;
		showReadyButton();
	}
}

function playerReady() {
	setBoardForCurPlayer();
	view.displayFireButton();
}


function switchPlayerPrompt() {
	if(model.numPlayers == 2) {
		view.hideFireButton();
		if (model.playerNum == 0) {
			model.playerNum = 1;
		} else {
			model.playerNum = 0;
		}
	}
	showReadyButton();
}

function showReadyButton() {
	if( model.numPlayers == 1) {
			view.displayFireButton()
	} else {
			var readyButton = document.getElementById("playerReady");
			readyButton.style.display = "inline";

			if (model.playerNum == 0) {
				readyButton.value= "Player 1 Ready";
			}	else {
				readyButton.value= "Player 2 Ready";
			}
	}
}

function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	var result = controller.processGuess(guess);
	guessInput.value = "";
	if( result !== -1) {
		switchPlayerPrompt();
	}
}

function init() {
	var fireButtton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	var player1 = document.getElementById("onePlayer");
	var player2 = document.getElementById("twoPlayer");
	player1.onclick = setNumPlayers;
	player2.onclick = setNumPlayers;

	var readyButton = document.getElementById("playerReady");
	readyButton.onclick = playerReady;

	var lockMsg = document.getElementById("lockMsg");
	lockMsg.onclick = lockShips;

}

window.onload = init;