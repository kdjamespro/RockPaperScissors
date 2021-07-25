// Initialize the list of possible moves
let moves = ['Rock', 'Paper', 'Scissors'];

// Returns a random move of a computer from the set of possible moves
function computerPlay()
{
    return moves[Math.floor(Math.random() * 3)]
}

