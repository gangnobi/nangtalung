var MenuState = {
    create: function() {
        this.timer = 0;
        game.world.setBounds(0, 0, game.width, game.height);
        this.background = game.add.image(game.world.centerX,game.world.height,'menu');
        this.background.anchor.setTo(0.5, 1);
        this.txt = game.add.image(game.world.centerX - 180, 350,'tap');
        game.input.onDown.add(this.startGame, this);
    },
    startGame: function() {
        game.state.start('PlayState');
    },
    update: function() {
        this.timer += game.time.elapsed;
        if (this.timer >= 500) {
            this.timer -= 500;
            this.txt.visible = !this.txt.visible;
        }
    }
};
