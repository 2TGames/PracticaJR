CatCatcher.level0State = function(game) {
    
}
    var suelo;
    var mago;
    var mago2;
    var mago_derecha;
    var caugth;
    var mago_izquierda;
    var layer;
    var b;
    var medidor;
    var score;
    var key1;
    var temp=0,temp2=0;
    var mago_derecha_facing='left';
    var flechas;
    var w,a,s,d;
    var vidaizq,vidadcha,vidaEnemigo,manaEnemigo;
    var lanzamiento=false;
    var vidaLocal,hechizoEnemigo;
    
    /*var vidaJ1=100;
    var vidaJ2=100;
    var manaJ1=100;
    var manaJ2=100;*/
    var resto1,resto2;
    var spellCost=2;
    var enchantCost=30;
    var nivel;
    var facing_j1='right',facing_j2='left';
    var cura;

    //Spells variables
    var player;
    var spell,spell2;
    var hechizo,hechizo2;
    var hechizoI,hechizoD;
    var spellsDcha, spellsIzq;
    var hechizosDcha, hechizos;
    var spellTime = 0;
    var hechizoTime =0;
    var cursors;
    var fireButton;
    var fire2Button;
    var hechizoTempo=0;
    var spellTempo=0;

    //Enchantment variables
    var enchantment;
    var enchantment2;
    var enchantmentTime = 0;
    var enchantmentTempo=0;
    var ench2Tempo=0;
    

    //Spells directions
    var direccionIzq =false;
    /*var redLeft = false;
    var redRight=true;
    var greenRight=true;*/

    /*function micolision(vidaLocal,game.hechizo2){
        console.log("yes");
        vidaLocal-=20;
        vida=new Phaser.Rectangle(25,25,vidaLocal,20);
        //game.debug.geom(vidaizq,'rgba(250,255,10,1');
        /*if(mago_izquierda.vida<=0){
            mago_izquierda.vida=100;
            mago_derecha.mana=100;
            mago_izquierda.mana=100;
            mago_derecha.vida=100;
            facing_j1='right';
            facing_j2='left';
            mago_derecha.scale.x=1;
            mago_izquierda.scale.x=1;
            game.state.start("level_izq1State");
        }
        //dañoJ2+=20;
        
        hechizo2.kill();
        /*caugth++;
        score.setText("Score: " + caugth);
    }*/

    function micolision2(mago_derecha,hechizos){
        console.log("no");
        mago_derecha.vida-=20;
        vidadcha=new Phaser.Rectangle(650,25,mago_derecha.vida,20);
        if(mago_derecha.vida<=0){
            mago_derecha.vida=100;
            mago_derecha.mana=100;
            mago_izquierda.mana=100;
            mago_izquierda.vida=100;
            facing_j1='right';
            facing_j2='left';
            mago_derecha.scale.x=1;
            mago_izquierda.scale.x=1;
            game.state.start("level_dcha1State");
        }
        //dañoJ1+=20;
        hechizos.kill();
        /*caugth++;
        score.setText("Score: " + caugth);*/
    }

    function colisionMagos(mago_derecha,mago_izquierda){
        if(flechas.up.isDown && mago_derecha.body.onFloor() && game.time.now > temp){
            mago_derecha.body.velocity.y=-350;
            temp=game.time.now+750;
        }
        if(flechas.up.isDown && mago_izquierda.body.onFloor() && game.time.now > temp){
            mago_izquierda.body.velocity.y=-350;
            temp=game.time.now+750;
        }
    }


    function colisionMapaMagoNaranja(mago_derecha,layer){
        if(flechas.up.isDown && mago_derecha.body.onFloor() && game.time.now > temp){
            mago_derecha.body.velocity.y=-350;
            temp=game.time.now+750;
        }
    }

    function colisionMapaMagoVerde(mago_izquierda){
        if(wkey.isDown && mago_izquierda.body.onFloor() && game.time.now > temp2){
            mago_izquierda.body.velocity.y=-350;
            temp2=game.time.now+750;
        }
    }

    function trampaNaranja(mago_izquierda,enchantments){
        console.log("yes");
        mago_izquierda.vida-=40;
        vidaizq=new Phaser.Rectangle(25,25,mago_izquierda.vida,20);
        //game.debug.geom(vidaizq,'rgba(250,255,10,1');
        if(mago_izquierda.vida<=0){
            mago_izquierda.vida=100;
            mago_derecha.mana=100;
            mago_izquierda.mana=100;
            mago_derecha.vida=100;
            facing_j1='right';
            facing_j2='left';
            mago_derecha.scale.x=1;
            mago_izquierda.scale.x=1;
            game.state.start("level_izq1State");
        }
        //dañoJ2+=20;
        
        enchantments.kill();
        /*caugth++;
        score.setText("Score: " + caugth);*/
    }

    function trampaVerde(mago_derecha,enchantments2){
        console.log("yes");
        mago_derecha.vida-=40;
        vidadcha=new Phaser.Rectangle(650,25,mago_derecha.vida,20);
        //game.debug.geom(vidaizq,'rgba(250,255,10,1');
        if(mago_derecha.vida<=0){
            mago_izquierda.vida=100;
            mago_derecha.mana=100;
            mago_izquierda.mana=100;
            mago_derecha.vida=100;
            facing_j1='right';
            facing_j2='left';
            mago_derecha.scale.x=1;
            mago_izquierda.scale.x=1;
            game.state.start("level_dcha1State");
        }
        //dañoJ2+=20;
        
        enchantments2.kill();
        /*caugth++;
        score.setText("Score: " + caugth);*/
    }
    


    CatCatcher.level0State.prototype = {
        init() {
            if(game.player1.id==1){
                game.player2 = {id:2,
                				facing:"left"};
            }else if(game.player1.id==2){
                game.player2 = {id: 1,
                				facing:"right"};
            }
            
            if(game.hechizo1.id==1){
            	game.hechizo2 = {id:2};
            }else{
            	game.hechizo2 = {id:1};
            }
        },

    preload: function() {
        game.load.image('background','assets/images/background_dungeonv2.png');

        game.load.tilemap('nivel0','assets/scenarios/prueba.csv');
        //game.load.tilemap('nivel0','assets/scenarios/prueba+1.csv');
        //game.load.tilemap('nivel0','assets/scenarios/prueba+2.csv');
        //game.load.tilemap('nivel0','assets/scenarios/prueba-1.csv');
        //game.load.tilemap('nivel0','assets/scenarios/prueba-2.csv');
        game.load.image('nivAct','assets/medidores/medidor_0.png');
        game.load.image('tiles','Tiles/Tilesheet/medieval_tilesheet_2X.png');
        //game.load.image('mago_izquierda','assets/images/mago_perfil_izq.png');
        //game.load.image('mago_derecha','assets/images/mago_perfil_derecho.png');
       // game.load.image('mago_derecha2','assets/images/magoN_perfil_izquierdo.png');
        game.load.spritesheet('mago_naranja','assets/images/walk_naranja.png',27,49);
        game.load.spritesheet('mago_verde','assets/images/walk_verde.png',27,49);
        //game.load.spritesheet('mago','assets/images/andando_izq.png',30,50);
        game.load.image('spellDcha', 'assets/spells/basico_naranja_derecha.png');
        game.load.image('spellIzq','assets/spells/basico_naranja_izq.png');
        game.load.image('hechizoDcha','assets/spells/basico_verde_derecha.png');
        game.load.image('hechizoIzq','assets/spells/basico_verde_izquierda.png');
        game.load.image('enchantmentJ2', 'assets/spells/encantamiento_naranja.png');
        game.load.image('enchantmentJ1','assets/spells/encantamiento_verde.png');
        game.load.image('hechizo','assets/spells/fuegoNaranja.png');
        game.load.image('hechizo2','assets/spells/fuegoNaranja.png');
        //game.load.spritesheet('walk','assets/images/andando_izq.png',60,54);
        
        game.load.audio('ATA', 'assets/music/Ancient-Troops-Amassing.mp3');

        //console.log(JSON.stringify(game.player1));

    },

    create: function() {
         //game.time.desiredFps=30;
    	lanzamiento=false;
         music.destroy();
         game.cache.removeSound('NoN');


         // *true* param enables looping
         music = game.add.audio('ATA');
         music.loopFull()

        music.play();
         
         
         if(game.player1.id==1){
        	 vida=new Phaser.Rectangle(25,25,game.player1.vida,20);
        	 mana=new Phaser.Rectangle(25,50,game.player1.mana,20);
        	 //vidadcha=new Phaser.Rectangle(650,25,/*game.player2.vida*/100,20);
        	 //manaizq=new Phaser.Rectangle(25,50,/*game.player1.mana*/100,20);
        	 //manadcha=new Phaser.Rectangle(650,50,/*game.player2.mana*/100,20);
         }else{
        	 //vidaizq=new Phaser.Rectangle(25,25,/*game.player2.vida*/100,20);
        	 vida=new Phaser.Rectangle(650,25,game.player1.vida,20);
        	 mana=new Phaser.Rectangle(650,50,game.player1.mana,20);
        	 //manaizq=new Phaser.Rectangle(650,50,/*game.player2.mana*/100,20);
         }
         
         vidaLocal = game.player1.vida;
         
        caugth=0;
        background= game.add.sprite(0,0,'background');
        //suelo=game.add.sprite(100,500,'suelo');
        nivel=this.add.tilemap('nivel0',16,16);
        nivel.addTilesetImage('tiles');
        layer=nivel.createLayer(0);
        nivel.setCollisionBetween(1,5302);


        layer.resizeWorld();

        medidor=game.add.sprite(292,20,'nivAct');
        //Añadimos el personaje del jugador 1
        if(game.player1.id==1){
        	mago=game.add.sprite(game.player1.x,game.player1.y,'mago_verde');
        	//mago.scale.x*=-1;
        }else if(game.player1.id==2){
        	mago=game.add.sprite(game.player1.x,game.player1.y,'mago_naranja');
        	mago.scale.x*=-1;
        }
        
        game.physics.enable(mago,Phaser.Physics.ARCADE);
        //mago_izquierda=game.add.sprite(100,400,'mago_verde');
        //Añadimos el personaje del rival
        this.getPlayer(function(player2Data){
            game.player2 = JSON.parse(JSON.stringify(player2Data));
            if(game.player2.id==1){
            	mago2=game.add.sprite(game.player2.x,game.player2.y,'mago_verde');
            	//mago2.scale.x*=-1;
            }else if(game.player2.id==2){
            	mago2=game.add.sprite(game.player2.x,game.player2.y,'mago_naranja');
            	//mago2.scale.x*=-1;
            }
            
            //console.log(JSON.stringify(game.player2));
        })
        
    	hechizo=game.add.sprite(game.player1.x,game.player1.y+10,'hechizo');
    	game.physics.enable(hechizo,Phaser.Physics.ARCADE);
    	hechizo.visible=false;
    	/*hechizoD=game.add.sprite(game.player1.x,game.player1.y+10,'hechizoDcha');
		game.physics.enable(hechizoD,Phaser.Physics.ARCADE);
		hechizoD.visible=false;*/
		
        this.getHechizo(function(hechizo2Data){
        	game.hechizo2 = JSON.parse(JSON.stringify(hechizo2Data));
        	hechizo2=game.add.sprite(game.player2.x,game.player2.y,'hechizo2');
        	hechizo2.visible=false;
        	//console.log("Informacion el hechizo: "+JSON.stringify(game.hechizo2));
        })
        
       
        //hechizo=game.add.sprite(game.hechizo1.x,game.hechizo1.y,'hechizoDcha');
        /*hechizos = game.add.group();
        hechizos.enableBody = true;
        hechizos.physicsBodyType = Phaser.Physics.ARCADE;
        hechizos.createMultiple(30, 'hechizoDcha');
        hechizos.setAll('anchor.x', 1);
        hechizos.setAll('anchor.y', 0.5);
        hechizos.setAll('outOfBoundsKill', true);
        hechizos.setAll('checkWorldBounds', true);*/

        //mago_derecha=game.add.sprite(700,400,'mago_naranja');
        //game.physics.enable([mago_derecha,mago_izquierda],Phaser.Physics.ARCADE);
        //Atributos mago verde
        /*mago_izquierda.vida=100;
        mago_izquierda.mana=100;
        mago_izquierda.dañoHechizo=20;
        //Atributos mago naranja
        mago_derecha.vida=100;
        mago_derecha.mana=100;
        mago_derecha.dañoHechizo=20;*/
        //Animaciones personajes
        /*mago_derecha.animations.add('left',[0,1,2,3,4,5,6,7,8],10,true);
        mago_derecha.animations.add('right',[9,10,11,12,13,14,15,16,17],10,true);
        mago_derecha.frame=0;*/
        mago.animations.add('left',[0,1,2,3,4,5,6,7,8],10,true);
        mago.animations.add('right',[9,10,11,12,13,14,15,16,17],10,true);
        mago.frame=9;

        
        //game.physics.enable(suelo,Phaser.Physics.ARCADE);
        //barras de vida
        //vidadcha=new Phaser.Rectangle(650,25,mago_derecha.vida,20);
        //vidaizq=new Phaser.Rectangle(25,25,mago.vida,20);
        //barras de mana
        //manadcha=new Phaser.Rectangle(650,50,mago_derecha.mana,20);
        //manaizq=new Phaser.Rectangle(25,50,mago.mana,20);

        mago.body.gravity.y=500;
        mago.body.bounce.y=0.1;
        /*mago_izquierda.body.collideWorldBounds=true;
        mago_izquierda.body.gravity.y=500;
        mago_izquierda.body.bounce.y=0.1;
        mago_izquierda.body.setSize(30,50);
        mago_izquierda.anchor.setTo(0.5,0.5);

        mago_derecha.body.collideWorldBounds=true;
        mago_derecha.body.gravity.y=500;
        mago_derecha.body.bounce.y=0.1
        mago_derecha.body.setSize(30,50);
        mago_derecha.anchor.setTo(0.5,0.5);*/

        //  Hechizos mago naranja
        spellsDcha = game.add.group();
        spellsDcha.enableBody = true;
        spellsDcha.physicsBodyType = Phaser.Physics.ARCADE;
        spellsDcha.createMultiple(30, 'spellDcha');
        spellsDcha.setAll('anchor.x', 1);
        spellsDcha.setAll('anchor.y', 0.5);
        spellsDcha.setAll('outOfBoundsKill', true);
        spellsDcha.setAll('checkWorldBounds', true);
        

        spellsIzq = game.add.group();
        spellsIzq.enableBody = true;
        spellsIzq.physicsBodyType = Phaser.Physics.ARCADE;
        spellsIzq.createMultiple(30, 'spellIzq');
        spellsIzq.setAll('anchor.x', 1);
        spellsIzq.setAll('anchor.y', 0.5);
        spellsIzq.setAll('outOfBoundsKill', true);
        spellsIzq.setAll('checkWorldBounds', true);
        

        //  Hechizos mago verde
        /*hechizosDcha = game.add.group();
        hechizosDcha.enableBody = true;
        hechizosDcha.physicsBodyType = Phaser.Physics.ARCADE;
        hechizosDcha.createMultiple(30, 'hechizoDcha');
        hechizosDcha.setAll('anchor.x', 1);
        hechizosDcha.setAll('anchor.y', 0.5);
        hechizosDcha.setAll('outOfBoundsKill', true);
        hechizosDcha.setAll('checkWorldBounds', true);*/
        

        
        

        //  Our enchantment group
            //Encantamientos mago naranja
        enchantments = game.add.group();
        enchantments.enableBody = true;
        enchantments.physicsBodyType = Phaser.Physics.ARCADE;
        enchantments.createMultiple(30, 'enchantmentJ2');
        enchantments.setAll('checkWorldBounds', true);
            //Encantamientos mago verde
        enchantments2 = game.add.group();
        enchantments2.enableBody = true;
        enchantments2.physicsBodyType = Phaser.Physics.ARCADE;
        enchantments2.createMultiple(30, 'enchantmentJ1');
        enchantments2.setAll('checkWorldBounds', true);

        //  And some controls to play the game with
            //Controles jugador 1
        wkey=game.input.keyboard.addKey(Phaser.Keyboard.W);
        akey=game.input.keyboard.addKey(Phaser.Keyboard.A);
        skey=game.input.keyboard.addKey(Phaser.Keyboard.S);
        dkey=game.input.keyboard.addKey(Phaser.Keyboard.D);
        fire2Button = game.input.keyboard.addKey(Phaser.Keyboard.V);
        ench2Button = game.input.keyboard.addKey(Phaser.Keyboard.B);
            //Controles mago naranja
        /*flechas=game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.I);
        enchButton = game.input.keyboard.addKey(Phaser.Keyboard.O);
        ench2Button=game.input.keyboard.addKey(Phaser.Keyboard.B);*/
    },

    update: function() {
    	
    	var micolision=game.physics.arcade.collide(mago,hechizo);
        console.log(micolision);
        if(micolision){
        	console.log("yes");
        	hechizo.kill();
        	game.player2.vida-=20;
        }else{
        	this.getHechizo(function(updateHechizo2){
        		hechizo.x=updateHechizo2.x;
        		hechizo.y=updateHechizo2.y;
        	})
        }

        if (mago.body.y>540){
        	game.player1.vida=0;
        }
        
        if(game.player1.vida==0 ||  game.player2.vida==0){
        	this.game.state.start("endingState");
        }
        /*if (mago_izquierda.body.x>765 && (mago_izquierda.body.y>=461 || mago_izquierda.body.y<=462)){
            mago_izquierda.vida=100;
            mago_derecha.mana=100;
            mago_izquierda.mana=100;
            mago_izquierda.mana=100;
            facing_j1='right';
            facing_j2='left';
            mago_derecha.scale.x=1;
            mago_izquierda.scale.x=1;
            this.state.start("level_dcha1State");
            console.log("gana verde");
        }
        if (mago_derecha.body.x<10 && (mago_derecha.body.y>=461 || mago_derecha.body.y<=462)){
            this.state.start("level_izq1State");
            mago_izquierda.vida=100;
            mago_derecha.mana=100;
            mago_izquierda.mana=100;
            mago_izquierda.mana=100;
            facing_j1='right';
            facing_j2='left';
            mago_derecha.scale.x=1;
            mago_izquierda.scale.x=1;
            console.log("gana naranja");
        }
        if (mago_derecha.body.y>540){
            this.state.start("level_dcha1State");
            mago_izquierda.vida=100;
            mago_derecha.mana=100;
            mago_izquierda.mana=100;
            mago_izquierda.mana=100;
            facing_j1='right';
            facing_j2='left';
            mago_derecha.scale.x=1;
            mago_izquierda.scale.x=1;
            console.log("gana verde");
        }
        if (mago_izquierda.body.y>540){
            this.state.start("level_izq1State");
            mago_izquierda.vida=100;
            mago_derecha.mana=100;
            mago_izquierda.mana=100;
            mago_izquierda.mana=100;
            facing_j1='right';
            facing_j2='left';
            mago_derecha.scale.x=1;
            mago_izquierda.scale.x=1;
            console.log("gana naranja");
        }*/

        /*game.debug.geom(vidaizq,'rgba(0,255,0,1)');
        game.debug.geom(vidadcha,'rgba(0,255,0,1)');

        game.debug.geom(manadcha,'rgba(0,0,255,1)');
        game.debug.geom(manaizq,'rgba(0,0,255,1');*/


        //funcion de disparo para el mago naranja
        /*function fireSpell () {

           
            if (game.time.now > spellTime)
            {
               
                spell = spellsIzq.getFirstExists(false);
                spell2=spellsDcha.getFirstExists(false);
        
                if (spell || spell2)
                {
                    //  And fire it
                    spell.reset(mago_derecha.x,mago_derecha.y+5);
                    spell2.reset(mago_derecha.x,mago_derecha.y+5);
                    if (redLeft){
                        spell.body.velocity.x = -400;
                        spellsIzq.setAll('anchor.x', 1);
                        spell.body.velocity.y = -50;
                        spell2.kill();
                        
                    } else if(redRight){
                        spellsDcha.setAll('anchor.x', -1);
                        spell2.body.velocity.x = 400;
                        spell2.body.velocity.y=-50;
                        spell.kill();
                    }
                    
                    spellTime = game.time.now + 200;
                }
            }
        
        }*/
    	

        //funcion de disparo para el mago verde
    	function fireHechizo(){
    		/*hechizo = game.add.sprite(mago.x,mago.y-5,'hechizoDcha');
     		game.physics.enable(hechizo,Phaser.Physics.ARCADE);
     		hechizo.anchor.setTo(.5,.5);
     		hechizo.visible=true;*/
    		
    		if(direccionIzq==true){
    			lanzamiento=true;
    			hechizo=game.add.sprite(game.player1.x,game.player1.y+10,'hechizo');
    			game.physics.enable(hechizo,Phaser.Physics.ARCADE);
    			hechizo.visible=true;
    			hechizo.body.velocity.x=-400;
    			//hechizo.body.velocity.y=50;
    		}else if(direccionIzq==false){
    			lanzamiento=true;
    			console.log("Direccion derecha");
    			hechizo=game.add.sprite(game.player1.x,game.player1.y+10,'hechizo');
    			game.physics.enable(hechizo,Phaser.Physics.ARCADE);
    			hechizo.visible=true;
    			hechizo.body.velocity.x=400;
    			//hechizo.body.velocity.y=50;
    		}
    			
    			//hechizo.body.velocity.y=-50;
    		
    			
    		
    		
    		/*if(game.time.now>hechizoTime){
    			hechizo=hechizos.getFirstExists(false);
    			if(hechizo){
        			hechizo.reset(mago.x,mago.y+5);
            			if(direccionIzq==true){
            				//hechizos.scale.x*=-1;
            				hechizos.setAll('anchor.x',1);
            				hechizo.body.velocity.x=-400;
            				hechizo.body.velocity.y=-50;
            				hechizo.kill();
            			}else if(direccionIzq==false){
            				//hechizos.scale.x*=-1;
            				hechizos.setAll('anchor.x',-1);
            				hechizo.body.velocity.x=400;
            				hechizo.body.velocity.y=-50;
            				hechizo.kill();
            			}
            			hechizoTime = game.time.now + 200;
        		}
    		}*/
    	}
    	
    	
    	
        /*function fireHechizo () {

            //  To avoid them being allowed to fire too fast we set a time limit
            if (game.time.now > hechizoTime)
            {
                //  Grab the first hechizo we can from the pool
            	hechizo=game.add.sprite(mago.x,mago.y+5,'hechizoIzq')
                //hechizo = hechizosIzq.getFirstExists(false);
                //hechizo2 = hechizosDcha.getFirstExists(false);
                if (hechizo)
                {
                    //  And fire it
                    hechizo.reset(mago.x, mago.y + 5);
                    hechizo.x=mago.x;
                    hechizo.y=mago.y;
                    //hechizo2.reset(mago_izquierda.x, mago_izquierda.y + 5);
                    if (greenLeft){
                    	lanzamiento=true;
                        hechizo.body.velocity.x = -400;
                        hechizosIzq.scale.x*=-1;
                        hechizosIzq.setAll('anchor.x', 1);
                        hechizo.body.velocity.y = -50;
                        hechizo.kill();
                      
                    } else if(greenRight){
                    	lanzamiento=true;
                        hechizosIzq.setAll('anchor.x', -1);
                        hechizosIzq.scale.x*=-1;
                        hechizo.body.velocity.x = 400;
                        hechizo.body.velocity.y = -50;
                        hechizo.kill();
                        
                    }
                    
                    hechizoTime = game.time.now + 200;
                }
            }
        
        }*/
        
        
        //Encantamiento para mago naranja
        /*function fireEnchantment () {

           
            if (game.time.now > enchantmentTime)
            {
               
                enchantment = enchantments.getFirstExists(false);
        
                if (enchantment)
                {
                    //  And fire it
                    enchantment.reset(mago_derecha.x-30,mago_derecha.y);
                    enchantment.body.allowGravity=false;
                    enchantmentTime = game.time.now + 200;
                }
            }
        
        }

        function fireEnchantment2 () {

           
            if (game.time.now > enchantmentTime)
            {
               
                enchantment2 = enchantments2.getFirstExists(false);
        
                if (enchantment2)
                {
                    //  And fire it
                    enchantment2.reset(mago_izquierda.x - 30,mago_izquierda.y);
                    enchantment2.body.allowGravity=false;
                    enchantmentTime = game.time.now + 200;
                    
                }
            }
        
        }

        

        // funciones para eliminar los sprites de los hechizos una vez salgan fuera de la pantalla
        function resetSpell (spell) {
            spell.kill();
        
        }*/

        function resetHechizo (hechizo) {
            hechizo.kill();
        
        }
       
        /*mago_derecha.body.velocity.x=0;*/
    	

    	game.debug.geom(vida,'rgba(0,255,0,1)');
    	game.debug.geom(vidaEnemigo,'rgba(0,255,0,1)');
        //game.debug.geom(vidadcha,'rgba(0,255,0,1)');
        
        game.debug.geom(mana,'rgba(0,0,255,1)');
        game.debug.geom(manaEnemigo,'rgba(0,0,255,1)');
        //game.debug.geom(manaizq,'rgba(0,0,255,1');
    	
    	
        mago.body.velocity.x=0;

        //Movimiento mago verde
        if(akey.isDown){
            
            mago.body.velocity.x=-150;
            
            direccionIzq=true;
            game.player1.facing="left";
			//hechizo.scale.x*=-1;
            if(facing_j1!='left'){
                mago.animations.play('left');
                facing_j1='left';
            }
            greenLeft = true;
        }else if(dkey.isDown){
             
            mago.body.velocity.x=150;
            
            //mago.scale.x*=-1;
            direccionIzq=false;
            game.player1.facing="right";
			//hechizo.scale.x*=-1;
            if(facing_j1!='right'){
                mago.animations.play('right');
                facing_j1='right';
            }
            greenLeft = false;
        }else{
            if(facing_j1!='idle'){
                mago.animations.stop();
                if(facing_j1=='right'){
                    mago.frame=9;
                }else{
                    mago.frame=0;
                }
            }
        }

        if(wkey.isDown && mago.body.onFloor() && game.time.now > temp2){
            mago.body.velocity.y=-300;
            temp2=game.time.now+750;
        }

        //Movimiento mago naranja
        /*if(flechas.left.isDown){
            mago_derecha.body.velocity.x=-150;
                if(facing_j2!='left'){
                    mago_derecha.animations.play('left');
                    facing_j2='left';
                }
                /*mago_derecha.scale.x=1;
                facing_j2='left';
                
               
                redLeft=true;
        }else if(flechas.right.isDown){
            
            //mago_derecha.body.velocity.x=1;
            
            mago_derecha.body.velocity.x=150;
            if(facing_j2!='right'){
                mago_derecha.animations.play('right');
                facing_j2='right';
            }
           
            redLeft=true;
        }else {
            if(facing_j2!='idle'){
                mago_derecha.animations.stop();
                if(facing_j2=="left"){
                    mago_derecha.frame=0;
                }
                else {
                    mago_derecha.frame=9;
                }
                facing_j2="idle";
            }
        }
        
        

        if(flechas.up.isDown && mago_derecha.body.onFloor() && game.time.now > temp){
            mago_derecha.body.velocity.y=-300;
            temp=game.time.now+750;
        }*/

        //  Firing?
        /*if (fireButton.isDown && spellTempo>3)
        {
            
            spellTempo=0;
            if(mago_derecha.mana>0){
                fireSpell();
                manadcha=new Phaser.Rectangle(650,50,mago_derecha.mana-spellCost,20);
                mago_derecha.mana-=spellCost;
            }
            
        }*/

        if (fire2Button.isDown && hechizoTempo>3)
        {
            hechizoTempo=0;
            fireHechizo();
            if(game.player1.mana>0){
                fireHechizo();
                //game.player1.mana-=spellCost;
                mana=new Phaser.Rectangle(25,50,game.player1.mana-spellCost,20);
                game.player1.mana-=spellCost;
            }
            
        }
        // Enchanting?
        /*if (enchButton.isDown && spellTempo>3)
        {
            
            spellTempo=0;
            if(mago_derecha.mana>29){
                fireEnchantment();
                manadcha=new Phaser.Rectangle(650,50,mago_derecha.mana-enchantCost,20);
                mago_derecha.mana-=enchantCost;
            }
        }

        if (ench2Button.isDown && hechizoTempo>3)
        {
            hechizoTempo=0;
            if(mago_izquierda.mana>29){
                fireEnchantment2();
                manaizq=new Phaser.Rectangle(25,50,mago_izquierda.mana-enchantCost,20);
                mago_izquierda.mana-=enchantCost;
            }
        }*/

        this.putPlayer();

        this.getPlayer(function(updatePlayer2){
            game.player2 = JSON.parse(JSON.stringify(updatePlayer2));
            
            mago2.x =game.player2.x;
            mago2.y=game.player2.y;
            if(game.player2.id==2){
            	vidaEnemigo=new Phaser.Rectangle(650,25,game.player2.vida,20);
            	manaEnemigo=new Phaser.Rectangle(650,50,game.player2.mana,20);
            }else if(game.player2.id==1){
            	vidaEnemigo=new Phaser.Rectangle(25,25,game.player2.vida,20);
            	manaEnemigo=new Phaser.Rectangle(25,50,game.player2.mana,20);
            }
           
            if(game.player2.id==1){
            	mago2.scale.x=-1;
            }
            //mago2.scale.x=-1;
            //console.log("Posicion de player 2: " +JSON.stringify(game.player2)  + " actualizada");
        })
        
        if(lanzamiento==true){
        	this.putHechizo();
        }
        
        this.getHechizo(function(updateHechizo2){
    		console.log("Entra en la funcion getHechizoIzquierda");
    		game.hechizo2 = JSON.parse(JSON.stringify(updateHechizo2));
    		//hechizo2I.scale.x*=-1;
    		hechizo2.visible=true;
        		hechizo2.x=game.hechizo2.x;
        		hechizo2.y=game.hechizo2.y;
        		hechizo2.visible=true;
    		
    		//console.log("Posicion del hechizo enemigo: " + JSON.stringify(game.hechizo2) + "actualizada");
    	});
        	
        // se detectan las colisiones de los hechizos con los magos para actualizar la vida de cada uno de ellos
       
        
        /*game.physics.arcade.collide(mago_izquierda,spellsIzq,micolision);
        game.physics.arcade.collide(mago_derecha,hechizosDcha,micolision2);
        game.physics.arcade.collide(mago_derecha,hechizosIzq,micolision2);
        
        game.physics.arcade.collide(mago_derecha,enchantments2,trampaVerde,null,this);
        game.physics.arcade.collide(mago_izquierda,enchantments,trampaNaranja,null,this);

        game.physics.arcade.collide(mago_derecha,mago_izquierda,colisionMagos,null,this);*/
        game.physics.arcade.collide(mago,layer,colisionMapaMagoVerde,null,this);

        spellTempo+=0.05;
        hechizoTempo+=0.05;
        enchantmentTempo+=0.1;
        ench2Tempo+=0.1;

        

        /*if(vidaJ1==0||vidaJ2==0){
            this.state.start("endingState");
        }*/
    },

    getPlayer(callback){
        $.ajax({
            method:"GET",
            url:'http://192.168.1.140:8080/game/' + game.player2.id,
            processData:false,
            headers:{
                "Content-Type":"application/json"
            }
        }).done(function(data){
            game.player2= JSON.parse(JSON.stringify(data));
            callback(data);
        })
    },
    
    //Recuperamos la información del hechizo del enemigo
    getHechizo(callback){
    	$.ajax({
    		method:"GET",
    		url:'http://192.168.1.140:8080/hechizo/' + game.hechizo2.id,
    		processData:false,
    		headers:{
    			"Content-Type":"application/json"
    		}
    	}).done(function(data){
    		game.hechizo2 = JSON.parse(JSON.stringify(data));
    		callback(data);
    	})
    },
    
    

    putPlayer(){
        game.player1.x=mago.x;
        game.player1.y=mago.y;
        game.player1.facing;
        $.ajax({
            method:"PUT",
            url:'http://192.168.1.140:8080/game/'+game.player1.id,
            data:JSON.stringify(game.player1),
            processData:false,
            headers:{
                "Content-Type":"application/json"
            }
        }).done(function(data){
            //console.log("Actualizada posicion jugador 1: "+JSON.stringify(data));
        })
    },
    
    //Actualizamos la informacion de nuestro hechizo
    putHechizo(){
    	game.hechizo1.x=hechizo.x;
    	game.hechizo1.y=hechizo.y;
    	$.ajax({
    		method:"PUT",
    		url:'http://192.168.1.140:8080/hechizo/'+game.hechizo1.id,
    		data:JSON.stringify(game.hechizo1),
    		processData:false,
    		headers:{
    			"Content-Type":"application/json"
    		}
    	}).done(function(data){
    		//console.log("Actualizada posicion hechizo: " + JSON.stringify(data));
    	})
    },
    
}