// import { throwStatement } from "babel-types";

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
class Attacks {
    constructor(ctx) {
        this.ctx = ctx
        this.attackNames = ['Punch', 'Revive 10% health', 'Kick', 'Super Attack', 'Dodge', 'Fireball']
        this.attackCosts = [10, 20, 10, 30, 20, 30]
        // number of attacks
        this.numAttacks = 6 // use len(this.attacks)
        this.attackPositions = [0,0,0,0,0,0]
        // width, height position for attack
        this.width = ctx.canvas.width/this.numAttacks;
        console.log("WIDTH: ")
        console.log(this.width)
        this.height = 100;
        // x,y position for first attack click box's top left corner
        this.x = 0
        this.y = ctx.canvas.height - 320
        this.initialDraw(ctx)

        this.currIndex = 0
    }

    // ctx is canvas access, index is for selected attack
    initialDraw(ctx) {
        // attack label
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "White"
        this.ctx.fillText("Attacks    (Pick an attack, then answer the question. If you answer correctly, the attack will execute.)", this.x+70, this.y-100)
        console.log("DRAWING ATTACKS")
        
    }
    
    drawAttackButtons() {
        let index = this.currIndex
        console.log("attack button index: ")
        console.log(index)
        let attackDiv = document.getElementById('attackList')
        attackDiv.innerHTML = ''
        for (let i = 0; i <this.numAttacks; i++) {
            name = this.attackNames[i]
            let color = 'lightblue'
            if (i == index) {
                color = 'lightcoral'
            }
            attackDiv.innerHTML += `<button class = 'attackButton' style='background-color: ${color}' id='${name}'> ${name} <p> Cost: ${this.attackCosts[i]} </p> </button>`
        }

    }

}
    
class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx
        this.canvas = canvas
        this.gameState = true
        this.gameOveris = false
        
        this.input = ''
        this.foundSolution = false
        console.log(ctx.canvas.height)
        this.attacks = new Attacks(ctx)

        this.computer = new Computer(this.attacks.attackNames)
        this.player = new Player(this.attacks.attackNames, "") // initialize player with attacks and calcumon name
        
        // this.attackIndex = 0
        this.computer.drawCalcumon(ctx)
        this.attacks.drawAttackButtons()
        
    }

    // IMPLEMENT FOR THIS VERSION
    

    // TO DO: check if player solution is valid
    // input: userInput
    verifySolution() {
        console.log("VERIFY SOLUTION")
        // userInput == curr solution
        // alert(userInput)
        let userInput = this.input._value.toString()
        let correctSolution = this.player.currSolution.toString()
        console.log(userInput, correctSolution)
        if (userInput == correctSolution) {
            this.player.prevResponseCorrectness = this.foundSolution
            this.foundSolution = true
        }
        else {
            this.player.prevResponseCorrectness = this.foundSolution
            this.foundSolution = false
        }
        console.log("VERIFY SOLUTION ENDS")
        // testing
        // this.player.prevResponseCorrectness = true
        // this.foundSolution = true
        // return true
        // testing ends
        return this.foundSolution
    }

    // DRAW FUNCTIONS
    drawProblem() {
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        console.log(this.player.currProblem)
        ctx.fillText("Problem: "+this.player.currProblem, 60, 50);
    }

    drawInputField() {
        this.input = new CanvasInput({
            canvas: document.getElementById('game'),
            fontSize: 18,
            fontFamily: 'Arial',
            fontColor: '#212121',
            fontWeight: 'bold',
            width: 450,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 3,
            boxShadow: '1px 1px 0px #fff',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            // placeHolder: 'Enter your solution here...',
            value: this.input._value,
            x: ctx.canvas.width/2 + 50,
            y: 20,
            onsubmit: () => { 
                // if player just answered
                this.verifySolution() 
                // allow attacking
                this.attack()
                return
            }
        });
        this.input.render()
    }

    winPopup() {
        this.player.level += 1

        // // bounding box
        // ctx.fillStyle = "rgba(200, 205, 255, 0.6)";
        // ctx.fillRect(100, 0, 1500, 1000)

        var img = document.getElementById("win");
        this.ctx.drawImage(img, 500, 200, 620, 500);
        var img2 = document.getElementById("next");
        this.ctx.drawImage(img2, 620, 350, 400, 80);
        var img3 = document.getElementById("dash");
        this.ctx.drawImage(img3, 620, 500, 400, 80);
    }
    
    losePopup() {

        var img = document.getElementById("lose");
        this.ctx.drawImage(img, 500, 200, 620, 500);
        var img2 = document.getElementById("try");
        this.ctx.drawImage(img2, 620, 350, 400, 80);
        var img3 = document.getElementById("dash");
        this.ctx.drawImage(img3, 620, 500, 400, 80);
        
    }
    
    gameOver(winner) {
        // figure out who won
        // if player won: update level, give coins
        // allocate new computer reset health
        // display gameOver: YOU WON OR YOU LOSE SCREEN
        // When play is clicked: Play again or Play next level:
        // start level 2 game or restart game
    
        //if player wins show You WIn! and link to next level
        //if player loses show Try again (link)
        if (winner == "Player") {
            this.winPopup()
            this.gameOveris = true
        } else if (winner == "Computer"){
            this.losePopup()
            this.gameOveris = true
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
        
        this.attacks.initialDraw()
        // draw attacks
        this.attacks.drawAttackButtons()

        // draw player data
        this.player.drawPlayerData(this.ctx)
        // draw computer data
        this.computer.drawComputerData(this.ctx)
        
    }
    // determines where player attacks or opponent
    // i = index of attack, value = true for player, false for opponent
    attack() {
        // WAIT TILL THEY CHOOSE AN ATTACK...
        // let i = this.attackIndex
        let i = this.attacks.currIndex
        
        console.log("attacking, game class")
        let value = this.player.prevResponseCorrectness;
        console.log(value)
        console.log("sol")
        console.log(this.foundSolution)
        let power;
        if (value == true) {
            power = this.player.attack(i)
            
            // if attack costs more mana than player has:
            // give a message
            if (power == "Not Enough Mana") {
                // do something
                alert("Not enough mana")
            }
            else {
                this.player.decrementMana(this.attacks.attackCosts[i])
                this.computer.decrementHealth(power)
                console.log("Attacked computer")
            }
        }
        else if (this.player.dodge == false) {
            power = this.computer.attack()
            if (this.player.health > 0){
                this.player.health -= power
            }
            //Do I put this in the if statement
            this.player.dodge = false
        }
        console.log(this.computer.health)
        // this.attackIndex = 0
        this.attacks.currIndex = 0
        return
    }

    // IMPLEMENT FOR THIS VERSION
    // run this function on a time loop
    update() {
        if (this.player.health <= 0) {
            this.gameOver("Computer")
        } else if (this.computer.health <= 0) {
            this.gameOver("Player")
        }
        // check if player got the solution for the problem
        if (this.foundSolution == true) {
            // increment mana
            if (this.player.health > 0 & this.computer.health > 0) {
                this.player.incrementMana()
                this.player.newProblem()
            } 

            // if yes, call new problem
            
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

        // // handle gameOver state
        // if (this.player.health <= 0) {
        //     gameOver(winner = "Computer")
        //     alert("Hi")
        // } else if (this.computer.health <= 0) {
        //     gameOver(winner = "Player")
        //     alert("bye")
        // }
        
    }

    updateIndex(i) {
        if (this.gameOveris != true) {
            console.log("setting ", i)
            this.attacks.currIndex = i
            console.log(this.attacks.currIndex)
            this.attacks.drawAttackButtons()
        }
    }
    
}

