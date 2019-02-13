var enterBtn;
var homeBtn;
var leftBtn;
var rightBtn;
var sceneSelected;
var sceneCount = 0;
var first = true;
var SceneState = {
    preload: function () {
        // Scene 2
        this.load.image('character_bg', '../../assets/Game_Assets/01-Pages/P_03/Game-BG_03.jpg');
        // Btn
        // this.load.image('enterBtn', '../../assets/Game_Assets/01-Pages/P_03/Button/Enter.png', 369, 212);
        // this.load.image('homeBtn', '../../assets/Game_Assets/01-Pages/P_03/Button/HOME.png', 512, 512);
        // this.load.image('leftBtn', '../../assets/Game_Assets/01-Pages/P_03/Button/Left.png', 1600, 1600);
        // this.load.image('rightBtn', '../../assets/Game_Assets/01-Pages/P_03/Button/Right.png', 1600, 1600);
        this.load.image('sc1b', '../../assets/Game_Assets/02-Background/BG1_Border.jpg', 1920, 1080);
        this.load.image('sc2b', '../../assets/Game_Assets/02-Background/BG2_Border.jpg', 1920, 1080);
        this.load.image('sc3b', '../../assets/Game_Assets/02-Background/BG3_Border.jpg', 1920, 1080);
        this.load.image('sc4b', '../../assets/Game_Assets/02-Background/BG4_Border.jpg', 1920, 1080);
    },
    create: function () {
        sceneCount = 0;
        var background = game.add.image(game.world.centerX, game.world.height, 'character_bg');
        background.anchor.setTo(0.5, 1.05);
        background.scale.setTo(0.5, 0.5);

        enterBtn = game.add.button(game.world.centerX, 350, 'enterBtn', this.onEnter, this, 0, 0, 1);
        enterBtn.anchor.setTo(0.5, -0.7);

        homeBtn = game.add.button(game.world.centerX, game.world.centerY, 'homeBtn', this.onHome, this, 0, 0, 1);
        homeBtn.anchor.setTo(-8, 4.9);
        homeBtn.scale.setTo(0.1, 0.1);

        leftBtn = game.add.button(game.world.centerX - 300, 100, 'leftBtn', this.onLeft, this, 0, 0, 1);
        leftBtn.anchor.setTo(0.5, -0.7);

        rightBtn = game.add.button(game.world.centerX + 300, 100, 'rightBtn', this.onRight, this, 0, 0, 1);
        rightBtn.anchor.setTo(0.5, -0.7);

        sceneSelected = game.add.image(game.world.centerX - 190, 155, 'sc1b');
        sceneSelected.scale.setTo(0.2, 0.25);

    },
    onHome: function () {
        game.state.start('mainMenuState');
        first =  true;
    },
    onEnter: function () {
        game.state.start('playState');
    },
    onLeft: function () {
        if(sceneCount - 1 >= 0){
            sceneCount -= 1;
        } 
        this.setSceneSelected();
    },
    onRight: function () {
        if(sceneCount + 1 <= 3){
            sceneCount += 1;
        } 
        this.setSceneSelected();
    },
    setSceneSelected: function () {
        this.game.global.sceneSelected = sceneCount;
        if(first) {
            first = false;
            sceneSelected = game.add.image(game.world.centerX - 190, 155, 'sc1b');
            sceneSelected.scale.setTo(0.2, 0.25);
        }
        else if(sceneCount == 0){
            sceneSelected.loadTexture('sc1b', 0);
        } 
        else if(sceneCount == 1){
            sceneSelected.loadTexture('sc2b', 0);
        }
        else if(sceneCount == 2){
            sceneSelected.loadTexture('sc3b', 0);
        }
        else if(sceneCount == 3){
            sceneSelected.loadTexture('sc4b', 0);
        }
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
