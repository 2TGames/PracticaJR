CatCatcher.menuState = function(game) {

}

CatCatcher.menuState.prototype = {

    preload: function() {
        game.load.image('bg','assets/images/bg.png');
        game.load.image('mago_izquierda','assets/images/mago_perfil_izq.png');
        game.load.image('mago_derecha','assets/images/mago_perfil_derecho.png');
    },

    create: function() {
        var spaceKey;
        var b= game.add.sprite(0,0,'bg');
        var mago_izquierda=game.add.sprite(100, 400,'mago_izquierda');
        var mago_derecha=game.add.sprite(700,400,'mago_derecha');
        var texto = game.add.text(100,100,"Press SPACEBAR to play",{font:"50px Arial", fill:"#E74C3C",align:"center"});
        this.spaceKey=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function() {
       if(this.spaceKey.isDown){
           this.state.start("levelState");
       }
    }
}