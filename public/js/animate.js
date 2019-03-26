// function that gets - calcumon sprite with hand motion
//                    - a paint ball image 
//                    - the direction for throwing (1 for right, -1 for left)
// Use these to create a phaser animation of calcumons throwing a paintball

// Initialize game
let config = {
    type: Phaser.AUTO,
    width: 800, // game window width
    height: 300, // game window height: was 600
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
let attackme;


// Phaser Functions

// load sprites and images
function preload () {
   

    // Load a sprite
    // this.load.spritesheet('player', '../images/throw-sprite.png',
    //         { frameWidth: 240, frameHeight: 246 } 
    //         // The fixed width, height of each frame of the animation.
    // );

    this.load.spritesheet('player', '../images/spritesheet_1.png',
            { frameWidth: 256, frameHeight: 256 } 
            // The fixed width, height of each frame of the animation.
    );
    
    this.load.spritesheet('opponent', '../images/oppspritesheet.png',
            { frameWidth: 256, frameHeight: 256 } 
            // The fixed width, height of each frame of the animation.
    );
    
    this.load.spritesheet('paint', '../images/paintball.jpeg',
            { frameWidth: 98, frameHeight: 138 } 
            // The fixed width, height of each frame of the animation.
    );

    this.load.spritesheet('paintSprite', '../images/paintsprite_1.png',
            { frameWidth: 100, frameHeight: 100 } 
            // The fixed width, height of each frame of the animation.
    );

    this.load.spritesheet('paintSpriteOpp', '../images/paintspriteopp.png',
            { frameWidth: 100, frameHeight: 100 } 
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
    player = this.physics.add.sprite(150, 150, 'player');
    player.setBounce(0.2); // slight bounce after throw
    player.setCollideWorldBounds(true); // prevent going out of bounds of our game box

    opponent = this.physics.add.sprite(650, 150, 'opponent');
    opponent.setBounce(0.2); // slight bounce after throw
    opponent.setCollideWorldBounds(true); // prevent going out of bounds of our game box

    paint = this.physics.add.sprite(170, 190, 'paint'); //OR use add group to add sprite images
    paint.setCollideWorldBounds(true); // prevent going out of bounds of our game box
    paint.visible = false // set to true when needed

    paintSprite = this.physics.add.sprite(170, 190, 'paintSprite'); //OR use add group to add sprite images
    paintSprite.setCollideWorldBounds(true); // prevent going out of bounds of our game box
    paintSprite.visible = false // set to true when needed

    paintSpriteOpp = this.physics.add.sprite(660, 190, 'paintSprite'); //OR use add group to add sprite images
    paintSpriteOpp.setCollideWorldBounds(true); // prevent going out of bounds of our game box
    paintSpriteOpp.visible = false // set to true when needed

    // create a paint splotches asset group: add to it as needed, and display on top of attacked calcumon

    // CREATE ANIMATIONS
    this.anims.create({
        key: 'hand-throw',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'opp-hand-throw',
        frames: this.anims.generateFrameNumbers('opponent', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'paint-throw-player',
        frames: this.anims.generateFrameNumbers('paint', { start: 0, end: 7 }),
        frameRate: 6,
        repeat: 0
    });

    this.anims.create({
        key: 'paint-player',
        frames: this.anims.generateFrameNumbers('paintSprite', { start: 0, end: 3 }),
        frameRate: 3,
        repeat: 0
    });

    this.anims.create({
        key: 'paint-opp',
        frames: this.anims.generateFrameNumbers('paintSpriteOpp', { start: 0, end: 3 }),
        frameRate: 3,
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
    console.log("ATTACKING TEST PLAYER")
    attack = true
}

function attackOpponent() {
    // update values
    console.log("TESTING COMPUTER ANIMATION THING")
    attackme = true
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
    // attack = true
    if (player) {
        if (attack == true) {
            player.anims.play('hand-throw', true)

            paintSprite.visible = true
            // paintSprite.visible = true
            paintSprite.anims.play('paint-player', true)
            // make ball move
            paintSprite.setVelocityX(200)
            paintSprite.setVelocityY(-50)
        }
        
        attack = false
    }
    
    if (opponent) {
        if (attackme == true) {
            opponent.anims.play('opp-hand-throw', true)

            paintSpriteOpp.visible = true
            // paintSprite.visible = true
            paintSpriteOpp.anims.play('paint-player', true)
            // make ball move
            paintSpriteOpp.setVelocityX(-200)
            paintSpriteOpp.setVelocityY(-50)
        }

        attackme = false
    }
    
    // make ball curve down
    if (paintSprite.y <= 120) {
        paintSprite.setVelocityY(50)
    }

    if (paintSprite.x >= opponent.x) {
        paintSprite.setVelocityX(0)
        paintSprite.setVelocityY(0)

        // makes paint sprite disappear
        paintSprite.visible = false
        paintSprite.x = 170
        paintSprite.y = 190
    }

    // make ball curve down
    if (paintSpriteOpp.y <= 120) {
        paintSpriteOpp.setVelocityY(50)
    }

    if (paintSpriteOpp.x <= player.x) {
        paintSpriteOpp.setVelocityX(0)
        paintSpriteOpp.setVelocityY(0)

        // makes paint sprite disappear
        paintSpriteOpp.visible = false
        paintSpriteOpp.x = 170
        paintSpriteOpp.y = 190
    }
}