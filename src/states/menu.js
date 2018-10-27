MagicAndRunes.menuState = function(game) {

}
var play;
var nivel;
var layer;
MagicAndRunes.menuState.prototype = {

    preload: function() {
        //game.load.image('background','assets/images/background_dungeon.png');
        //game.load.tilemap('nivel0','assets/tiles/nivel0.csv',null,Phaser.Tilemap.CSV);
        
        //game.load.image('tiles','assets/tiles/Tilesheet/medieval_tilesheet.png');
        /*game.load.image('mago_izquierda','assets/images/mago_perfil_izq.png');
        game.load.image('mago_derecha','assets/images/mago_perfil_derecho.png');
        game.load.image('spell','assets/images/black_basic.png');*/
        //game.load.spritesheet('mago','assets/images/caminar.png',30,50);
        game.load.image('inicio','assets/images/pantalla_inicio.png');
    },

    create: function() {
        
        /*nivel=game.add.tilemap('nivel0',70,70);
        
        nivel.addTilesetImage('tiles');
        console.log("Error");
        layer= nivel.createLayer(0);
        
        layer.resizeWorld();
*/        
        /*var background= game.add.sprite(0,0,'background');
        var mago_izquierda=game.add.sprite(100, 400,'mago_izquierda');
        var mago_derecha=game.add.sprite(700,400,'mago_derecha');*/
        var pantalla_inicio=game.add.image(0,0,'inicio');
        var texto = game.add.text(250,500,"Press SPACE to play",{font:"30px Arial", fill:"#FFE400",align:"center"});
        this.play=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function() {
       if(this.play.isDown){
           this.state.start("levelState");
       }
    }
}