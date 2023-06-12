class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        console.log("Begin load delay");
        this.loadDelay = 100;

        this.boySpeed = 400;
        this.boySpeedMax = 1000;
        level = 0;
        this.extremeMODE = false;
        this.shadowLock = false;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 185
          }

        this.timeSurvived = this.add.text(borderUISize , borderUISize , level, scoreConfig);

        this.bgm = this.sound.add('beats', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

        if (this.textures.exists('titlesnapshot')) {
            let titleSnap = this.add.image(centerX, centerY, 'titlesnapshot').setOrigin(0.5);
            this.tweens.add({
                targets: titleSnap,
                duration: 1500,
                alpha: { from: 1, to: 0 },
                scale: { from: 1, to: 4 },
                repeat: 0
            });
        } else {
            console.log('texture error');
        }


        let line = new Phaser.Geom.Line(0, 0, w, 0);


        this.particleManager = this.add.particles('star');
        

        this.lineEmitter = this.particleManager.createEmitter({
            speedY: { min: 150, max: 500 },
            gravityY: 0,
            lifespan: 5000,
            alpha: { start: 0.5, end: 0.1 },
            tint: [ 0xffff00, 0xff0000, 0x00ff00, 0x00ffff, 0x0000ff ],
            emitZone: { type: 'random', source: line, quantity: 150 },
            blendMode: 'ADD'
        });


        ship = this.physics.add.sprite(centerX, h - 100, 'ship').setOrigin(0.5);
        ship.setCollideWorldBounds(true);
        ship.setBounce(0.5);
        ship.setImmovable();
        ship.setMaxVelocity(600, 600);
        ship.setDragX(2000);
        ship.setDragY(2000);
        ship.setDepth(1);            
        ship.destroyed = false;       
        ship.setBlendMode('SCREEN');  

        // Create a lazor
        this.graphics = this.add.graphics();
        this.offset = 0;
        this.leftSideLaser = false;
        this.daLazor = this.add.line(0, 0, 0, 0, 0, 0, 0xff00ff);
        this.laserStep = 0;

         // Create an invisible sprite
        this.invisibleSprite = new Boy(this, 0);
        //this.physics.add.sprite(0, 0, 'transparentPixel');
        this.invisibleSprite.displayWidth = 8;
        this.invisibleSprite.displayHeight = 8;
        this.invisibleSprite.setTint(0x00ff00);
        this.invisibleSprite.setVisible(true);



        this.boyGroup = this.add.group({
            runChildUpdate: true   
        });

        this.time.delayedCall(2000, () => { 
            this.addBoy();
        });


        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });


        cursors = this.input.keyboard.createCursorKeys();

     
     
     
        this.anims.create({
            key: 'riceball',
            frames: this.anims.generateFrameNames('boy', {
              prefix: 'wow',
              start: 1,
              end: 3,
              zeroPad: 2
            }),
            frameRate: 5,
            repeat: -1
        });


    }


    addBoy() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let boy = new Boy(this, this.boySpeed - speedVariance);
        boy.anims.play('riceball', true);
        this.boyGroup.add(boy);
  
    
    }

    update() {
        if(this.loadDelay > 0) {
            this.loadDelay -= 1;
            return;
        }
        console.log(this.loadDelay);
        this.graphics.clear();

        if(!ship.destroyed) {
            if(Math.random() < 0.01) {
                this.leftSideLaser = !this.leftSideLaser;
            }
            let xShift = 0;
            if(this.leftSideLaser == false) {
                xShift = 50;
            }
            // Draw a line
            let offsetY = Math.abs(this.offset);
            let x1 = ship.body.x + xShift + 0;
            let y1 = ship.body.y;
            let x2 = x1 + this.offset + 0;
            let y2 = y1 - 200 + offsetY;

            /*
            this.graphics.lineStyle(4, 0xff0000); // Set line style (width, color)
            this.graphics.beginPath(); // Begin drawing the line
            this.graphics.moveTo(x1, y1); // Starting point of the line
            this.graphics.lineTo(x2, y2); // Ending point of the line
            this.graphics.closePath(); // End drawing the line
            this.graphics.strokePath(); // Render the line
            */
           
            this.daLazor.setTo(x1, y1, x2, y2);
            let dx = x1-x2;
            let dy = y1-y2;

            this.laserStep += 1;
            if(this.laserStep > 30) {
                this.laserStep = 0;
            }
            // Enable collisions for the invisible sprite with other objects
            this.invisibleSprite.x = x1 - dx*this.laserStep/30;
            this.invisibleSprite.y = y1 - dy*this.laserStep/30;


            this.physics.world.collide(this.invisibleSprite, this.boyGroup, this.boyCollision, null, this);
        

            if(cursors.left.isDown) {
                ship.body.velocity.x -= shipVelocity;
                this.offset -= 1;
                if(this.offset < -50) {
                    this.offset = -50;
                }
            }
            if(cursors.right.isDown) {
                ship.body.velocity.x += shipVelocity;
                this.offset += 1;
                if(this.offset > 50) {
                    this.offset = 50;
                }
            }
            if(cursors.up.isDown) {
                ship.body.velocity.y -= shipVelocity;
            }
            if(cursors.down.isDown) {
                ship.body.velocity.y += shipVelocity;
            }
            ship.body.velocity.x *= 0.93;
            ship.body.velocity.y *= 0.93;


            //this.daLazor = this.add.line(0, 0, 0, 0, 0, 0, 0xff0000);

            this.physics.world.collide(ship, this.boyGroup, this.shipCollision, null, this);

        }
    }

    boyCollision(invisibleSprite, boy) {
        console.log(boy);
        this.boyGroup.remove(boy);
        boy.destroy();
    }

    levelBump() {

        level++;
        this.timeSurvived.text = "survived " + level + "s";
 
        if(level % 5 == 0) {
            this.sound.play('clang', { volume: 0.5 });       
            if(this.boySpeed <= this.boySpeedMax) {    
                this.boySpeed += 25;
                this.bgm.rate += 0.01;                         
            }
            
 

            let rndColor = this.getRandomColor();
            document.getElementsByTagName('canvas')[0].style.borderColor = rndColor;

 
            this.cameras.main.shake(100, 0.01);
        }

 
        if(level == 45) {
            ship.scaleY = 0.75;     
        }


        if(level == 75) {
            ship.scaleY = 0.5;      
            this.extremeMODE = true;
        }
    }


    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    shipCollision() {
        console.log("DEAD");
        ship.destroyed = true;                   
        this.difficultyTimer.destroy();           
        this.sound.play('death', { volume: 0.25 });
        this.cameras.main.shake(2500, 0.0075);     

        this.tweens.add({
            targets: this.bgm,
            volume: 0,
            ease: 'Linear',
            duration: 2000,
        });


        let deathParticleManager = this.add.particles('star');
        let deathEmitter = deathParticleManager.createEmitter({
            alpha: { start: 1, end: 0 },
            scale: { start: 0.75, end: 0 },
            speed: { min: 150, max: 500 },
            lifespan: 4000,
            blendMode: 'ADD'
        });

  
        let pBounds = ship.getBounds();
        deathEmitter.setEmitZone({
            source: new Phaser.Geom.Rectangle(pBounds.x, pBounds.y, pBounds.width, pBounds.height),
            type: 'edge',
            quantity: 1000
        });


        deathEmitter.explode(1000);
        

        deathParticleManager.createGravityWell({
            x: pBounds.centerX,
            y: pBounds.centerY - 200,
            power: 0.5,
            epsilon: 100,
            gravity: 100
        });

        deathParticleManager.createGravityWell({
            x: centerX,
            y: centerY,
            power: 2,
            epsilon: 100,
            gravity: 150
        });

        ship.destroy();    


        this.time.delayedCall(4000, () => { this.scene.start('gameOverScene'); });
    }
}

