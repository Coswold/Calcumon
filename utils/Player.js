// calcumon (INITIALLY) --> perhaps not needed?
// tokens (INITIALLY)
// health
// attacks and attack costs
// response input to a problem

<<<<<<< HEAD
// import problem generator
import { getProblem } from 'problemGenerator'

// import solution API
import { solve } from 'solutionApi'
=======
// import problem generator 
// import { getProblem } from 'problemGenerator'
// // import solution API
// import { solve } from 'solutionApi'
>>>>>>> 4c2a5a9db784e3950b8d250cf9606ffb13cf9e02

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
<<<<<<< HEAD
        this.currSolution = solve(result[0])
        console.log(this.currSolution)
=======
        // this.currSolution = solve(result[0])
        // console.log('this.currSolution')
>>>>>>> 4c2a5a9db784e3950b8d250cf9606ffb13cf9e02

        // increment problem count
        this.problemCount += 1
    }

    incrementMana() {
        this.mana += this.currProblemMana
    }

    // IMPLEMENT THIS FOR VERSION ONE
    respond() {
<<<<<<< HEAD
        // NOTE: CHECK IF WE CAN USE document.getElementById in this file to access gamePlay.handlebars!
        // let submit = document.getElementById('submit')
        // let userInput = null
        // submit.onclick = function() {
        //     userInput = document.getElementById('userInput').value
        //     alert(userInput)
        // }
        // return userInput
=======
        // currently handled in game.js
>>>>>>> 4c2a5a9db784e3950b8d250cf9606ffb13cf9e02
    }

    // Returns the health value that needs to be subtracted from opponent
    attack(i) {
        // pick attack at index i
        attack = self.attacks[i]
        // subtract attack token cost from player's tokens
        
        if (attack == 'Punch') {
            return 10
        }
        if (attack == 'Kick') {
            return 10
        }
        if (attack == 'Super Attack') {
            return 30
        }
        if (attack == 'Dodge') {
            // restore health to before opponent's attack affected it
        }
        if (attack == 'Fireball') {
            return 20
        }
        // health restore power
        if (attack == 'Revive 10% health') {
            self.health += 10
            if (self.health > 100) {
                self.health = 100
            }
        }
        return 0
    }

}

<<<<<<< HEAD
player = new Player()
player.newProblem()

//export default Player
=======
// export default Player
>>>>>>> 4c2a5a9db784e3950b8d250cf9606ffb13cf9e02
