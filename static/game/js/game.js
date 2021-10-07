// Based upon
// https://phaser.io/examples/v2/arcade-physics/asteroids-movement#download

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 896,
  backgroundColor: '#2d2d2d',
  physics: {
    default: 'arcade',
    arcade: {
      // TODO: set debug to true to see hit boxes then adjust size to be smaller.
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
    this.load.image('ball', '../../static/game/assets/games/asteroids/asteroid2.png');
    this.load.image('tiles', '../../static/game/assets/games/asteroids/asteroid3.png');
    this.load.tilemapTiledJSON('map', '../../static/game/assets/maps/walls2.json');
}

function create() {
    var map = this.make.tilemap({ key: 'map' });
    var tileSet = map.addTilesetImage('asteroid3', 'tiles');
    this.walls = map.createStaticLayer('Tile Layer 1', tileSet)
    this.walls.setCollisionByProperty({ collides: true });

    // Debug
    // var debugGraphics = this.add.graphics().setAlpha(0.7);
    // walls.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceTileColor: new Phaser.Display.Color(40, 39, 37, 255),
    // })

    // this.balls = this.physics.add.group();
    this.ball = this.physics.add.sprite(400, 450, 'ball');
    this.ball.body.bounce.set(0.5)
    // this.balls.add(this.ball)

    // this.players = this.physics.add.group();
    this.ship = this.physics.add.sprite(400, 700, 'ship');
    this.ship.body.bounce.set(0.2)
    // this.players.add(this.ship)

    this.physics.add.collider(this.ship, this.ball);
    this.physics.add.collider(this.ship, this.walls);
    this.physics.add.collider(this.ball, this.walls);

    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // TODO - ship and ball should slow down when no input

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
