MagicAndRunes.levelState = function(game) {
    
}
var upKey;
    
    var mago_derecha;
    var caugth;
    var mago_izquierda;
    var layer;
    var b;
    var score;
    var key1;
    var temp=0;
    var mago_derecha_facing='left';
    var flechas;

    function collisionHandler(catcher,cat){
    
        cat.x=game.rnd.integerInRange(50,750);
        cat.y=game.rnd.integerInRange(50,550);
        caugth++;
        score.setText("Score: " + caugth);
    }

    function render(){
        game.debug.text(game.time.suggestedFps,32,32);
    }

MagicAndRunes.levelState.prototype = {

    preload: function() {
        game.load.image('background','assets/images/background_dungeon.png');
        game.load.image('mago_izquierda','assets/images/mago_perfil_izq.png');
        game.load.image('mago_derecha','assets/images/mago_perfil_derecho.png');
        game.load.spritesheet('mago','assets/images/caminar.png',30,50);

    },
    
    create: function() {
        game.time.desiredFps=30;

        caugth=0;
        background= game.add.sprite(0,0,'background');
        mago_izquierda=game.add.sprite(100, 400,'mago_izquierda');
        mago_derecha=game.add.sprite(700,400,'mago');
        game.physics.enable([mago_derecha,mago_izquierda],Phaser.Physics.ARCADE);
        score=game.add.text(25,25,"Score: " + caugth,{font:"25px Arial", fill:"#E74C3C",align:"center"});
        /*upKey=game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey=game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey=game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey=game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);*/

        mago_derecha.animations.add('left',[0,1,2,3,4,5,6,7,8],15,true);
        mago_derecha.animations.add('turn',[9],20,true);
        mago_derecha.animations.add('right',[10,11,12,13,14,15,16,17],15,true);

        flechas=game.input.keyboard.createCursorKeys();

        mago_izquierda.body.collideWorldBounds=true;
        mago_izquierda.body.gravity.y=500;
        mago_izquierda.body.bounce.y=0.1;
        mago_derecha.body.collideWorldBounds=true;
        mago_derecha.body.gravity.y=500;
        mago_derecha.body.bounce.y=0.1
        mago_derecha.body.setSize(30,50);
    },

    update: function() {

        mago_derecha.body.velocity.x=0;

        if(flechas.left.isDown){
            mago_derecha.body.velocity.x=-150;

            if(mago_derecha_facing!='left'){

                mago_derecha.animations.play('left');
                mago_derecha_facing='left';
            }
        }
        else if(flechas.right.isDown){
            mago_derecha.body.velocity.x=150;
            if(mago_derecha_facing!='right'){
                mago_derecha.animations.play('right');
                mago_derecha_facing='right';
            }
        }
        else{

            if(mago_derecha_facing!='idle'){

                mago_derecha.animations.stop();

                if(mago_derecha_facing=='left'){
                    mago_derecha.frame=0;
                }
                else{
                    mago_derecha.frame=10;
                }
                mago_derecha_facing='idle';
            }
        }

        if(flechas.up.isDown && mago_derecha.body.onFloor() && game.time.now > temp){
            mago_derecha.body.velocity.y=-250;
            temp=game.time.now+750;
        }

        if(flechas.down.isDown){
            mago_derecha.y++;
        }

        

        /*game.physics.arcade.collide(catcher,cat,collisionHandler,null,this);
        if(caugth==3){
            this.state.start("endingState");
        }*/
    },


    
}