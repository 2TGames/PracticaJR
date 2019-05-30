MagicAndRunes.preloadState = function(game) {

}

MagicAndRunes.preloadState.prototype = {

    preload: function() {
        
        game.load.image('inicio','assets/images/pantalla_inicio.png');
        game.load.image('match','assets/images/fondo magico.png');
        
      //----------------------------FONDO------------------------------------------//
        game.load.image('background','assets/images/background_dungeonv2.png');
        //-----------------------------TILEMAP---------------------------------------//
        game.load.tilemap('nivel0','assets/scenarios/prueba.csv');
        //----------------------------MEDIDOR DE NIVEL-------------------------------//
        game.load.image('nivAct','assets/medidores/medidor_0.png');
        //---------------------------TILESHEET----------------------------------------//
        game.load.image('tiles','Tiles/Tilesheet/medieval_tilesheet_2X.png');
        //----------------------------SPRITESHEETS MAGOS--------------------------------//
        game.load.spritesheet('mago_naranja','assets/images/walk_naranja.png',27,49);
        game.load.spritesheet('mago_verde','assets/images/walk_verde.png',27,49);
        //-----------------------------IMAGEN HECHIZOS--------------------------------//
        game.load.image('hechizo','assets/spells/fuegoNaranja.png');
        game.load.image('hechizoverde','assets/spells/fuegoVerde.png');
        
        //----------------------------AUDIO--------------------------------------------//
        game.load.audio('ATA', 'assets/music/Ancient-Troops-Amassing.mp3');
        
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