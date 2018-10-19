MagicAndRunes.menuState = function(game) {

}
var spaceKey;
var nivel;
var layer;
MagicAndRunes.menuState.prototype = {

    preload: function() {
        game.load.image('background','assets/images/background_dungeon.png');
        //game.load.tilemap('nivel0','assets/tiles/escenario_0.json');
        
        game.load.image('tiles','assets/tiles/Tilesheet/medieval_tilesheet.png');
        game.load.image('mago_izquierda','assets/images/mago_perfil_izq.png');
        game.load.image('mago_derecha','assets/images/mago_perfil_derecho.png');
        //game.load.spritesheet('mago','assets/images/caminar.png',30,50);
    },

    create: function() {
        
        /*nivel=game.add.tilemap('nivel0');
        
        nivel.addTilesetImage('medieval_tilesheet','tiles');
        console.log("FALLO");
        layer=nivel.createLayer('Nivel0');
        */
        //layer.resizeWorld();
        
        var background= game.add.sprite(0,0,'background');
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