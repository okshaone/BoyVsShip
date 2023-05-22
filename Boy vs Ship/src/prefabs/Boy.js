
class Boy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {

        super(scene,  Phaser.Math.Between(boyWidth/2, game.config.width - boyWidth/2), 0 - boyHeight, 'boy'); 
        
        this.parentScene = scene;              


        this.parentScene.add.existing(this);   
        this.parentScene.physics.add.existing(this);  
        this.setVelocityY(velocity);           
        this.setImmovable();                    
        this.tint = Math.random() * 0xFFFFFF;   
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