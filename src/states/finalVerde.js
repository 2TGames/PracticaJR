MagicAndRunes.endingMagoVerdeState = function(game) {

}

MagicAndRunes.endingMagoVerdeState.prototype = {

    preload: function() {
        game.load.image('background','assets/images/fondo magico.png');
    },

    create: function() {
        music.destroy();
        game.cache.removeSound('NoN');
         
        b= game.add.sprite(0,0,'background');
        var fin=game.add.text(250,250,"¡VICTORIA!",{font:"50px Arial",fill:"#17FF00",align:"center"});
        var again=game.add.text(200,550,"Pulsa ESPACIO para volver al menu principal",{font:"20px Arial",fill:"#FF8700",align:"center"});
        key1=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function() {
        if(key1.isDown){
            this.state.start("menuState");
        }
    }
}