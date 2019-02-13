var LoadState = {
    //initiate game settings
    init: function () {
        //adapt to screen size, fit all the game
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload: function () {
        //gameplay ui
        this.load.crossOrigin = 'Anonymous'
        // Scene 1
        this.load.image('main_menu_bg', '../../assets/Game_Assets/01-Pages/P_01/Game-BG_01.jpg');
        this.load.image('start_btn', '../../assets/Game_Assets/01-Pages/P_01/START.png');
    },
    create: function () {
        game.state.start('mainMenuState');
    }
};