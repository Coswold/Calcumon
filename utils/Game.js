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

        this.player = new Player() // initialize player
        this.computer = '' // implement computer class

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

    // TO DO: check if player solution is valid
    verifySolution(userInput) {
        // user input == curr solution
        return true
    }

    gameOver() {
        // figure out who won
        // if player won: update level, give coins
        return
    }

    // IMPLEMENT FOR THIS VERSION
    // run this function on a time loop
    update() {
        // NOTE: CHECK IF WE CAN USE document.getElementById in this file to access gamePlay.handlebars!
        // NOTE: DO WE NEED TO IMPORT GAME.JS IN GAMEPLAY.handlebars?

        // Gets the player input from the problem-solution form when solution is submitted by player
        let userInput = this.player.respond()
        
        // check if player got the solution for the problem
        if (verifySolution(userInput) == true) {
            // if yes, call new problem
            this.newProblem()
            this.player.prevResponseCorrectness = true
            // add to player mana based on problem's value
        } else {
            // if no, clear input field and display try again above the input box
            document.getElementById('userInput').placeholder = 'try again!'
        }
        

        // allow skipping of a problem
        let skip = document.getElementById('skip')
        skip.onclick = function() {
            this.player.prevResponseCorrectness = false
            this.newProblem()
            return
        }

        // handle gameOver state
        if (this.player.health == 0 || this.computer.health == 0) {
            this.gameOver()
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