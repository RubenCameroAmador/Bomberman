var config = {
    type: Phaser.AUTO,
    width: 15*32,
    height: 15*32,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
          gravity: {
            y: 0
          },
          debug: false
        }
      },
    scene: [Game]
};

var game = new Phaser.Game(config);