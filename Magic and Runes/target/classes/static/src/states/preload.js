CatCatcher.preloadState = function(game) {

}

CatCatcher.preloadState.prototype = {

    preload: function() {
        //Avisamos al jugador que el juego está cargando
        var text = "- Phaser -\n Cargando Assets.";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        var t = game.add.text(game.world.centerX-300, 0, text, style);

        //Cargamos los Assets
        game.load.image('backGround', 'assets/images/bg.png');
        game.load.image('cat', 'assets/images/cat.png');
        game.load.image('catCatcher', 'assets/images/catcher.png');
    },

    create: function() {
        game.state.start('menuState');
    },

    update: function() {

    }
}