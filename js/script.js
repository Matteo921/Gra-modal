'use strict';
var params = {
    userChoice: '',
    computerChoice: '',
    userScore: 0,
    computerScore: 0,
    rounds: 0,
    gameOver: false,
    userSpanDisplay: document.getElementById('user-score'),
    computerSpanDisplay: document.getElementById('computer-score'),
    selectMove: document.getElementsByClassName('player-move'),
    choices: document.querySelector('.choices'),
    start: document.getElementById('button'),
    result: document.querySelector('.result > p'),
    tableContainer: document.querySelector('#table-container'),
}


function getComputerChoice() {
    var choices = ['r', 'p', 's'];
    var randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function empty() {
    params.progress.length = 0;
}

function convertToWord(letter) {
    if (letter === 'r') return "Rock";
    if (letter === 's') return "Scissors";
    if (letter === 'p') return "Paper";
}


function round() {

    params.rounds = window.prompt('How many rounds would you like to play?');

    if (params.rounds == '' || params.rounds == null || isNaN(params.rounds) == true || params.rounds <= 0 || params.rounds % 1 !== 0) {
        alert('You should give the positive number!');
        round();
    }
    return params.rounds;
}

function addTableRow(result) {
    let div = document.createElement('div');
    div.className = 'table-parent';
    div.innerHTML = '<div class="text-reuslt">' + result + '</div>' +
        '<div class="user-score">' + params.userScore + '</div>' +
        '<div class="computer-score">' + params.computerScore + '</div>';
    params.tableContainer.appendChild(div);
}

function play() {
    params.result.innerHTML = '<br>' + 'You played ' + convertToWord(params.userChoice) + ' and computer played ' + convertToWord(params.computerChoice);

    if (params.computerScore == params.rounds || params.userScore == params.rounds) return params.gameOver = true;

    switch (params.userChoice + params.computerChoice) {
        case "sp":
        case "pr":
        case "rs":
            params.result.innerHTML += '<p> YOU WON! :) </p>';
            params.userScore++;
            addTableRow('Player');
            break;
        case 'ps':
        case 'rp':
        case 'sr':
            params.result.innerHTML += '<p> YOU LOSED! :( </p>';
            params.computerScore++;
            addTableRow('Computer');
            break;
        case 'ss':
        case 'pp':
        case 'rr':
            params.result.innerHTML += "<p> YOU TIED! </p>";
            addTableRow('Remis');
            break;
    }

    params.userSpanDisplay.innerHTML = params.userScore;
    params.computerSpanDisplay.innerHTML = params.computerScore;

    if (params.computerScore == params.rounds) {
        params.result.innerHTML = 'YOU LOSED :('
        params.choices.classList.add('hide');
    } else if (params.userScore == params.rounds) {
        params.result.innerHTML = 'YOU WON :)'
        params.choices.classList.add('hide');
    }
}

function main() {

    params.start.addEventListener('click', function() {

        if (params.gameOver === false) {
            params.rounds = round();
            params.userScore = 0;
            params.computerScore = 0;
            params.userSpanDisplay.innerHTML = params.userScore;
            params.computerSpanDisplay.innerHTML = params.computerScore;
            params.result.innerHTML = 'Good Luck :)';
        }

        params.choices.classList.remove('hide');
        params.start.innerText = 'Once again';
    })


    for (var p = 0; p < params.selectMove.length; p++) {
        params.selectMove[p].addEventListener('click', function() {
            var choice = this.getAttribute('id');
            params.userChoice = choice;
            params.computerChoice = getComputerChoice();
            play();
        });

    }
}


main();


(function() {

    var showModal = function(event) {
        event.preventDefault();
        var items = document.querySelectorAll('.overlay .modal');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('show');

        }
        document.querySelector('#modal-overlay').classList.add('show');
        document.querySelector(event.target.getAttribute('href')).classList.add('show');
    };

    var modalLinks = document.querySelectorAll('.show-modal');

    for (var i = 0; i < modalLinks.length; i++) {
        modalLinks[i].addEventListener('click', showModal);
    }

    var hideModal = function(event) {
        event.preventDefault();
        document.querySelector('#modal-overlay').classList.remove('show');
    };

    var closeButtons = document.querySelectorAll('.modal .close');

    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', hideModal);
    }

    document.querySelector('#modal-overlay').addEventListener('click', function(e) {

        if (e.target === this) {
            hideModal(e);
        };
    });

})();