var Game = {};

Game.preload = function () {
    
    Game.scene = this; // Handy reference to the scene (alternative to `this` binding)
    
    //Game.load.tilemap('map', 'assets/mapa.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', 'assets/forest.png');


    
    this.load.tilemapTiledJSON('map', 'assets/island.json');

    this.load.spritesheet('dude', 'assets/link40.png', { frameWidth: (200/5), frameHeight: 160/4 });
    
    
};
var phaserGuy
var map
var layer
var aux
var blocks

Game.create = function () {
    
    
    // Display map
    
    /* // Start the P2 Physics Engine
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    // Set the gravity
    this.game.physics.p2.gravity.y = 0; */

    map = this.add.tilemap('map',35,35);

    aux= map.addTilesetImage('forest','tileset');
    layer = map.createStaticLayer('ground',aux);
    blocks = map.createStaticLayer('blocks',aux);
    
    blocks.setCollisionBetween(0,999,true);
    layer.debug = true;

    phaserGuy = this.physics.add.sprite(32, 32, 'dude', 4);
    phaserGuy.setDepth(1);
    phaserGuy.setOrigin(0, 0.5);
    phaserGuy.setCollideWorldBounds(true); //colision con bordes

    // The first parameter is the name of the tileset in Tiled and the second parameter is the key
    // of the tileset image used when loading the file in preload.
    //var tiles = Game.map.addTilesetImage('tiles', 'tileset');
    
    //Game.map.createStaticLayer(0, tiles, 0, 0);

    cursors = this.input.keyboard.createCursorKeys();

    //Animaciones:
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 0,
            end: 4
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{
            key: 'dude',
            frame: 15
        }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 5,
            end: 9
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 10,
            end: 14
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 15,
            end: 19
        }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(phaserGuy, blocks);

}
Game.update = function () {

    //this.physics.arcade.collider(phaserGuy, layer);

    if (cursors.left.isDown) {
        phaserGuy.setVelocityX(-90);
        phaserGuy.setVelocityY(0);
        phaserGuy.anims.play('left', true);
    } else if (cursors.right.isDown) {
        phaserGuy.setVelocityX(90);
        phaserGuy.setVelocityY(0);
        phaserGuy.anims.play('right', true);
    }else if(cursors.up.isDown){
        phaserGuy.setVelocityY(-90)
        phaserGuy.setVelocityX(0);
        phaserGuy.anims.play('up', true);
    }else if(cursors.down.isDown){
        phaserGuy.setVelocityY(90)
        phaserGuy.setVelocityX(0);
        phaserGuy.anims.play('down', true);
    } else {
        phaserGuy.setVelocityX(0);
        phaserGuy.setVelocityY(0);
        phaserGuy.anims.play('turn');
    }
}
