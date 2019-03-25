// function that gets - calcumon sprite with hand motion
//                    - a paint ball image 
//                    - the direction for throwing (1 for right, -1 for left)
// Use these to create a phaser animation of calcumons throwing a paintball

// Initialize game
let config = {
    type: Phaser.AUTO,
    width: 800, // game window width
    height: 600, // game window height
    physics: { // allows collisions, animations, etc.
        default: 'arcade',
        arcade: {
            // gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

// variables
let player; // player calcumon
let opponent; // opponent calcumon
let paint;

// values to update from game state
let playerCalcumon = ''
let opponentCalcumon = ''
let attack;


// Phaser Functions

// load sprites and images
function preload () {
   

    // Load a sprite
    this.load.spritesheet('player', '../images/throw-sprite.png',
            { frameWidth: 240, frameHeight: 246 } 
            // The fixed width, height of each frame of the animation.
    );
    
    // this.load.spritesheet('opponent', 'path',
    //         { frameWidth: 98, frameHeight: 138 } 
    //         // The fixed width, height of each frame of the animation.
    // );
    
    this.load.spritesheet('paint', '../images/paintball.jpeg',
            { frameWidth: 98, frameHeight: 138 } 
            // The fixed width, height of each frame of the animation.
    );

    // OR Load an image:
    this.load.image('bg', '../images/bg-new-small.png');

    // Load paint splotches as well
}

// building the actual scene
function create () {
    // this.add.image(400, 300, 'bg');
    // SET UP SPRITES
    player = this.physics.add.sprite(150, 450, 'player');
    player.setBounce(0.2); // slight bounce after throw
    player.setCollideWorldBounds(true); // prevent going out of bounds of our game box

    // opponent = this.physics.add.sprite(300, 450, 'opponent');
    // opponent.setBounce(0.2); // slight bounce after throw
    // opponent.setCollideWorldBounds(true); // prevent going out of bounds of our game box

    paint = this.physics.add.sprite(160, 460, 'paint'); //OR use add group to add sprite images
    paint.setCollideWorldBounds(true); // prevent going out of bounds of our game box
    paint.visible = false // set to true when needed

    // create a paint splotches asset group: add to it as needed, and display on top of attacked calcumon

    // CREATE ANIMATIONS
    this.anims.create({
        key: 'hand-throw',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: 0
    });

    // this.anims.create({
    //     key: 'hand-throw',
    //     frames: this.anims.generateFrameNumbers('opponent', { start: 0, end: 7 }),
    //     frameRate: 10,
    //     repeat: 0
    // });

    this.anims.create({
        key: 'paint-throw-player',
        frames: this.anims.generateFrameNumbers('paint', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: 0
    });

    // this.anims.create({
    //     key: 'paint-throw-opponent',
    //     frames: this.anims.generateFrameNumbers('paint', { start: 0, end: 7 }),
    //     frameRate: 10,
    //     repeat: 0
    // });
}

// call these in gameState
function setup() {

}

function attackPlayer() {
    console.log("ATTACKING")
    attack = true
}

function attackOpponent() {
    // update values
}

function update () {
    // call a function that checks for a true/false for creating animation, and what animation to create
    // based on result, do stuff here
    // EX: player.anims.play('throw', true);
        // paint.setVelocityX(0)
        // paint.setVelocityY(0)
        // paint.visible = false
        // paint.x = 450
        // paint.y = 460
        // paint.visible = true // or false
    attack = true
    if (player) {
        if (attack == true) {
            player.anims.play('hand-throw', true)
            paint.visible = true
            // make ball move
            paint.setVelocityX(200)
            paint.setVelocityY(-50)
        }
        
        attack = false
    }

    // make ball stop moving and restore location
    if (paint.x >= 750) {
        paint.setVelocityX(0)
        paint.setVelocityY(0)
        paint.visible = false
        paint.x = 160
        paint.y = 460
    }
    // make ball curve down
    if (paint.y <= 380) {
        paint.setVelocityY(50)
    }
}