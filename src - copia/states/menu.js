MagicAndRunes.menuState = function(game) {

}

MagicAndRunes.menuState.prototype = {

    preload: function() {
        
        game.load.image('fondo','assets/images/fondo magico.png');
    },

    create: function() {
        var fondo=game.add.image(0,0,'fondo');
        var texto = game.add.text(300,250,"1 Para jugar",{font:"30px Arial", fill:"#FFE400",align:"center"});
        var texto2 = game.add.text(300,300,"2 Controles",{font:"30px Arial", fill:"#FFE400",align:"center"});
        var texto = game.add.text(300,350,"3 Códice",{font:"30px Arial", fill:"#FFE400",align:"center"});
        this.play=game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    },

    update: function() {
       if(this.play.isDown){
           this.state.start("level0State");
       }
    }
}