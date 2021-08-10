// Initialize the list of possible moves
const moves = ['Rock', 'Paper', 'Scissors'];
let playerLives = 5;
let computerLives = 5;
let playerState = 'idle';
let computerState = 'idle';
let pause = false;

// Initialize the DOM object we need to access
const buttons = document.querySelectorAll('.rps-choice');
const playerScore = document.querySelector('.playerScore');
const computerScore = document.querySelector('.computerScore');
const narration = document.querySelector('.narration');
const menu = document.querySelector('.rps-menu');
const hp = document.querySelector('.results');
const game = document.querySelector('.display');
const start = document.querySelector('.start');
const startButton = document.querySelector('.startButton');
const hcanvas = document.querySelector('.human-player');
const hctx = hcanvas.getContext('2d');
const cCanvas = document.querySelector('.computer');
const cCtx = cCanvas.getContext('2d');
const CANVAS_HEIGHT = hcanvas.height = cCanvas.height = 550;
const CANVAS_WIDTH = hcanvas.width = cCanvas.width = 550;
let results;

const playerImage = new Image();
playerImage.src = 'images/human.png';
const computerImage = new Image();
computerImage.src = 'images/computer.png';


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
            computerLives -= 1;
            updateLives('computer', computerLives);
            playerState = 'attack';
            computerState = 'hurt';
            return 'You Win! Rock beats Scissors';
        }
        else if(computerSelection === 'paper')
        {
            playerLives -= 1;
            updateLives('player', playerLives);
            computerState = 'attack';
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
            computerLives -= 1;
            updateLives('computer', computerLives);
            playerState = 'attack';
            computerState = 'hurt';
            return 'You Win! Scissors beats Paper';
        }
        else if(computerSelection === 'rock')
        {
            playerLives -= 1;
            updateLives('player', playerLives);
            computerState = 'attack';
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
            computerLives -= 1;
            updateLives('computer', computerLives);
            playerState = 'attack';
            computerState = 'hurt';
            return 'You Win! Paper beats Rock';
        }
        else if(computerSelection === 'scissors')
        {
            playerLives -= 1;
            updateLives('player', playerLives);
            computerState = 'attack';
            playerState = 'hurt';
            return 'You Lose! Scissors beats Paper';
        }
        else (computerSelection === 'paper')
        {
            return 'Draw! Both of you chose Paper';
        }
    }
}

const spriteWidth = 550;
const spriteHeight = 550;
let gameFrame = 0;
const delayFrames = 8;
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

const computerAnimations = [];
const computerStates = [
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


function initializeAnimations()
{
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

    computerStates.forEach((state, index) => {
        let frames = {
            loc: [],
        }
        for(let j = 0; j <state.frames; j++){
            let postionX = j * spriteWidth;
            let positionY = index * spriteHeight;
            frames.loc.push({x: postionX, y: positionY});
        }
        computerAnimations[state.name] = frames;
    });
}

console.log(humanAnimations);

function animate()
{
    if(!pause)
    {
        hctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        cCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        let hNumFrames = humanAnimations[playerState].loc.length;
        let hPosition = Math.floor(gameFrame/delayFrames) % hNumFrames;
        let hFrameX = spriteWidth * hPosition
        let hFrameY = humanAnimations[playerState].loc[hPosition].y;

        let cNumFrames = computerAnimations[computerState].loc.length;
        let cPosition = Math.floor(gameFrame/delayFrames) % cNumFrames;
        let cFrameX = spriteWidth * cPosition;
        let cFrameY = computerAnimations[computerState].loc[cPosition].y;

        hctx.drawImage(playerImage, hFrameX, hFrameY,
            spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        cCtx.translate(0 + spriteWidth, 0);
        cCtx.scale(-1, 1);
        cCtx.drawImage(computerImage, cFrameX, cFrameY,
            spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);    
        cCtx.setTransform(1,0,0,1,0,0);


        gameFrame += 1;

        if(playerState == 'attack' || playerState == 'hurt')
        {
            if((hPosition + 1) == 10)
            {
                playerState = 'idle';
                computerState = 'idle';
            }
        }
        requestAnimationFrame(animate);
    }
    else
    {
        hctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        cCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        hctx.drawImage(playerImage, 0, humanAnimations[playerState].loc[9].y,
            spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        cCtx.translate(0 + spriteWidth, 0);
        cCtx.scale(-1, 1);
        cCtx.drawImage(computerImage, 0, computerAnimations[computerState].loc[9].y,
            spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);    
        cCtx.setTransform(1,0,0,1,0,0);
        cancelAnimationFrame(animate);
    }
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
        let lose = document.querySelector(`.cl${lives + 1}`);
        lose.style.backgroundColor = 'black';
   }
   else if(whoLose === 'player')
   {
        let lose = document.querySelector(`.hl${lives + 1}`);
        lose.style.backgroundColor = 'black';
   }
   if(playerLives == 0 || computerLives == 0)
   {
       if(playerLives == 0)
       {
           playerState = 'hurt';
           results = 'You have won the game :)\n' +
           'Do you want play again?';
       }
       else if(computerLives == 0)
       {
           computerState = 'hurt';
           results = 'You have lost the game :(\n' +
           'Do you want play again?';
       }
       pause = true;
       displayResults();
   }
}

function resetLives()
{
    for(let i = 1; i <= 5; i++)
    {
        let hLive = document.querySelector(`.hl${i}`);
        let cLive = document.querySelector(`.cl${i}`);
        hLive.style.backgroundColor = '#FF0800';
        cLive.style.backgroundColor = '#FF0800';
    }
    playerLives = 5;
    computerLives = 5;
}

function setup()
{
    game.style.display = 'block';
    start.style.display = "none";
    pause = false;
    playerState = 'idle';
    computerState = 'idle';
    initializeAnimations();
    animate();
    gameStart();
}

function displayResults()
{    
    game.style.display = 'none';
    let endResults = document.createElement('p');
    endResults.textContent = results;
    endResults.style.cssText = 'color: white; font-size: 20px;';

    start.insertBefore(endResults, startButton);
    start.style.display = 'flex';
}

startButton.addEventListener('click', setup);