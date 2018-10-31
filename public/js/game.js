var Game = {};

Game.preload = function () {
    Game.scene = this; // Handy reference to the scene (alternative to `this` binding)
    this.load.image('tileset', 'assets/gridtiles.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.image('phaserguy', 'assets/phaserguy.png');
    this.load.spritesheet('dude', 'assets/linkf.png', { frameWidth: (165/8), frameHeight: 31 });
};
var phaserGuy

Game.create = function () {
    
    phaserGuy = this.physics.add.sprite(32, 32, 'dude', 4);
    phaserGuy.setDepth(1);
    phaserGuy.setOrigin(0, 0.5);
    phaserGuy.setCollideWorldBounds(true);
    // Display map
    Game.map = Game.scene.make.tilemap({ key: 'map' });
    // The first parameter is the name of the tileset in Tiled and the second parameter is the key
    // of the tileset image used when loading the file in preload.
    var tiles = Game.map.addTilesetImage('tiles', 'tileset');
    
    Game.map.createStaticLayer(0, tiles, 0, 0);

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
        key: 'turn',
        frames: [{
            key: 'dude',
            frame: 24
        }],
        frameRate: 20
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
            end: 31
        }),
        frameRate: 10,
        repeat: -1
    });

}
Game.update = function () {
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
