// FOR V1, IMPLEMENT PLAYER AND GAME CLASS, SUCH THAT 
// THEY CAN DEAL WITH A MATH PROBLEM AND ALLOW PLAYER TO ENTER A SOLUTION
// AND CHECK THE SOLUTION FOR ACCURACY
// AND ASSIGN TOKENS ACCORDINGLY


// math problems (INITIALLY)
// solution checker
// token associations with math problems
// assign tokens to players if correct solution
// how to deal with incorrect solution condition?
    // 3 tries, skip option, new question?
// players/opponents
    // track attacks and update health accordingly
// track winner
// track gameOver state
    
class Game {
    constructor() {
        this.gameState = true
        // initialize player
        this.player
        this.currProblem = ''
        this.currSolution = ''    
    }

    // IMPLEMENT FOR THIS VERSION
    // get new problem
    newProblem() {
        // get a new problem based on player level
        // update currProblem
        // update currSolution with new solution
    }

    // IMPLEMENT FOR THIS VERSION
    // run this function on a time loop
    update() {
        // check if player got the solution for the problem
            // if yes, call new problem
        // 
    }

    // TBD: Maybe this function, or maybe do it through html
    draw() {
        // display problem
    }
}