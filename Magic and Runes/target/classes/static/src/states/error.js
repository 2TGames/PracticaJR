CatCatcher.errorState = function(game) {

}
var play;

CatCatcher.errorState.prototype = {

    preload: function() {
        
        game.load.image('fondo','assets/images/menu_principal/fondo_error.png');
    },

    create: function() {
        music.destroy();
        game.cache.removeSound('NoN');
        
        var pantalla_inicio=game.add.image(0,0,'fondo');
        var texto = game.add.text(240,500,"Pulsa espacio para continuar",{font:"25px Arial", fill:"#FFE400",align:"center"});
        this.play=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function() {
       if(this.play.isDown){
           this.state.start("menuState");
       }
    }
}