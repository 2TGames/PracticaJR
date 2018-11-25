MagicAndRunes.preloadState = function(game) {

}

MagicAndRunes.preloadState.prototype = {

    preload: function() {
        
        game.load.image('inicio','assets/images/pantalla_inicio.png');
        game.load.image('match','assets/images/fondo magico.png');
        
    },

    create: function() {
    	
    	var pantalla_inicio=game.add.image(0,0,'inicio');
    	//Avisamos al jugador que el juego está cargando
    	var text = " Cargando...";
    	var style = { font: "50px Arial", fill: "#FFBF00", align: "center" };
    	//Sitúa el texto en la posición (game.world.centerX-300, game.world.centerY-300), asignándole el estilo previamente
        //descrito en "style"
    	var t = game.add.text(game.world.centerX-300, game.world.centerY+300, text, style)
    	//Nos lleva al estado "pantalla_cargaState"
        game.state.start('pantalla_cargaState');
    },

    update: function() {

    }
}