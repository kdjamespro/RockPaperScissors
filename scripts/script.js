// Initialize the list of possible moves
const moves = ['Rock', 'Paper', 'Scissors'];
let playerWins = 0;
let computerWins = 0;


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
            playerWins += 1;
            return 'You Win! Rock beats Scissors';
        }
        else if(computerSelection === 'paper')
        {
            computerWins += 1;
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
            playerWins += 1;
            return 'You Win! Scissors beats Paper';
        }
        else if(computerSelection === 'rock')
        {
            computerWins += 1;
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
            playerWins += 1;
            return 'You Win! Paper beats Rock';
        }
        else if(computerSelection === 'scissors')
        {
            computerWins += 1;
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
    updateScore();
    let playerSelection = '';
    buttons = document.querySelectorAll('.rps-choice');
    console.log(buttons);
    buttons.forEach(button => {
        button.disabled = false;
        button.addEventListener('click', (e) =>
        {
            console.log(e);
            playerSelection = e.target.value;
            console.log(playerSelection);
            const computerSelection = computerPlay();;
            playRound(playerSelection, computerSelection)
            updateScore();
        });
    });
}

// outputs the final score
function updateScore()
{
    const playerScore = document.querySelector('.playerScore');
    const computerScore = document.querySelector('.computerScore');
    playerScore.textContent = playerWins;
    computerScore.textContent = computerWins;
}



let start = document.querySelector('.startButton');
start.addEventListener('click', () => gameStart());