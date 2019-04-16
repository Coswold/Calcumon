// Creates a phaser animation of calcumons throwing a paintball at their opponent

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
    // Load spritesheets
    this.load.spritesheet('player', '../images/spritesheets/playerspritesheet.png',
            { frameWidth: 256, frameHeight: 256 } 
            // The fixed width, height of each frame of the animation.
    );
    
    this.load.spritesheet('opponent', '../images/spritesheets/oppspritesheet.png',
            { frameWidth: 256, frameHeight: 256 } 
            // The fixed width, height of each frame of the animation.
    );

    this.load.spritesheet('paintSprite', '../images/spritesheets/paintsprite.png',
            { frameWidth: 100, frameHeight: 100 } 
            // The fixed width, height of each frame of the animation.
    );

    // Load white image background for animation canvas:
    this.load.image('bg', '../images/white.png');
}

// building the actual scene
function create () {
    this.add.image(0, 0, 'bg');
    // SET UP SPRITES
    player = this.physics.add.sprite(150, 150, 'player');
    player.setBounce(0.2); // slight bounce after throw
    player.setCollideWorldBounds(true); // prevent going out of bounds of our game box

    opponent = this.physics.add.sprite(650, 150, 'opponent');
    opponent.setBounce(0.2); // slight bounce after throw
    opponent.setCollideWorldBounds(true); // prevent going out of bounds of our game box

    paintSprite = this.physics.add.sprite(170, 190, 'paintSprite'); //OR use add group to add sprite images
    paintSprite.setCollideWorldBounds(true); // prevent going out of bounds of our game box
    paintSprite.visible = false // set to true when needed

    paintSpriteOpp = this.physics.add.sprite(660, 190, 'paintSprite'); //OR use add group to add sprite images
    paintSpriteOpp.setCollideWorldBounds(true); // prevent going out of bounds of our game box
    paintSpriteOpp.visible = false // set to true when needed

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
}

// Call these in gameState to check who is attacking when attack is triggered
function attackPlayer() {
    attack = true
}

function attackOpponent() {
    attackme = true
}

// Update animations
function update () {
    // call a function that checks for a true/false for creating animation, and what animation to create
    // player attacks
    if (player) {
        if (attack == true) {
            player.anims.play('hand-throw', true)

            paintSprite.visible = true
            paintSprite.anims.play('paint-player', true)
            // make paintball move
            paintSprite.setVelocityX(200)
            paintSprite.setVelocityY(-50)
        }
        
        attack = false
    }
    // opponenet attacks
    if (opponent) {
        if (attackme == true) {
            opponent.anims.play('opp-hand-throw', true)

            paintSpriteOpp.visible = true
            paintSpriteOpp.anims.play('paint-player', true)
            // make paintball move
            paintSpriteOpp.setVelocityX(-200)
            paintSpriteOpp.setVelocityY(-50)
        }

        attackme = false
    }
    
    // make player's paintball curve down
    if (paintSprite.y <= 120) {
        paintSprite.setVelocityY(50)
    }
    // stop moving player's paintball when it hits opponent
    if (paintSprite.x >= opponent.x) {
        paintSprite.setVelocityX(0)
        paintSprite.setVelocityY(0)

        // makes paint sprite disappear
        paintSprite.visible = false
        // reset position to player's hand
        paintSprite.x = 170
        paintSprite.y = 190
    }

    // make opponent's paintball curve down
    if (paintSpriteOpp.y <= 120) {
        paintSpriteOpp.setVelocityY(50)
    }

    // stop moving opponent's paintball when it hits player
    if (paintSpriteOpp.x <= player.x) {
        paintSpriteOpp.setVelocityX(0)
        paintSpriteOpp.setVelocityY(0)

        // makes paint sprite disappear
        paintSpriteOpp.visible = false
        // reset position to opponent's hand
        paintSpriteOpp.x = 660
        paintSpriteOpp.y = 190
    }
}