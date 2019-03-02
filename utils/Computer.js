
class Computer {
    constructor(attacks=[], health=100) {
        this.attacks = attacks
        this.health = health
        this.calcumon = "monster3"
    }

    decrementHealth(power) {
        console.log("decrementing:")
        console.log(this.health)
        this.health -= power;
        console.log(this.health)
        console.log("done")
        return
    }

    attack() {
        let i = Math.random()*((this.attacks.length))
        // pick attack at index i
        let attack = this.attacks[i]
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
            // OR DODGE next attack?
        }
        if (attack == 'Fireball') {
            return 20
        }
        // health restore power
        if (attack == 'Revive 10% health') {
            this.health += 10
            if (this.health > 100) {
                this.health = 100
            }
        }
        return 0
    }

    // draw attacks for player
    drawComputerData(ctx) {
        console.log("COMPUTER DATA")
        let y = 100
        let x = ctx.canvas.width/2 + 50
        // player
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText('COMPUTER DATA: ', x, y+10)
        // draw player health
        // outer rectangle
        ctx.rect(x, y+30, 200, 20)
        ctx.stroke()
        // inner filled rectangle (depends on health percentage)
        let health = this.health/100     
        console.log(this.health)  
        console.log(health)
        ctx.fillStyle = "red";
        ctx.fillRect(x, y+30, 200*health, 20);

        // health text
        ctx.font = "14px Arial";
        ctx.fillStyle = "white";
        ctx.fillText('Health', x+10, y+45)

        // draw calcumon
        this.drawCalcumon(ctx)
        
    }

    drawCalcumon(ctx) {
        let image = document.getElementById(this.calcumon)
        let x = ctx.canvas.width/2 + 50
        let y = 250
        // let width = 200
        // let height = 200
        // add width, height parameters after x,y if needed
        ctx.drawImage(image, x, y, 300, 300); // image, x, y, width, height
    }
}