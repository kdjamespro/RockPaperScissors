// Initialize the list of possible moves
const moves = ['Rock', 'Paper', 'Scissors'];
let playerLives = 5;
let computerLives = 5;
let playerState = 'idle';

// Initialize the DOM object we need to access
const buttons = document.querySelectorAll('.rps-choice');
const playerScore = document.querySelector('.playerScore');
const computerScore = document.querySelector('.computerScore');
const narration = document.querySelector('.narration');
const menu = document.querySelector('.rps-menu');
const hp = document.querySelector('.results');
const game = document.querySelector('.display');
const start = document.querySelector('.start');
const hcanvas = document.querySelector('.human-player');
const hctx = hcanvas.getContext('2d');
const CANVAS_HEIGHT = hcanvas.height = 550;
const CANVAS_WIDTH = hcanvas.width = 550;

const playerImage = new Image();
playerImage.src = 'images/human.png';


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
            playerState = 'attack';
            return 'You Win! Rock beats Scissors';
        }
        else if(computerSelection === 'paper')
        {
            updateLives('player', playerLives);
            playerLives -= 1;
            playerState = 'hurt';
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
            playerState = 'attack';
            return 'You Win! Scissors beats Paper';
        }
        else if(computerSelection === 'rock')
        {
            updateLives('player', playerLives);
            playerLives -= 1;
            playerState = 'hurt';
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
            playerState = 'attack';
            return 'You Win! Paper beats Rock';
        }
        else if(computerSelection === 'scissors')
        {
            updateLives('player', playerLives);
            playerLives -= 1;
            playerState = 'hurt';
            return 'You Lose! Scissors beats Paper';
        }
        else (computerSelection === 'paper')
        {
            return 'Draw! Both of you chose Paper';
        }
    }

    return "You have selected Invalid Move!"
}

const spriteWidth = 550;
const spriteHeight = 550;
let gameFrame = 0;
const delayFrames = 10;
const humanAnimations = [];
const humanStates = [
    {
        name: 'idle',
        frames: 10,
    },
    {
        name: 'attack',
        frames: 10,
    },
    {
        name: 'hurt',
        frames: 10,
    }
];

humanStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for(let j = 0; j <state.frames; j++){
        let postionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: postionX, y: positionY});
    }
    humanAnimations[state.name] = frames;
});
console.log(humanAnimations);

function animate()
{
    hctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let numFrames = humanAnimations[playerState].loc.length;
    let position = Math.floor(gameFrame/delayFrames) % numFrames;
    let frameX = spriteWidth * position
    let frameY = humanAnimations[playerState].loc[position].y;
    hctx.drawImage(playerImage, frameX, frameY,
        spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    gameFrame += 1;
    if(playerState == 'attack' || playerState == 'hurt')
    {
        if((position + 1) % numFrames == 0)
        {
            playerState = 'idle';
        }
    }
    requestAnimationFrame(animate);
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
    game.style.display = 'block';
    start.style.display = "none";

    animate('idle');
    gameStart();
}

start.addEventListener('click', setup);