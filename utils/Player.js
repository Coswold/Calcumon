// calcumon (INITIALLY) --> perhaps not needed?
// tokens (INITIALLY)
// health
// attacks and attack costs
// response input to a problem

// import problem generator
// import { getProblem } from 'problemGenerator'
// // import solution API
// import { solve } from 'solutionApi'

class Player {
    constructor(health=100, mana=0, attacks=[], level=1) {
        // game
        this.mana = mana
        this.health = health
        this.attacks = attacks
        this.response = ''
        this.level = level // access from database
        this.prevResponseCorrectness = true // Was the last response correct?
        this.problemCount = 1 // how many problems did player deal with

        this.currProblem = ''
        this.currSolution = ''
        this.currProblemMana = 0
        this.newProblem()
    }

    // get new problem
    newProblem() {
        let level = this.level
        let problemCount = this.problemCount
        let prevResult = this.prevResponseCorrectness // boolean
        // get a new problem based on player level


        let result = getProblem(level, problemCount, prevResult)

        // update currProblem
        this.currProblem = makeProblemReadable(result[0])
        this.currProblemMana = result[1]
        // update currSolution with new solution
        // this.currSolution = solve(result[0])

        // increment problem count
        this.problemCount += 1
    }

    // IMPLEMENT THIS FOR VERSION ONE
    respond() {
        // NOTE: CHECK IF WE CAN USE document.getElementById in this file to access gamePlay.handlebars!
        let submit = document.getElementById('submit')
        let userInput = null
        submit.onclick = function() {
            userInput = document.getElementById('userInput').value
            alert(userInput)
        }
        return userInput
    }

    attack(i) {
        // pick attack at index i
        // subtract attack token cost from player's tokens
        // return health to subtract
            // handle return value in game class
            // to subtract health from enemy
    }

}

// export default Player
