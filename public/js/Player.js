// calcumon (INITIALLY) --> perhaps not needed?
// tokens (INITIALLY)
// health
// attacks and attack costs
// response input to a problem

// import problem generator
// import { getProblem } from 'problemGenerator'

// var getProblem = require('./problemGenerator.js');

// import solution API
//import { solve } from 'solutionApi'
// var solve = require('./solutionApi.js');

class Player {
    constructor(attacks=[], calcumon = "", level=1, health=100, mana=0) {
        // game
        this.coins = 100
        this.mana = mana
        this.health = health // out of a 100
        this.attacks = attacks
        this.calcumon = calcumon
        // for testing purposes ONLY:
        this.calcumon = "monster1"

        // ['Punch', 'Revive 10% health', 'Kick', 'Super Attack', 'Dodge', 'Fireball']
        // [-10, +10, -10, -30, (restore what was lost), -20]
        this.response = ''
        this.level = level // access from database
        this.prevResponseCorrectness = true // Was the last response correct?
        this.problemCount = 1 // how many problems did player deal with

        this.currProblem = ''
        this.currSolution = ''
        this.currProblemMana = 0
        this.newProblem()

        this.dodge = false
        
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
        this.currSolution = solve(result[0])
        console.log(this.currSolution)

        // increment problem count
        this.problemCount += 1
    }

    incrementMana() {
        this.mana += this.currProblemMana
    }

    decrementMana(x) {
        this.mana -= x
    }

    // IMPLEMENT THIS FOR VERSION ONE
    respond() {
        // NOTE: CHECK IF WE CAN USE document.getElementById in this file to access gamePlay.handlebars!
        // let submit = document.getElementById('submit')
        // let userInput = null
        // submit.onclick = function() {
        //     userInput = document.getElementById('userInput').value
        //     alert(userInput)
        // }
        // return userInput
    }

    // Returns the health value that needs to be subtracted from opponent
    attack(i) {
        // pick attack at index i
        console.log("in player attack")
        console.log(i)
        console.log(this.attacks)
        let attack = this.attacks[i]
        // subtract attack token cost from player's tokens

        if (attack == 'Punch') {
            if (this.mana < 10) {
                return "Not Enough Mana"
            }
            console.log(this.mana)
            this.decrementMana(10)
            return 10
        }
        if (attack == 'Kick') {
            if (this.mana < 10) {
                return "Not Enough Mana"
            }
            this.decrementMana(10)
            return 10
        }
        if (attack == 'Fireball') {
            if (this.mana < 30) {
                return "Not Enough Mana"
            }
            this.decrementMana(30)
            return 30
        }
        if (attack == 'Super Attack') {
            if (this.mana < 30) {
                return "Not Enough Mana"
            }
            this.decrementMana(30)
            return 30
        }
        if (attack == 'Dodge') {
            if (this.mana < 20) {
                return "Not Enough Mana"
            }
            this.decrementMana(20)
            this.dodge = true
            // DODGES next attack?
        }
        // health restore power
        if (attack == 'Revive 10% health') {
            if (this.mana < 20) {
                return "Not Enough Mana"
            }
            this.decrementMana(20)
            this.health += 10
            if (this.health > 100) {
                this.health = 100
            }
        }
        return 0
    }

    // draw attacks for player
    drawPlayerData(ctx) {

        let y = 120
        let x = 200

        // bounding box
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillRect(x-20, y-20, 240, 120)

        // player
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText('YOUR DATA: ', x, y+10)
        // draw player health
        // outer rectangle
        ctx.rect(x, y+30, 200, 20)
        ctx.stroke()
        // inner filled rectangle (depends on health percentage)
        let health = this.health/100

        ctx.fillStyle = "red";
        ctx.fillRect(x, y+30, 200*health, 20);

        // health text
        ctx.font = "14px Arial";
        ctx.fillStyle = "white";
        ctx.fillText('Health', x+10, y+45)
    
        // draw player mana
        let text = 'Mana: ' + this.mana
        console.log(text)
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(text, x, y+90)

        // draw calcumon
        this.drawCalcumon(ctx)
    }

    drawCalcumon(ctx) {
        let image = document.getElementById(this.calcumon)
        let x = 170
        let y = 250
        // let width = 200
        // let height = 200
        // add width, height parameters after x,y if needed
        ctx.drawImage(image, x, y, 300, 300); // image, x, y, width, height
    }

}
// player = new Player()
// player.newProblem()

// export default Player
