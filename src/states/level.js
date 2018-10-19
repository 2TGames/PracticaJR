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
    var vidaizq,vidadcha;
    var daño=20;
    var nivel;

    //Spells variables
    var player;
    var spells;
    var hechizos;
    var spellTime = 0;
    var hechizoTime =0;
    var cursors;
    var fireButton;
    var fire2Button;
    var hechizoTempo=0;
    var spellTempo=0;

    //Enchantment variables
    var enchantment;
    var enchantmentTime = 0;
    var enchantmentTempo;
    

    //Spells directions
    var greenLeft =false;
    var redLeft = true;

    function collisionHandler(mago_izquierda,spells){
        
        vidaizq=new Phaser.Rectangle(25,25,100-daño,20);
        //game.debug.geom(vidaizq,'rgba(250,255,10,1');
        daño+=20;
        spells.kill();
        /*caugth++;
        score.setText("Score: " + caugth);*/
    }

    function collisionHandler2(mago_derecha,hechizos){
        
        vidadcha=new Phaser.Rectangle(650,25,100-daño,20);
        daño+=20;
        hechizos.kill();
        /*caugth++;
        score.setText("Score: " + caugth);*/
    }


MagicAndRunes.levelState.prototype = {

    preload: function() {
        game.load.image('background','assets/images/background_dungeon.png');
        //game.load.tilemap('nivel0','assets/images/escenario0.json',null,Phaser.Tilemap.TILED_JSON);
        //game.load.image('tiles','assets/tiles/Tilesheet/medieval_tilesheet_2X.png');
        game.load.image('mago_izquierda','assets/images/mago_perfil_izq.png');
        game.load.image('mago_derecha','assets/images/mago_perfil_derecho.png');
        //game.load.spritesheet('mago','assets/images/andando_izq.png',30,50);
        game.load.image('spell', 'assets/spells/black_basic.png');
        game.load.image('enchantment', 'assets/spells/black_encantamiento.png');


    },

    create: function() {
      //  game.time.desiredFps=30;

        caugth=0;
        background= game.add.sprite(0,0,'background');
        mago_izquierda=game.add.sprite(100, 400,'mago_izquierda');
        mago_derecha=game.add.sprite(700,400,'mago_derecha');
        game.physics.enable([mago_derecha,mago_izquierda],Phaser.Physics.ARCADE);
        //barras de vida
        vidadcha=new Phaser.Rectangle(650,25,100,20);
        vidaizq=new Phaser.Rectangle(25,25,100,20);
        
        /*nivel = game.add.tilemap('nivel0');
        nivel.addTilesetImage ('tiles');
        layer = nivel.createLayer(0);
        layer.resizeWorld();*/

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
        mago_izquierda.body.setSize(30,50);

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

        //  Our enchantment group
        enchantments = game.add.group();
        enchantments.enableBody = true;
        enchantments.physicsBodyType = Phaser.Physics.ARCADE;
        enchantments.createMultiple(30, 'enchantment');
        enchantments.setAll('checkWorldBounds', true);

        //  And some controls to play the game with
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.I);
        fire2Button = game.input.keyboard.addKey(Phaser.Keyboard.V);
        enchButton = game.input.keyboard.addKey(Phaser.Keyboard.O);
        ench2Button = game.input.keyboard.addKey(Phaser.Keyboard.B);

    },

   /*render: function(){
        game.debug.geom(vidaizq,'rgba(0,255,0,1)');
        game.debug.geom(vidadcha,'rgba(0,255,0,1');
    },*/

    update: function() {

        game.debug.geom(vidaizq,'rgba(0,255,0,1)');
        game.debug.geom(vidadcha,'rgba(0,255,0,1');

        //funcion de disparo para el mago naranja
        function fireSpell () {

           
            if (game.time.now > spellTime)
            {
               
                spell = spells.getFirstExists(false);
        
                if (spell)
                {
                    //  And fire it
                    spell.reset(mago_derecha.x,mago_derecha.y+5);

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

        function fireEnchantment () {

           
            if (game.time.now > enchantmentTime)
            {
               
                enchantment = enchantments.getFirstExists(false);
        
                if (enchantment)
                {
                    //  And fire it
                    enchantment.reset(mago_derecha.x - 60,mago_derecha.y);
                    
                    enchantmentTime = game.time.now + 200;
                }
            }
        
        }

        //funcion de disparo para el mago verde
        function fireHechizo () {

            //  To avoid them being allowed to fire too fast we set a time limit
            if (game.time.now > hechizoTime)
            {
                //  Grab the first hechizo we can from the pool
                hechizo = hechizos.getFirstExists(false);
        
                if (hechizo)
                {
                    //  And fire it
                    hechizo.reset(mago_izquierda.x, mago_izquierda.y + 5);
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

        // funciones para eliminar los sprites de los hechizos una vez salgan fuera de la pantalla
        function resetSpell (spell) {

           
            spell.kill();
        
        }

        function resetHechizo (hechizo) {

            hechizo.kill();
        
        }
       
        mago_derecha.body.velocity.x=0;
        mago_izquierda.body.velocity.x=0;

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
        if (fireButton.isDown && spellTempo>3)
        {
            fireSpell();
            spellTempo=0;
        }

        if (fire2Button.isDown && hechizoTempo>3)
        {
            fireHechizo();
            hechizoTempo=0;
        }
        // Enchanting?
        if (enchButton.isDown && spellTempo>3)
        {
            fireEnchantment();
            spellTempo=0;
        }

        if (ench2Button.isDown && hechizoTempo>3)
        {
            fireHechizo();
            hechizoTempo=0;
        }
        1
        // se detectan las colisiones de los hechizos con los magos para actualizar la vida de cada uno de ellos
        game.physics.arcade.collide(mago_izquierda,spells,collisionHandler,null,this);
        game.physics.arcade.collide(mago_derecha,hechizos,collisionHandler2,null,this);
        spellTempo+=0.05;
        hechizoTempo+=0.05;

        /*if(caugth==3){
            this.state.start("endingState");
        }*/
    },


    
}