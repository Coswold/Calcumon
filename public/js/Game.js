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
    }

    initialDraw(ctx) {
        // attack label
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "Black"
        this.ctx.fillText("Attacks    (Pick an attack, then answer the question. If you answer correctly, the attack will execute.)", this.x, this.y-20)
        console.log("DRAWING ATTACKS")
    }
    // ctx is canvas access, index is for selected attack
    draw(ctx, index) {
        ctx.clearRect(this.x, this.y, this.x*this.numAttacks, this.height);
        // // attack label
        // this.ctx.font = "30px Arial";
        // this.ctx.fillStyle = "Black"
        // this.ctx.fillText("Attacks    (Pick an attack, then answer the question. If you answer correctly, the attack will execute.)", this.x, this.y-20)
        // console.log("DRAWING ATTACKS")
        // attack boxes
        for (let i = 0; i < this.numAttacks; i++) {
            let x = this.x + this.width*i
            this.attackPositions[i] = x
            ctx.rect(x, this.y, this.width, this.height)
            ctx.stroke()
            ctx.fillStyle = "lightblue";
            if (i == index) {
                ctx.fillStyle = "pink"
            }
            ctx.fillRect(x, this.y, this.width, this.height);

            // attack names
            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(this.attackNames[i], x+20, this.y + (this.height/2))
            
            // costs
            ctx.font = "18px Arial";
            ctx.fillStyle = "red";
            ctx.fillText(this.attackCosts[i], x+this.width - 30, this.y + 30)
        }
    }

    // Onclick events: return string name of attack or i index of attack location in attacks array?
    attackHandler(x, y) {
        // check if y is in the right range
        console.log(this.y, this.y + this.height)
        if (y >= this.y & y <= this.y + this.height) {
            // check which x it falls into
            console.log("RIGHT RANGE")
            for (let i = 0; i < this.numAttacks; i++) {
                if (x >= this.attackPositions[i] & x <= this.attackPositions[i]+this.width) {
                    console.log("THIS ATTACK: ")
                    console.log(i)
                    // i is the correct location for the attack
                    return i
                }
            }
        }
        return 0
           
    }
}
    
class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx
        this.canvas = canvas
        this.gameState = true
        
        this.input = ''
        this.foundSolution = false
        console.log(ctx.canvas.height)
        this.attacks = new Attacks(ctx)

        this.computer = new Computer(this.attacks.attackNames)
        this.player = new Player(this.attacks.attackNames, "") // initialize player with attacks and calcumon name
        
        this.attackIndex = 0
        
    }

    // IMPLEMENT FOR THIS VERSION
    

    // TO DO: check if player solution is valid
    // input: userInput
    verifySolution() {
        // userInput == curr solution
        // alert(userInput)
        
        this.player.prevResponseCorrectness = true
        this.foundSolution = true
        return true
        // console.log(this.input._value)
        // let userInput = this.input._value
        // alert(userInput)
        // let solution = this.player.currSolution
        // // set this to true in order to handle updates when solution is found
        // this.foundSolution = true
        // if (userInput == solution) {
        //     this.foundSolution = true
        // }
        // this.player.prevResponseCorrectness = this.foundSolution
        
        // return this.foundSolution
    }

    gameOver() {
        // figure out who won
        // if player won: update level, give coins
        this.player.level += 1

        return
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

        // draw attacks
        this.attacks.draw(this.ctx, this.attackIndex)

        // draw player data
        this.player.drawPlayerData(this.ctx)
        // draw computer data
        this.computer.drawComputerData(this.ctx)
        
    }
    // determines where player attacks or opponent
    // i = index of attack, value = true for player, false for opponent
    attack() {
        // WAIT TILL THEY CHOOSE AN ATTACK...
        let i = this.attackIndex
        
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
                this.computer.decrementHealth(power)
                console.log("Attacked computer")
            }
        }
        else if (this.player.dodge == false) {
            power = this.computer.attack()
            this.player.health -= power
            this.player.dodge = false
        }
        console.log(this.computer.health)
        this.attackIndex = 0
        return
    }
    // calling all mouse click handlers
    mouseClickHandler(e) {
        let x = e.clientX
        let y = e.clientY - 100
        console.log(x,y)

        // update attack index
        let i = this.attacks.attackHandler(x,y)
        console.log("ATTACK INDEX IN MOUSE CLICK:")
        console.log(i)
        if (i) {
            this.attackIndex = i
        } else {
            this.attackIndex = 0
        }
        // update attacks
        this.attacks.draw(this.ctx, this.attackIndex)
        
    }

    // IMPLEMENT FOR THIS VERSION
    // run this function on a time loop
    update() {
        // update player and computer data
        // update for responsiveness
        // this.ctx.canvas.width  = window.outerWidth;
        // this.ctx.canvas.height = window.outerHeight;
        // this.drawProblem()
        // run verify solution and foundSolution
        
        // check if player got the solution for the problem
        if (this.foundSolution == true) {
            // increment mana
            this.player.incrementMana()
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

