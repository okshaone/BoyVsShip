class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {

        let title01 = this.add.bitmapText(centerX, 100, 'huh', 'Shootan Weebgame', 48).setOrigin(0.5).setTint(0x00ff00);
        let title02 = this.add.bitmapText(centerX, centerY + 100, 'huh', 'Shootan Weebgame', 48).setOrigin(0.5).setTint(0x00ffff).setBlendMode('SCREEN');
        
        this.add.bitmapText(centerX, centerY - textSpacer*2, 'huh', 'Use the ARROWS to wiggle around ', 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY - textSpacer*1.5, 'huh', 'so you avoid hitting the "boys"', 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY - textSpacer*0.1, 'huh', 'Press UP ARROW to Start', 36).setOrigin(0.5);
        this.add.bitmapText(centerX, h - textSpacer - 20, 'huh', 'BGM by JJD ', 16).setOrigin(0.5);
        this.add.bitmapText(centerX, h - textSpacer, 'huh', 'Sound Effect and Grafics by', 16).setOrigin(0.5);
        this.add.bitmapText(centerX, h - textSpacer + 20, 'huh', 'Stephen Wei', 16).setOrigin(0.5);

        this.tweens.add({
            targets: title01,
            duration: 2500,
            angle: { from: -10, to: 10 },
            yoyo: true,
            repeat: -1,
            onYoyo: function() {
                this.cameras.main.shake(100, 0.0025);
            },
            onYoyoScope: this
        });
        this.tweens.add({
            targets: title02,
            duration: 2500,
            angle: { from: 10, to: -10 },
            yoyo: true,
            repeat: -1,
            onRepeat: function() {
                this.cameras.main.shake(100, 0.0025);
            },
            onRepeatScope: this
        });


        cursors = this.input.keyboard.createCursorKeys();  
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

            this.scene.start('playScene');
        }
    }
}