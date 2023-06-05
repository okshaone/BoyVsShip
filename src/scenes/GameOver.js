class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        if (localStorage.getItem('hiscore') == null) {
            localStorage.setItem('hiscore', '0');
        }

        let storedScore = parseInt(localStorage.getItem('hiscore'));

        if(level > storedScore) {
            localStorage.setItem('hiscore', level.toString());
            highScore = level;
            newHighScore = true;
        } else {
            highScore = parseInt(localStorage.getItem('hiscore'));
            newHighScore = false;
        }

        if(newHighScore) {
            this.add.bitmapText(centerX, centerY - textSpacer, 'huh', 'New Hi-Score!', 32).setOrigin(0.5);
        }
        this.add.bitmapText(centerX, 0 + textSpacer, 'huh', `You survived ${level}s under the boy's invasion`, 20).setOrigin(0.5);
        this.add.bitmapText(centerX, 0 + textSpacer*2.5, 'huh', `The best a human has ever done was ${highScore}s`, 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer*2, 'huh', `Press UP ARROW to Restart`, 36).setOrigin(0.5);
        this.addBoy();


        cursors = this.input.keyboard.createCursorKeys();
    }
   
    addBoy() {
        let boy = new Boy(this, 0 );
        boy.x = centerX;
        boy.y = centerY + 45;
        let boy2 = new Boy(this, 0 );
        boy2.x = centerX + 60;
        boy2.y = centerY;
        let boy3 = new Boy(this, 0 );
        boy3.x = centerX - 60;
        boy3.y = centerY - 20;
        
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            let textureManager = this.textures;

            this.game.renderer.snapshot((snapshotImage) => {
                if(textureManager.exists('titlesnapshot')) {
                    textureManager.remove('titlesnapshot');
                }
                textureManager.addImage('titlesnapshot', snapshotImage);
            });

            this.sound.play('respawn', { volume: 0.5 });
            this.scene.start('playScene');
        }
    }
}