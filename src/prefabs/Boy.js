

// Phaser.GameObjects.Sprite
class Boy extends Phaser.GameObjects.Sprite {
    constructor(scene, velocity) {

        super(scene,  Phaser.Math.Between(boyWidth/2, game.config.width - boyWidth/2), 0 - boyHeight, 'boy'); 
        
        this.parentScene = scene;              


        this.parentScene.add.existing(this);   
        this.parentScene.physics.add.existing(this);  
        this.body.setVelocityY(velocity);           
        this.body.setImmovable();                    
        this.tint = Math.random() * 0xFFFFFF | 0xFF8888; // bitwise or to full the red, and ensure at least 8888 for G/B
        this.newBoy = true;             
    }

    update() {

        if(this.newBoy && this.y > centerY) {

            this.parentScene.addBoy();
            this.newBoy = false;
        }

        if(this.y > h) {
            this.destroy();
        }
    }
}