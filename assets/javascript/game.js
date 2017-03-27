var game = {
	wins: 0,
	guesses: 15,
	emptyArray: [],
	usedLetters: [],
	remainingGuesses: "<p style='font-size: 20px'>Guesses left: </p>",
	wordsArray: ["jerry", "elaine", "costanza", "kramer", "newman", "seinfeld"],
	usedWords: [],
	randomIndex: function() {
		return Math.floor(Math.random() * (this.wordsArray.length));
	},
	wordChooser: function() {
		return game.wordsArray[game.randomIndex()];
	},
	blankSpaces: function(word, array) {
		for (var i = 0; i < word.length; i++) {
			array.push(" _ ");
		}
		return array;
	},
	contains: function(a, obj) {
		for (var i = 0; i < a.length; i++) {
			if (a[i] === obj) {
				return true;
			}
		}
		return false;
	}
}
var chosenWord = game.wordChooser();
var blankWord = game.blankSpaces(chosenWord, game.emptyArray);
document.querySelector("#currentWord").innerHTML = blankWord.join("");
document.querySelector("#remainingGuessesTitle").innerHTML = game.remainingGuesses;
document.querySelector("#remainingGuessesNumber").innerHTML = game.guesses;
document.onkeyup = function(event) {
	var keyUp = {
		changingWord: blankWord,
		userGuess: event.key,
		letterTitle: "<p style='font-size: 20px'>You've used: </p>",
		print_wins: function() {
			document.querySelector("#wins").innerHTML = "Wins: " + game.wins
		},
		print_letters_used: function() {
			document.querySelector("#lettersUsed").innerHTML = game.usedLetters.join(", ")
		},
		print_blank_word: function() {
			document.querySelector("#currentWord").innerHTML = blankWord.join("")
		},
		print_guesses_number: function() {
			document.querySelector("#remainingGuessesNumber").innerHTML = game.guesses
		},
		boo: new Audio("assets/images/crowdboo.mp3"),
		applause: new Audio("assets/images/applause.mp3")
	}
	if (game.contains(game.usedLetters, keyUp.userGuess) !== true) {
		game.usedLetters.push(keyUp.userGuess);
		game.guesses = game.guesses - 1;
	}
	if (game.contains(chosenWord, keyUp.userGuess)) {
		for (var i = 0; i < chosenWord.length; i++) {
			if (chosenWord[i] === keyUp.userGuess) {
				keyUp.changingWord[i] = " " + keyUp.userGuess + " ";
				document.querySelector("#currentWord").innerHTML = keyUp.changingWord.join("");
			}
		}
	}
	keyUp.print_guesses_number();
	document.querySelector("#lettersUsedTitle").innerHTML = keyUp.letterTitle;
	keyUp.print_letters_used();
	if (game.contains(keyUp.changingWord, " _ ") === false) {
		alert("Helloooo you're a winner! You guessed: " + chosenWord);
		game.usedWords.push(chosenWord);
		game.wins = game.wins + 1;
		if (game.wins === 6) {
			alert("You're a Seinfeld master - play again!");
			game.usedWords = [];
			game.wins = 0;
		}
		document.querySelector("#victoryImage").innerHTML = "<img class='col-xs-12' src='assets/images/" + chosenWord + ".jpg' + alt=" + chosenWord + ">";
		chosenWord = game.wordChooser();
		while (game.contains(game.usedWords, chosenWord)) {
			chosenWord = game.wordChooser();
		}
		console.log(game.usedWords);
		game.guesses = 15;
		game.emptyArray = [];
		game.usedLetters = [];
		blankWord = game.blankSpaces(chosenWord, game.emptyArray);
		keyUp.print_wins();
		keyUp.print_letters_used();
		keyUp.print_blank_word();
		keyUp.print_guesses_number();
		keyUp.cheer.play();
	}
	if (game.guesses === 0) {
		alert("No wins for you!!");
		chosenWord = game.wordChooser();
		while (game.contains(game.usedWords, chosenWord)) {
			chosenWord = game.wordChooser();
		}
		game.guesses = 15;
		game.emptyArray = [];
		game.usedLetters = [];
		blankWord = game.blankSpaces(chosenWord, game.emptyArray);
		keyUp.print_letters_used();
		keyUp.print_blank_word();
		keyUp.print_guesses_number();
		keyUp.boo.play();
	}
}