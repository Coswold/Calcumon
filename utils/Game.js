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


// imports
// import player class
import { Player } from 'Player'
// import problem generator 
import { getProblem } from 'problemGenerator'
// import solution API
import { solve } from 'solutionApi'
    
class Game {
    constructor() {
        this.gameState = true
        // initialize player
        this.player = new Player()
        this.currProblem = ''
        this.currSolution = ''
          
    }

    // IMPLEMENT FOR THIS VERSION
    // get new problem
    newProblem() {
        let level = this.player.level
        let problemCount = this.player.problemCount
        let prevResult = this.player.prevResponseCorrectness // boolean
        // get a new problem based on player level
        problem = getProblem(level, problemCount, prevResult)
        
        // update currProblem
        this.currProblem = problem
        // update currSolution with new solution
        this.currSolution = solve(problem)
    }

    // IMPLEMENT FOR THIS VERSION
    // run this function on a time loop
    update() {
        
        // Gets the player input from the problem-solution form when solution is submitted by player
        let submit = document.getElementById('submit')
        let userInput = null
        submit.onclick = function() {
            userInput = document.getElementById('userInput').value
            alert(userInput)
            // check if player got the solution for the problem
                // if yes, call new problem
                // if no, clear input field and display try again above the input box
        }
    }

    // TBD: Maybe this function, or maybe do it through html
    draw() {
        // display problem
        // document => gamePlay.handlebars: display problem on screen
        document.getElementById('problem').value = makeProblemReadable(this.currProblem)
    }
}

export default Game