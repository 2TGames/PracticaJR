CatCatcher.levelState = function(game) {
    
}
var upKey;
    var downKey;
    var leftKey;
    var rightKey; 
    var catcher;
    var caugth;
    var cat;
    var layer;
    var b;
    var score;
    var key1;

    function collisionHandler(catcher,cat){
    
        cat.x=game.rnd.integerInRange(50,750);
        cat.y=game.rnd.integerInRange(50,550);
        caugth++;
        score.setText("Score: " + caugth);
    }

CatCatcher.levelState.prototype = {

    preload: function() {
        game.load.image('bg','assets/images/bg.png');
        game.load.image('mago_izquierda','assets/images/mago_perfil_izquierdo.png');
        game.load.image('mago_derecha','assets/images/mago_perfil_derecho.png');
    },
    
    create: function() {
        caugth=0;
        b= game.add.sprite(0,0,'bg');
        cat=game.add.sprite(100, 400,'mago_izquierda');
        catcher=game.add.sprite(700,400,'mago_derecha');
        game.physics.enable([catcher,cat],Phaser.Physics.ARCADE);
        score=game.add.text(25,25,"Score: " + caugth,{font:"25px Arial", fill:"#E74C3C",align:"center"});
        upKey=game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey=game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey=game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey=game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        
    },

    update: function() {
        if(upKey.isDown){
            catcher.y--;
        }
        if(downKey.isDown){
            catcher.y++;
        }
        if(leftKey.isDown){
            catcher.x--;
        }
        if(rightKey.isDown){
            catcher.x++;
        }

        game.physics.arcade.collide(catcher,cat,collisionHandler,null,this);
        if(caugth==3){
            this.state.start("endingState");
        }
    },

    
}