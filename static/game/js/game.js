// Based upon
// https://phaser.io/examples/v2/arcade-physics/asteroids-movement#download

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 900,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
    render: render,
  }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('space', '../../static/game/assets/skies/deep-space.jpg');
    this.load.image('ship', '../../static/game/assets/games/asteroids/ship.png');
}

function create() {
    this.players = this.physics.add.group();
    this.ship = this.add.sprite(300, 300, 'ship');
    this.players.add(this.ship)
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    const shipAcceleration = 300;

    if (this.cursors.up.isDown)
    {
        this.physics.velocityFromRotation(this.ship.rotation, shipAcceleration, this.ship.body.acceleration);
    }
    else
    {
        this.ship.body.acceleration.set(0);
    }

    if (this.cursors.left.isDown)
    {
        this.ship.body.angularVelocity = -300;
    }
    else if (this.cursors.right.isDown)
    {
        this.ship.body.angularVelocity = 300;
    }
    else
    {
        this.ship.body.angularVelocity = 0;
    }
}

function render() {
}
