MagicAndRunes.preloadState = function(game) {

}

MagicAndRunes.preloadState.prototype = {

    preload: function() {
        
        game.load.image('inicio','assets/images/pantalla_inicio.png');
        game.load.image('match','assets/images/fondo magico.png');
        game.load.image('titulo','assets/images/titulo.png')
        game.load.image('star','assets/images/star3.png')
        
      //----------------------------FONDO------------------------------------------//
        game.load.image('background','assets/images/background_dungeonv2.png');
        //-----------------------------TILEMAPS---------------------------------------//
        game.load.tilemap('nivel-2','assets/scenarios/prueba-2.csv');
        game.load.tilemap('nivel-1','assets/scenarios/prueba-1.csv');
        game.load.tilemap('nivel0','assets/scenarios/prueba.csv');
        game.load.tilemap('nivel+1','assets/scenarios/prueba+1.csv');
        game.load.tilemap('nivel+2','assets/scenarios/prueba+2.csv');
        //----------------------------MEDIDOR DE NIVEL-------------------------------//
        game.load.image('nivAct','assets/medidores/medidor_0.png');
        game.load.image('niv1','assets/medidores/medidor_1.png');
        game.load.image('niv2','assets/medidores/medidor_2.png');
        game.load.image('niv-1','assets/medidores/medidor_-1.png');
        game.load.image('niv-2','assets/medidores/medidor_-2.png');
        //---------------------------TILESHEET----------------------------------------//
        game.load.image('tiles','Tiles/Tilesheet/medieval_tilesheet_2X.png');
        //----------------------------SPRITESHEETS MAGOS--------------------------------//
        game.load.spritesheet('mago_naranja','assets/images/walk_naranja.png',27,49);
        game.load.spritesheet('mago_verde','assets/images/walk_verde.png',27,49);
        //-----------------------------IMAGEN HECHIZOS--------------------------------//
        game.load.image('hechizo','assets/spells/fuegoNaranja.png');
        game.load.image('hechizoverde','assets/spells/fuegoVerde.png');
        game.load.spritesheet('nubeVerde','assets/spells/Nube_verde.png',180.5,60)
        game.load.spritesheet('nubeNaranja','assets/spells/Nube_naranja.png',180.5,60)
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