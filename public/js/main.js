var config = {
    type: Phaser.AUTO,
    width: 15*32,
    height: 15*32,
    parent: 'game',
    scene: [Game]
};

var game = new Phaser.Game(config);