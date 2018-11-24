CatCatcher.preloadState = function(game) {

}

CatCatcher.preloadState.prototype = {

    preload: function() {
        //Avisamos al jugador que el juego está cargando
        var text = "- Phaser -\n Cargando Assets.";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
        //Sitúa el texto en la posición (game.world.centerX-300, 0), asignándole el estilo previamente
        //descrito en "style"
        var t = game.add.text(game.world.centerX-300, 0, text, style)
    },

    create: function() {
    	//Nos lleva al estado "pantalla_cargaState"
        game.state.start('pantalla_cargaState');
    },

    update: function() {

    }
}