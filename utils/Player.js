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
    constructor(attacks=[], health=100, mana=0, level=1) {
        // game
        this.mana = mana
        this.health = health // out of a 100
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
        this.currProblemMana = result[1]*10
        // update currSolution with new solution
        // console.log(result[0])
        // console.log('GETTING PROBLEM-SOLUTION')
        // this.currSolution = solve(result[0])
        // console.log('this.currSolution')

        // increment problem count
        this.problemCount += 1
    }

    incrementMana() {
        this.mana += this.currProblemMana
    }

    // IMPLEMENT THIS FOR VERSION ONE
    respond() {
        // currently handled in game.js
    }

    // TODO
    attack(i) {
        // pick attack at index i
        // subtract attack token cost from player's tokens
        // return health to subtract
            // handle return value in game class
            // to subtract health from enemy

        // TODO: delete when function is implemented
        return 5
    }

}

// export default Player