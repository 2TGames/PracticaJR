CatCatcher.endingState = function(game) {

}

CatCatcher.endingState.prototype = {

    preload: function() {
        game.load.image('bg','assets/images/bg.png');
    },

    create: function() {
        b= game.add.sprite(0,0,'bg');
        var fin=game.add.text(300,300,"Congratulations!",{font:"30px Arial",fill:"#E74C3C",align:"center"});
        var again=game.add.text(300,350,"Press 1 to play again",{font:"30px Arial",fill:"#E74C3C",align:"center"});
        key1=game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    },

    update: function() {
        if(key1.isDown){
            this.state.start("menuState");
        }
    }
}