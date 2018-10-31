var Game = {};

Game.preload = function(){
    Game.scene = this; // Handy reference to the scene (alternative to `this` binding)
    this.load.image('tileset', 'assets/gridtiles.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.image('phaserguy', 'assets/phaserguy.png');
};
Game.create = function(){
    var phaserGuy = this.add.image(32,32,'phaserguy');
    phaserGuy.setDepth(1);
    phaserGuy.setOrigin(0,0.5);
 // Display map
 Game.map = Game.scene.make.tilemap({ key: 'map'});
 // The first parameter is the name of the tileset in Tiled and the second parameter is the key
 // of the tileset image used when loading the file in preload.
 var tiles = Game.map.addTilesetImage('tiles', 'tileset');
 Game.map.createStaticLayer(0, tiles, 0,0);
}