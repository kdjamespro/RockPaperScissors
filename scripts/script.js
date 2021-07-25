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
function game()
{
    for(i = 0; i < 5; i++)
    {
        const playerSelection = prompt("Choose among Rock Paper and Scissors");
        const computerSelection = computerPlay();
        console.log(playRound(playerSelection, computerSelection));
    }
    finalScore();
}

// outputs the final score
function finalScore()
{
    let result = `The player score is: ${playerWins}\nThe computer score is: ${computerWins}`;
    console.log(result);
}

game();