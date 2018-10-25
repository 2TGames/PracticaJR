MagicAndRunes.preloadState = function(game) {

}

MagicAndRunes.preloadState.prototype = {

    preload: function() {
        /*game.load.image('bg','C:/Users/Usuario/Desktop/JuegoCatCatcher/assets/images/bg.png');
        game.load.image('cat','C:/Users/Usuario/Desktop/JuegoCatCatcher/assets/images/cat.png');
        game.load.image('catcher','C:/Users/Usuario/Desktop/JuegoCatCatcher/assets/images/catcher.png');*/

        game.load.tilemap('nivel0','assets/tiles/escenario_0_ext.csv');
        game.load.image('tiles','assets/tiles/Tilesheet/medieval_tilesheet_2X.png');
    },

    create: function() {
        
        var l=game.add.text(100,100,"Loanding...",{font:"50px Arial",fill:"#E74C3C",align:"center"});
        /*var s=game.add.sprite(0,0,'bg');
        var gato=game.add.sprite(100,200,'cat');
        var catcher=game.add.sprite(500,480,'catcher');*/
    },

    update: function() {
        this.state.start('menuState')
    }
}