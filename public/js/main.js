//initiate the Phaser framework
var game = new Phaser.Game(1024, 576, Phaser.AUTO);
game.global = {
  charSelected: 0,
  sceneSelected: 0
};

game.state.add("loadState", LoadState);
game.state.add("mainMenuState", MainMenuState);
game.state.add("characterState", CharacterState);
game.state.add("sceneState", SceneState);
game.state.add("playState", PlayState);

game.state.start("loadState");

function IDGenerator() {
  this.length = 8;
  this.timestamp = +new Date();

  var _getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  this.generate = function() {
    var ts = this.timestamp.toString();
    var parts = ts.split("").reverse();
    var id = "";

    for (var i = 0; i < this.length; ++i) {
      var index = _getRandomInt(0, parts.length - 1);
      id += parts[index];
    }

    return id;
  };
}

var generator = new IDGenerator();
const id = generator.generate();
var socket = io();