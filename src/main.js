/*
Stephen Wei
Boy vs Ship
25 hours spent
I made the game ran upwards! 
I made the boys look really cool! I made the graphics!

I have multiple sceneclasses(Title,Game play, Game Over);
Allows the player to play again after losing! Very smooth!
I have game rules on the title screen!
The player can move the ship around with arrow keys to dodge the boys!
The boys have different colors! The boys have slight structure differences in its shape with texture atlas!
I have stars falling from sky in background by simulating scrolling!
I have implemented great collisions from Boys hitting the ship!
I have nyan cats looping while gaming!
I created bunch of sound effects using sound app!
There will be random boys spawning in faster and faster speeds!
The game gets harder, aka more boy spawns over time!
The game is endless!!!!
The game starts easily and slowly progresses, so new player can have fun!
No errors!
Credits are giving at the title screen!
*/

'use strict';


let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {

            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Title, Play, GameOver ]
}


let game = new Phaser.Game(config);


let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 64;
let ship = null;
const shipWidth = 16;
const shipHeight = 50;
const shipVelocity = 50;
const boyWidth = 16;
const boyHeight = 16;
let level;
let highScore;
let newHighScore = false;
let cursors;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;