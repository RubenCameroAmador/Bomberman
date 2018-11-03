var config = {
    type: Phaser.AUTO,
    width: 15*35,
    height: 15*35,
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