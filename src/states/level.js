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
    var w,a,s,d;

    //Spells variables
    var player;
    var aliens;
    var spells;
    var hechizos;
    var spellTime = 10;
    var hechizoTime = 10;
    var cursors;
    var fireButton;
    var fire2Button;
    var enemySpell;
    var firingTimer = 0;
    

    //Spells directions
    var greenLeft =false;
    var redLeft = true;

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
        game.load.image('nivel0','assets/images/escenario0.json');
        game.load.image('mago_izquierda','assets/images/mago_perfil_izq.png');
        game.load.image('mago_derecha','assets/images/mago_perfil_derecho.png');
        //game.load.spritesheet('mago','assets/images/andando_izq.png',30,50);
        game.load.image('spell', 'assets/spells/black_basic.png');

    },

    create: function() {
      //  game.time.desiredFps=30;

        caugth=0;
        background= game.add.sprite(0,0,'background');
        mago_izquierda=game.add.sprite(100, 400,'mago_izquierda');
        mago_derecha=game.add.sprite(700,400,'mago_derecha');
        game.physics.enable([mago_derecha,mago_izquierda],Phaser.Physics.ARCADE);
        score=game.add.text(25,25,"Score: " + caugth,{font:"25px Arial", fill:"#E74C3C",align:"center"});
        /*upKey=game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey=game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey=game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey=game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);*/
        wkey=game.input.keyboard.addKey(Phaser.Keyboard.W);
        akey=game.input.keyboard.addKey(Phaser.Keyboard.A);
        skey=game.input.keyboard.addKey(Phaser.Keyboard.S);
        dkey=game.input.keyboard.addKey(Phaser.Keyboard.D);
        

        mago_derecha.animations.add('left',[1,2,3,4,5,6,7,8],15,true);
        //mago_derecha.animations.add('turn',[9],20,true);
       // mago_derecha.animations.add('right',[10,11,12,13,14,15,16,17,18],15,true);

        flechas=game.input.keyboard.createCursorKeys();

        mago_izquierda.body.collideWorldBounds=true;
        mago_izquierda.body.gravity.y=500;
        mago_izquierda.body.bounce.y=0.1;

        mago_derecha.body.collideWorldBounds=true;
        mago_derecha.body.gravity.y=500;
        mago_derecha.body.bounce.y=0.1
        mago_derecha.body.setSize(30,50);

        //  Our spell group
        spells = game.add.group();
        spells.enableBody = true;
        spells.physicsBodyType = Phaser.Physics.ARCADE;
        spells.createMultiple(30, 'spell');
        spells.setAll('anchor.x', 1);
        spells.setAll('anchor.y', 0.5);
        spells.setAll('outOfBoundsKill', true);
        spells.setAll('checkWorldBounds', true);

        //  Our hechizo group
        hechizos = game.add.group();
        hechizos.enableBody = true;
        hechizos.physicsBodyType = Phaser.Physics.ARCADE;
        hechizos.createMultiple(30, 'spell');
        hechizos.setAll('anchor.x', 1);
        hechizos.setAll('anchor.y', 0.5);
        hechizos.setAll('outOfBoundsKill', true);
        hechizos.setAll('checkWorldBounds', true);

        //  And some controls to play the game with
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        fire2Button = game.input.keyboard.addKey(Phaser.Keyboard.E);

    },

    update: function() {

        function fireSpell () {

            //  To avoid them being allowed to fire too fast we set a time limit
            if (game.time.now > spellTime)
            {
                //  Grab the first spell we can from the pool
                spell = spells.getFirstExists(false);
        
                if (spell)
                {
                    //  And fire it
                    spell.reset(mago_derecha.x, mago_derecha.y + 8);
                    if (redLeft){
                        spell.body.velocity.x = -400;
                        spells.setAll('anchor.x', 1);
                    } else{
                        spells.setAll('anchor.x', -1);
                        spell.body.velocity.x = 400;
                    }
                    
                    spell.body.velocity.y = -70;
                    spellTime = game.time.now + 200;
                }
            }
        
        }

        function fireHechizo () {

            //  To avoid them being allowed to fire too fast we set a time limit
            if (game.time.now > hechizoTime)
            {
                //  Grab the first hechizo we can from the pool
                hechizo = hechizos.getFirstExists(false);
        
                if (hechizo)
                {
                    //  And fire it
                    hechizo.reset(mago_izquierda.x, mago_izquierda.y + 8);
                    if (greenLeft){
                        hechizo.body.velocity.x = -400;
                        hechizos.setAll('anchor.x', 1);
                    } else{
                        hechizos.setAll('anchor.x', -1);
                        hechizo.body.velocity.x = 400;
                    }
                    
                    hechizo.body.velocity.y = -70;
                    hechizoTime = game.time.now + 200;
                }
            }
        
        }

        function resetSpell (spell) {

            //  Called if the spell goes out of the screen
            spell.kill();
        
        }

        function resetHechizo (hechizo) {

            //  Called if the hechizo goes out of the screen
            hechizo.kill();
        
        }

        mago_derecha.body.velocity.x=0;

        if(akey.isDown){
            mago_izquierda.body.velocity.x=-150;
            greenLeft = true;
        }
        else if(dkey.isDown){
            mago_izquierda.body.velocity.x=150;
            greenLeft = false;
        }

        if(wkey.isDown && mago_izquierda.body.onFloor() && game.time.now > temp){
            mago_izquierda.body.velocity.y=-250;
            temp=game.time.now+750;
        }

        if(flechas.left.isDown){
            mago_derecha.body.velocity.x=-150;
            redLeft=true;
        }
        else if(flechas.right.isDown){
            mago_derecha.body.velocity.x=150;
            redLeft=false;
        }
        

        if(flechas.up.isDown && mago_derecha.body.onFloor() && game.time.now > temp){
            mago_derecha.body.velocity.y=-250;
            temp=game.time.now+750;
        }

        //  Firing?
        if (fireButton.isDown)
        {
            fireSpell();
        }

        if (fire2Button.isDown)
        {
            fireHechizo();
        }


        

        /*game.physics.arcade.collide(catcher,cat,collisionHandler,null,this);
        if(caugth==3){
            this.state.start("endingState");
        }*/
    },


    
}