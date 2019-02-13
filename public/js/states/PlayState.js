var PlayState = {
    //executed after everything is loaded
    preload: function () {
        this.load.image('sc1', '../../assets/Game_Assets/02-Background/BG1.jpg', 1920, 1080);
        this.load.image('sc2', '../../assets/Game_Assets/02-Background/BG2.jpg', 1920, 1080);
        this.load.image('sc3', '../../assets/Game_Assets/02-Background/BG3.jpg', 1920, 1080);
        this.load.image('sc4', '../../assets/Game_Assets/02-Background/BG4.jpg', 1920, 1080);
    },
    create: function () {
        this.otherChar = {};
        this.setBg();
        this.setChar();
        this.setOtherPlayer();
        socket.emit("character stage", { id: id, pic: this.char.key, x: this.char.position.x, y: this.char.position.y, sceneSelected: this.game.global.sceneSelected });
        game.input.onTap.add(this.onTap, this);

        var homeBtn = game.add.button(game.world.centerX, game.world.centerY, 'homeBtn', this.onHome, this, 0, 0, 1);
        homeBtn.anchor.setTo(-8, 4.9);
        homeBtn.scale.setTo(0.1, 0.1);

        cursors = game.input.keyboard.createCursorKeys();

    },
    onTap: function (pointer, doubleTap) {
        if (pointer.y > game.world.height * 0.8) {
            const isLeft = pointer.x < this.char.position.x;
            const newX = pointer.x - (this.char.width * 0.5), newY = pointer.y - (this.char.height * 0.9);

            this.tween = game.add.tween(this.char).to({ x: newX, y: newY }, 1000, Phaser.Easing.Linear.None, true);
            // this.char.position.x = pointer.x - (this.char.width * 0.5);
            // this.char.position.y = pointer.y - (this.char.height * 0.9);
            if (this.game.global.charSelected == 0) {
                this.char.loadTexture(isLeft ? 'char_n_l' : 'char_n', 0);
            } else {
                this.char.loadTexture(isLeft ? 'char_t_l' : 'char_t', 0);
            }
        }
    },
    render: function () {
        this.tween && this.tween.isRunning && socket.emit("character stage", { id: id, pic: this.char.key, x: this.char.position.x, y: this.char.position.y, sceneSelected: this.game.global.sceneSelected });

    },
    setOtherPlayer: function () {
        socket.on("character stage", (charList) => {
            if (game.state.current === "playState")
                for (var key in charList) {
                    if (charList[key].sceneSelected === this.game.global.sceneSelected)
                        if (charList[key].id !== id) {
                            if (this.otherChar[charList[key].id] == undefined) {
                                this.otherChar[charList[key].id] = game.add.image(
                                    charList[key].x,
                                    charList[key].y,
                                    charList[key].pic);

                                this.otherChar[charList[key].id].scale.setTo(0.34, 0.34);
                            } else {
                                this.otherChar[charList[key].id].position.x = charList[key].x;
                                this.otherChar[charList[key].id].position.y = charList[key].y;
                                this.otherChar[charList[key].id].loadTexture(charList[key].pic);
                            }
                        }
                };
        });
        socket.on("character delete", (charId) => {
            this.otherChar[charId] && this.otherChar[charId].destroy();
            this.otherChar[charId] && delete this.otherChar[charId];
        });
    },
    setBg: function () {
        if (this.game.global.sceneSelected == 0) {
            this.background = game.add.image(game.world.centerX, game.world.height, 'sc1');
        }
        else if (this.game.global.sceneSelected == 1) {
            this.background = game.add.image(game.world.centerX, game.world.height, 'sc2');
        }
        else if (this.game.global.sceneSelected == 2) {
            this.background = game.add.image(game.world.centerX, game.world.height, 'sc3');
        }
        else if (this.game.global.sceneSelected == 3) {
            this.background = game.add.image(game.world.centerX, game.world.height, 'sc4');
        }

        this.background.anchor.setTo(0.5, 1.05);
        this.background.scale.setTo(0.5, 0.5);
    },
    setChar: function () {
        if (this.game.global.charSelected == 0) {
            this.char = game.add.image(game.world.centerX - 450, 200, 'char_n');
        } else {
            this.char = game.add.image(game.world.centerX - 450, 200, 'char_t');
        }
        this.char.scale.setTo(0.34, 0.34);
    },
    onHome: function () {
        socket.emit("character delete", id);
        game.state.start('mainMenuState');
    },
    update: function () {
        const oldX = this.char.position.x;
        const oldY = this.char.position.y;

        if (cursors.left.isDown && this.isInXBound()) {
            this.char.position.x -= 2;
            this.char.loadTexture(this.game.global.charSelected == 0 ? 'char_n_l' : 'char_t_l', 0);
        }
        else if (cursors.right.isDown && this.isInXBound()) {
            this.char.position.x += 2;
            this.char.loadTexture(this.game.global.charSelected == 0 ? 'char_n' : 'char_t', 0);
        }
        else if (cursors.up.isDown && this.isInYBound()) {
            this.char.position.y -= 2;
        }
        else if (cursors.down.isDown && this.isInYBound()) {
            this.char.position.y += 2;
        }

        if (this.char.position.x <= 2) {
            this.char.position.x = 2;
        } else if (this.char.position.x >= 798) {
            this.char.position.x = 798;
        } else if (this.char.position.y >= 228) {
            this.char.position.y = 228;
        } else if (this.char.position.y <= 170) {
            this.char.position.y = 170;
        }

        // Only update when x or y change
        if (oldX !== this.char.position.x || oldY !== this.char.position.y) {
            socket.emit("character stage", { id: id, pic: this.char.key, x: this.char.position.x, y: this.char.position.y, sceneSelected: this.game.global.sceneSelected });
        }
    },
    isInXBound: function () {
        if (this.char.position.x > 0 && this.char.position.x < 800) {
            return true;
        }
        return false;
    },
    isInYBound: function () {
        if (this.char.position.y > 168 && this.char.position.y < 230) {
            return true;
        }
        return false;
    }
};