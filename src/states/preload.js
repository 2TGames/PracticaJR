MagicAndRunes.preloadState = function(game) {

}

MagicAndRunes.preloadState.prototype = {

    preload: function() {
        game.load.image('background','assets/images/background_dungeonv2.png');

        game.load.tilemap('nivel0','assets/scenarios/prueba.csv');
        //game.load.tilemap('nivel0','assets/scenarios/prueba+1.csv');
        //game.load.tilemap('nivel0','assets/scenarios/prueba+2.csv');
        //game.load.tilemap('nivel0','assets/scenarios/prueba-1.csv');
        //game.load.tilemap('nivel0','assets/scenarios/prueba-2.csv');
        game.load.image('nivAct','assets/medidores/medidor_0.png');
        game.load.image('tiles','Tiles/Tilesheet/medieval_tilesheet_2X.png');
        game.load.image('mago_izquierda','assets/images/mago_perfil_izq.png');
        game.load.image('mago_derecha','assets/images/mago_perfil_derecho.png');
       // game.load.image('mago_derecha2','assets/images/magoN_perfil_izquierdo.png');
        //game.load.spritesheet('mago','assets/images/andando_izq.png',30,50);
        game.load.image('spellDcha', 'assets/spells/basico_naranja_derecha.png');
        game.load.image('spellIzq','assets/spells/basico_naranja_izq.png');
        game.load.image('hechizoDcha','assets/spells/basico_verde_derecha.png');
        game.load.image('hechizoIzq','assets/spells/basico_verde_izquierda.png');
        game.load.image('enchantmentJ2', 'assets/spells/encantamiento_naranja.png');
        game.load.image('enchantmentJ1','assets/spells/encantamiento_verde.png');
        //game.load.spritesheet('walk','assets/images/andando_izq.png',60,54);
        game.load.image('fondo','assets/images/fondo magico.png');
    },

    create: function() {
        var fondo=game.add.image(0,0,'fondo');
        var l=game.add.text(100,100,"Loanding...",{font:"50px Arial",fill:"#FFE400",align:"center"});
        
    },

    update: function() {
        this.state.start('pantalla_cargaState');
    }
}