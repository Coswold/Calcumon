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

let player;
let cursors;
let jump;
let ball;

// load sprites and images to use
function preload ()
{
    // this.load.image('sky', 'assets/sky.png');
    this.load.spritesheet('chibi', 
            'assets/chibi-row.png',
            { frameWidth: 98, frameHeight: 138 } 
            // The fixed width, height of each frame of the animation.
        );
    this.load.spritesheet('chibi-reverse', 
        'assets/reverse.png',
        { frameWidth: 158, frameHeight: 198 } 
        // The fixed width, height of each frame of the animation.
    );
    this.load.spritesheet('chibi-throw', 
        'assets/throw.png',
        { frameWidth: 158, frameHeight: 198 } 
        // The fixed width, height of each frame of the animation.
    );

    this.load.spritesheet('sprites', 
        'assets/sprites.png',
        { frameWidth: 158, frameHeight: 198 } 
        // The fixed width, height of each frame of the animation.
    );

    this.load.spritesheet('ball', 
        'assets/ball.png',
        { frameWidth: 158, frameHeight: 198 } 
        // The fixed width, height of each frame of the animation.
    );
}

// building the actual scene
function create ()
{
    // to draw the images onto game
    // this.add.image(400, 300, 'sky');
    // add in order, stuff in the back at the top, layering on top as you add more code below
    player = this.physics.add.sprite(300, 450, 'sprites');
    player.setBounce(0.2); // slight bounce after jumping
    player.setCollideWorldBounds(true); // prevent going out of bounds of our game box
    
    jump = this.physics.add.sprite(450, 450, 'chibi-throw');
    jump.setBounce(0.2)
    jump.setCollideWorldBounds(true)

    ball = this.physics.add.sprite(400, 460, 'ball');
    ball.setBounce(0.2)
    ball.setCollideWorldBounds(true)
    ball.visible = false

    // create animation

    this.anims.create({
        key: 'throw',
        frames: this.anims.generateFrameNumbers('sprites', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'return',
        frames: this.anims.generateFrameNumbers('chibi-throw', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: 0
    });

    // initialize cursors
    cursors = this.input.keyboard.createCursorKeys();
}

// run animations
function update ()
{
    if (cursors.up.isDown)
    {
        // player.setVelocityX(-160);

        player.anims.play('throw', true);
        // player.x = 300
        // player.anims.play('return', true);
    }
    if (cursors.down.isDown)
    {
        // player.setVelocityX(-160);

        jump.anims.play('return', true);
        ball.visible = true
        // make ball move
        ball.setVelocityX(200)
        ball.setVelocityY(-50)
        
        // player.anims.play('return', true);
    }
    // make ball stop moving and restore location
    if (ball.x >= 750) {
        ball.setVelocityX(0)
        ball.setVelocityY(0)
        ball.visible = false
        ball.x = 450
        ball.y = 460
    }
    // make ball curve down
    if (ball.y <= 420) {
        ball.setVelocityY(50)
    }
}