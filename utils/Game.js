
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
    constructor(ctx) {
        this.ctx = ctx
        this.gameState = true

        this.player = new Player() // initialize player
        this.computer = '' // implement computer class

        this.currProblem = ''
        this.currSolution = ''

    }

    // IMPLEMENT FOR THIS VERSION


    // TO DO: check if player solution is valid
    // input: userInput
    verifySolution() {
        // user input == curr solution
        // alert(userInput)
        console.log(this.input._value)

        alert(this.input._value)
        this.foundSolution = true

        return true
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // display problem
        this.drawProblem()
        // display input field
        if (this.input) {
            this.input._value = ''
        }

        this.drawInputField()

    }

    // IMPLEMENT FOR THIS VERSION
    // run this function on a time loop
    update() {
        // this.drawProblem()
        // run verify solution and foundSolution

        // check if player got the solution for the problem
        if (this.foundSolution == true) {
            // if yes, call new problem
            this.player.newProblem()
            // draw
            this.draw()
            // add to mana
            this.player.mana += this.player.currProblemMana
            this.player.prevResponseCorrectness = true
            this.foundSolution = false
            console.log("PLAYER MANA:")
            console.log(this.player.mana)

        } else {
            // TODO: display try again above the input box

            this.player.prevResponseCorrectness = false
            this.foundSolution = false
        }


        // handle gameOver state
        if (this.player.health == 0 || this.computer.health == 0) {
            this.gameOver()
        }
    }


}
