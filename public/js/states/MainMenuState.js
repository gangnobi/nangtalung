
var startBtn;
var MainMenuState = {
    create: function () {
        this.game.global.charSelected = 0;
        this.game.global.sceneSelected = 0;
        game.world.setBounds(0, 0, game.width, game.height);

        var background = game.add.image(game.world.centerX, game.world.height, 'main_menu_bg');
        background.anchor.setTo(0.5, 1.05);
        background.scale.setTo(0.5, 0.5);

        startBtn = game.add.image(game.world.centerX, 350, 'start_btn');
        startBtn.anchor.setTo(0.5, 0.25);
        startBtn.inputEnabled = true;
        startBtn.events.onInputDown.add(this.goToCharacterState, this);
    },
    goToCharacterState: function () {
        game.state.start('characterState');
    },
    update: function () {
        if (startBtn.input.pointerOver()) {
            startBtn.scale.setTo(0.8, 0.8);
            // startBtn.alpha = 2;
        }
        else {
            startBtn.scale.setTo(0.75, 0.75);
            // startBtn.alpha = 1;
        }
    }
};
