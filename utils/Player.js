// calcumon (INITIALLY) --> perhaps not needed?
// tokens (INITIALLY)
// health
// attacks and attack costs
// response input to a problem

class Player {
    constructor(health=100, mana=0, attacks=[], level=1) {
        // game
        this.mana = mana
        this.health = health
        this.attacks = attacks
        this.response = ''
        this.level = level
        this.prevResponseCorrectness = true // Was the last response correct?
        this.problemCount = 0 // how many problems did player deal with 
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

export default Player