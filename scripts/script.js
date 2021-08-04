// Initialize the list of possible moves
const moves = ['Rock', 'Paper', 'Scissors'];
let playerLives = 5;
let computerLives = 5;

// Initialize the DOM object we need to access
const buttons = document.querySelectorAll('.rps-choice');
const playerScore = document.querySelector('.playerScore');
const computerScore = document.querySelector('.computerScore');
const narration = document.querySelector('.narration');
const menu = document.querySelector('.rps-menu');
const hp = document.querySelector('.results');
const start = document.querySelector('.start');


// Returns a random move of a computer from the set of possible moves
function computerPlay()
{
    return moves[Math.floor(Math.random() * 3)];
}

// Checks the action of the player and computer
function playRound(playerSelection, computerSelection)
{
    // Makes the player and computer selection case insensitive
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();


    // Checks the player and computer selection and output the corresponding message
    if(playerSelection === 'rock')
    {
        if(computerSelection === 'scissors')
        {   
            updateLives('computer', computerLives);
            computerLives -= 1;
            return 'You Win! Rock beats Scissors';
        }
        else if(computerSelection === 'paper')
        {
            updateLives('player', playerLives);
            playerLives -= 1;
            return 'You Lose! Paper beats Rock';
        }
        else
        {
            return 'Draw! Both of you chose Rock';
        }
    }
    else if(playerSelection === 'scissors')
    {
        if(computerSelection === 'paper')
        {
            updateLives('computer', computerLives);
            computerLives -= 1;
            return 'You Win! Scissors beats Paper';
        }
        else if(computerSelection === 'rock')
        {
            updateLives('player', playerLives);
            playerLives -= 1;
            return 'You Lose! Rock beats Scissors';
        }
        else
        {
            return 'Draw! Both of you chose Scissors';
        }
    }
    else if(playerSelection === 'paper')
    {
        if(computerSelection === 'rock')
        {
            updateLives('computer', computerLives);
            computerLives -= 1;
            return 'You Win! Paper beats Rock';
        }
        else if(computerSelection === 'scissors')
        {
            updateLives('player', playerLives);
            playerLives -= 1;
            return 'You Lose! Scissors beats Paper';
        }
        else (computerSelection === 'paper')
        {
            return 'Draw! Both of you chose Paper';
        }
    }

    return "You have selected Invalid Move!"
}

// Starts the game 
function gameStart()
{
    resetLives();
    let playerSelection = '';
    let play = function(event){
        playerSelection = event.target.value;
        const computerSelection = computerPlay();
        narration.textContent = playRound(playerSelection, computerSelection);
    };
    buttons.forEach(button => {
        narration.textContent = 'Choose your weapon!';
        button.addEventListener('click', play);
    });
}

function updateLives(whoLose, lives)
{
   if(whoLose === 'computer')
   {
        let lose = document.querySelector(`.cl${lives}`);
        lose.style.backgroundColor = 'black';
   }
   else if(whoLose === 'player')
   {
        let lose = document.querySelector(`.hl${lives}`);
        lose.style.backgroundColor = 'black';
   }
   if(playerLives == 0 || computerLives == 0)
   {
       endGame();
   }
}

function resetLives()
{
    playerWins = 5;
    computerWins = 5;
}

function setup()
{
    hp.style.display = 'block';
    menu.style.display = "flex";
    start.style.display = "none";
    gameStart();
}

start.addEventListener('click', setup);