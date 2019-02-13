var enterBtn;
var homeBtn;
var leftBtn;
var rightBtn;
var characterSelected;
var charCount = true;
var CharacterState = {
    preload: function () {
        // Scene 2
        this.load.image('character_bg', '../../assets/Game_Assets/01-Pages/P_02/Game-BG_02.jpg');
        // Btn
        this.load.image('enterBtn', '../../assets/Game_Assets/01-Pages/P_02/Button/Enter.png', 369, 212);
        this.load.image('homeBtn', '../../assets/Game_Assets/01-Pages/P_02/Button/HOME.png', 512, 512);
        this.load.image('leftBtn', '../../assets/Game_Assets/01-Pages/P_02/Button/Left.png', 1600, 1600);
        this.load.image('rightBtn', '../../assets/Game_Assets/01-Pages/P_02/Button/Right.png', 1600, 1600);
        this.load.image('char_n', '../../assets/Game_Assets/01-Pages/P_02/N_Right.png', 657, 1000);
        this.load.image('char_n_l', '../../assets/Game_Assets/01-Pages/P_02/N_Left.png', 657, 1000);
        this.load.image('char_t', '../../assets/Game_Assets/01-Pages/P_02/T_Right.png', 657, 1000);
        this.load.image('char_t_l', '../../assets/Game_Assets/01-Pages/P_02/T_Left.png', 657, 1000);
    },
    create: function () {
        var background = game.add.image(game.world.centerX, game.world.height, 'character_bg');
        background.anchor.setTo(0.5, 1.05);
        background.scale.setTo(0.5, 0.5);

        enterBtn = game.add.button(game.world.centerX, 350, 'enterBtn', this.onEnter, this, 0, 0, 1);
        enterBtn.anchor.setTo(0.5, -0.7);

        homeBtn = game.add.button(game.world.centerX, game.world.centerY, 'homeBtn', this.onHome, this, 0, 0, 1);
        homeBtn.anchor.setTo(-8, 4.9);
        homeBtn.scale.setTo(0.1, 0.1);

        leftBtn = game.add.button(game.world.centerX - 200, 100, 'leftBtn', this.onChangeChar, this, 0, 0, 1);
        leftBtn.anchor.setTo(0.5, -0.7);

        rightBtn = game.add.button(game.world.centerX + 200, 100, 'rightBtn', this.onChangeChar, this, 0, 0, 1);
        rightBtn.anchor.setTo(0.5, -0.7);

        characterSelected = game.add.image(game.world.centerX - 110, 122, 'char_n');
        characterSelected.scale.setTo(0.34, 0.34);

    },
    onHome: function () {
        game.state.start('mainMenuState');
    },
    onEnter: function () {
        game.state.start('sceneState');
    },
    onChangeChar: function () {
        if (charCount) {
            characterSelected.loadTexture('char_t', 0);
            game.global.charSelected = 1;
        } else {
            characterSelected.loadTexture('char_n', 0);
            game.global.charSelected = 0;
        }
        charCount = !charCount;
    },
    update: function () {
        if (enterBtn.input.pointerOver()) {
            enterBtn.scale.setTo(0.55, 0.55);
        }
        else if (!enterBtn.input.pointerOver()) {
            enterBtn.scale.setTo(0.5, 0.5);
        }
        if (leftBtn.input.pointerOver()) {
            leftBtn.scale.setTo(0.11, 0.11);
        }
        else if (!leftBtn.input.pointerOver()) {
            leftBtn.scale.setTo(0.1, 0.1);
        }
        if (rightBtn.input.pointerOver()) {
            rightBtn.scale.setTo(0.11, 0.11);
        }
        else if (!rightBtn.input.pointerOver()) {
            rightBtn.scale.setTo(0.1, 0.1);
        }
    }
};
