/*
Stephen Wei
Boy vs Ship
25 hours spent
I made the game ran upwards! 
I made the boys look really cool! I made the graphics!
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