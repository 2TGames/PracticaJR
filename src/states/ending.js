MagicAndRunes.endingState = function(game) {

}

MagicAndRunes.endingState.prototype = {

    preload: function() {
        game.load.image('background','assets/images/dungeon_background.png');
    },

    create: function() {
        b= game.add.sprite(0,0,'background');
        var fin=game.add.text(300,300,"Congratulations!",{font:"30px Arial",fill:"#E74C3C",align:"center"});
        var again=game.add.text(300,350,"¡Refresca la pagina para volver a jugar!",{font:"30px Arial",fill:"#E74C3C",align:"center"});
        key1=game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    },

    update: function() {
        if(key1.isDown){
            this.state.start("menuState");
        }
    }
}