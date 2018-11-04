var Game = {};

Game.preload = function () {
    
    Game.scene = this; // Handy reference to the scene (alternative to `this` binding)
    
    //Game.load.tilemap('map', 'assets/mapa.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', 'assets/forest.png');


    
    this.load.tilemapTiledJSON('map', 'assets/island.json');

    this.load.spritesheet('dude', 'assets/linkfin.png', { frameWidth: (135/8), frameHeight: (101/4) });
    this.load.spritesheet('bomb', 'assets/bomb.png', { frameWidth: (106/4), frameHeight: 25 });
    this.load.spritesheet('boom', 'assets/explosion.png', { frameWidth: (512/4), frameHeight: (512/4) });
};
var phaserGuy
var map
var layer
var aux
var blocks
var spacekey
var bombs
var mirando="espera"
var explosion


Game.create = function () {
    
    
    

    map = this.add.tilemap('map',35,35);

    aux= map.addTilesetImage('forest','tileset');
    layer = map.createStaticLayer('ground',aux);
    blocks = map.createStaticLayer('blocks',aux);
    
    blocks.setCollisionBetween(0,999,true);
    layer.debug = true;
    phaserGuy = this.physics.add.sprite(35+16, 35+16, 'dude', 24);
    phaserGuy.setCollideWorldBounds(true); //colision con bordes

    spacekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    bombs = this.add.group();
    bombs.enableBody = true;
    bombs.physicsBodyType = Phaser .Physics.ARCADE;

    explosion = this.physics.add.sprite((15*35)/2, (15*35)/2, 'boom',0);

    cursors = this.input.keyboard.createCursorKeys();

    //Animaciones:
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 0,
            end: 7
        }),
        frameRate: 10,
        repeat: -1
    });

    

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 8,
            end: 15
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 16,
            end: 23
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 24,
            end: 35
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'bombmov',
        frames: this.anims.generateFrameNumbers('bomb', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('boom', {
            start: 0,
            end: 13
        }),
        frameRate: 10,
        repeat: -1
    });
    this.physics.add.collider(phaserGuy, blocks);
    

}

function createBomb(){

    bombs.create(phaserGuy.x, phaserGuy.y,'bomb');

    
}
Game.update = function () {

    explosion.anims.play('explode',true);

    bombs.children.iterate(function (child) {

        child.anims.play('bombmov',true);
    
    });
    //bombs.anims.play('explode', true);

    if (cursors.right.isDown) {
        phaserGuy.setVelocityX(90);
        phaserGuy.setVelocityY(0);
        phaserGuy.anims.play('right', true);
        if (mirando != "right") {
            mirando = "right";
        }
    } else if (cursors.left.isDown) {
        phaserGuy.setVelocityX(-90);
        phaserGuy.setVelocityY(0);
        phaserGuy.anims.play('left', true);
        if (mirando != "left") {
            mirando = "left";
        }
    } else if (cursors.up.isDown) {
        phaserGuy.setVelocityY(-90)
        phaserGuy.setVelocityX(0);
        phaserGuy.anims.play('up', true);
        if (mirando != "up") {
            mirando = "up";
        }
    } else if (cursors.down.isDown) {
        phaserGuy.setVelocityY(90)
        phaserGuy.setVelocityX(0);
        phaserGuy.anims.play('down', true);
        if (mirando != "down") {
            mirando = "down";
        }
    } else {
        if (mirando != "espera") {
            phaserGuy.anims.stop();
            phaserGuy.setVelocityX(0);
            phaserGuy.setVelocityY(0);

        }
        mirando = "right";
    }

    if (Phaser.Input.Keyboard.JustDown(spacekey))
    {
        createBomb()
    }
}

