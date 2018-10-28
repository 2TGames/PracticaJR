MagicAndRunes.pantalla_cargaState = function(game) {

}
var play;

MagicAndRunes.pantalla_cargaState.prototype = {

    preload: function() {
        
        game.load.image('inicio','assets/images/pantalla_inicio.png');
    },

    create: function() {
        var pantalla_inicio=game.add.image(0,0,'inicio');
        var texto = game.add.text(240,500,"Pulsa espacio para continuar",{font:"25px Arial", fill:"#FFE400",align:"center"});
        this.play=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function() {
       if(this.play.isDown){
           this.state.start("menuState");
       }
    }
}