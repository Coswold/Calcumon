// this file handles drawing to the game canvas element

// imports
// import game, player, and computer here

// reference to canvas
var canvas = document.getElementById("canvasID"); // change ID based on gameIndex.handlebars
// 2D rendering context, to paint to canvas
var ctx = canvas.getContext("2d");
// specify canvas width, height here
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// example: how to draw a rectangle
    // ctx.beginPath();
    // ctx.rect(x, y, width, height);
    // ctx.fillStyle = "white";
    // ctx.fill();
    // ctx.closePath();

// initialize game
// let game = new Game()
function draw() {
    // handle drawing to canvas, calling any game functions
};

// will execute draw every 10 milliseconds
setInterval(draw, 10);