MagicAndRunes.level0State = function(game) {
    
}


    var mago;														//Mago controlado
    var mago2;														//Mago enemigo
    var layer;														//Capa actual del mapa
    var medidor;													//Imagen correspondiente al "mapa", en la parte superior
    																//de la pantalla
    var temp2=0;													//Temporizador para el salto
    var vidaEnemigo,manaEnemigo;									//Empleadas para pintar la vida y el maná del enemigo
    																//en las barras correspondientes de vida y de maná
    var lanzamiento=false;											//Se pone a true para disparar un hechizo
    var vidaLocal;													//Almacena la vida del jugador de forma que se pueda
    																//trabajar sin usar game.player1.vida
    var nivel;														//Almacena todo lo referente al nivel
    var facing_j1='right',facing_j2='left';							//Almacena a dónde apinta el jugador 1 y el jugador 2

    
    
    //Variables de los hechizos
    var hechizo,hechizo2;											//Hechizos del jugador y del enemigo, respectivamente
    var fire2Button;												//Tecla a pulsar que dispara los hechizos
    var hechizoTempo=0;												//Temporizador que regula la cadencia de los hechizos
    var direccionIzq =false;										//Variable que almacena la dirección del 
    																//hechizo en función de si mira a la izquierda
    var spellCost=2;												//Coste en maná de disparar un hechizo
    
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

//-------------------------------------Si el mago entra en contacto con el mapa, este actúa 
//-------------------------------------como suelo sobre el que se puede saltar.
    function colisionMapaMagoVerde(mago_izquierda){
    	//-----------------------------Función de salto con la "W"
        if(wkey.isDown && mago_izquierda.body.onFloor() && game.time.now > temp2){
            mago_izquierda.body.velocity.y=-350;
            temp2=game.time.now+750;
        }
    }

    
    MagicAndRunes.level0State.prototype = {
        init() {
        	
        	//El jugador empieza mirando a izquierda o derecha dependiendo de su IP
            /*if(game.player1.id==1){
                game.player2 = {id:2,
                				facing:"left"};
            }else if(game.player1.id==2){
                game.player2 = {id: 1,
                				facing:"right"};
            }
            //Se crea la ID del hechizo 2 en base a la del hechizo 1
            if(game.hechizo1.id==1){
            	game.hechizo2 = {id:2};
            }else{
            	game.hechizo2 = {id:1};
            }*/
        },

    preload: function() {
    	//----------------------------FONDO------------------------------------------//
        game.load.image('background','assets/images/background_dungeonv2.png');
        //-----------------------------TILEMAP---------------------------------------//
        game.load.tilemap('nivel0','assets/scenarios/prueba.csv');
        //----------------------------MEDIDOR DE NIVEL-------------------------------//
        game.load.image('nivAct','assets/medidores/medidor_0.png');
        //---------------------------TILESHEET----------------------------------------//
        game.load.image('tiles','Tiles/Tilesheet/medieval_tilesheet_2X.png');
        //----------------------------SPRITESHEETS MAGOS--------------------------------//
        game.load.spritesheet('mago_naranja','assets/images/walk_naranja.png',27,49);
        game.load.spritesheet('mago_verde','assets/images/walk_verde.png',27,49);
        //-----------------------------IMAGEN HECHIZOS--------------------------------//
        game.load.image('hechizo','assets/spells/fuegoNaranja.png');
        game.load.image('hechizo2','assets/spells/fuegoNaranja.png');
        //----------------------------AUDIO--------------------------------------------//
        game.load.audio('ATA', 'assets/music/Ancient-Troops-Amassing.mp3');

    },

    create: function() {
         
    	 lanzamiento=false;													//Inicializamos lanzamiento a false
    	 
    	 //----------------------------MÚSICA-----------------------------------------//
         music.destroy();													//Destruimos la música del menú principal
         game.cache.removeSound('NoN');

         music = game.add.audio('ATA');										//Añadimos el audio cargado en preload
         music.loopFull()													//Obligamos a la música a repetir el loop
         																	//cargado hasta que sea destruido
        music.play();														//Iniciamos la música
         
         //----------------------------BARRAS PLAYER 1-------------------------------//
         //Creamos las barras de vida y maná del jugador local dependiendo de su ID
         if(game.player1.id==1){
        	 vida=new Phaser.Rectangle(25,25,game.player1.vida,20);
        	 mana=new Phaser.Rectangle(25,50,game.player1.mana,20);
         }else{
        	 vida=new Phaser.Rectangle(650,25,game.player1.vida,20);
        	 mana=new Phaser.Rectangle(650,50,game.player1.mana,20);
         }
         
         vidaLocal = game.player1.vida;										//Igualamos la vidaLocal a la vida de player1
         
         //---------------------ELEMENTOS BÁSICOS DEL NIVEL------------------------//
        background= game.add.sprite(0,0,'background');						//Asignamos el background a su variable
        nivel=this.add.tilemap('nivel0',16,16);								//   ""    el tilemap  ""
        nivel.addTilesetImage('tiles');										//   ""    el tileset  ""
        layer=nivel.createLayer(0);											//Creamos una capa del mapa en la que vamos a trabajar
        nivel.setCollisionBetween(1,5302);									//Asignamos las colisiones con los tiles del mapa

        layer.resizeWorld();												//Redefinimos el tamaño de la escena

        medidor=game.add.sprite(292,20,'nivAct');							//Le asignamos la imagn al medidor
        
        //Añadimos el personaje del jugador 1
        if(game.player1.id==1){
        	mago=game.add.sprite(game.player1.x,game.player1.y,'mago_verde');
        }else if(game.player1.id==2){
        	mago=game.add.sprite(game.player1.x,game.player1.y,'mago_naranja');
        	//mago.scale.x=-1;
        }
        
        game.physics.enable(mago,Phaser.Physics.ARCADE);					//Asignamos las físicas arcade al juego
        
        //---------------------------------Cogemos la posición inicial del jugador 2
        mensaje = {
        		type:"UPDATE_PLAYER",
        		player: game.player1
        }
        
        ws.send(JSON.stringify(mensaje));
        
        if(game.player2.id==1){
        	mago2=game.add.sprite(game.player2.x,game.player2.y,'mago_verde');
        }else if(game.player2.id==2){
        	mago2=game.add.sprite(game.player2.x,game.player2.y,'mago_naranja');
        }
        
        /*this.getPlayer(function(player2Data){
            game.player2 = JSON.parse(JSON.stringify(player2Data));
            if(game.player2.id==1){
            	mago2=game.add.sprite(game.player2.x,game.player2.y,'mago_verde');
            }else if(game.player2.id==2){
            	mago2=game.add.sprite(game.player2.x,game.player2.y,'mago_naranja');
            }
            //console.log(JSON.stringify(game.player2));
        })*/
        
        //Creamos un hechizo invisible y le asignamos las físicas ARCADE
    	hechizo=game.add.sprite(game.player1.x,game.player1.y+10,'hechizo');
    	game.physics.enable(hechizo,Phaser.Physics.ARCADE);
    	hechizo.visible=false;
		//Obtenemos el hechizo del jugador enemigo
        /*this.getHechizo(function(hechizo2Data){
        	game.hechizo2 = JSON.parse(JSON.stringify(hechizo2Data));
        	hechizo2=game.add.sprite(game.player2.x,game.player2.y,'hechizo2');
        	hechizo2.visible=false;
        	//console.log("Informacion el hechizo: "+JSON.stringify(game.hechizo2));
        })*/
        
        //Animaciones personajes
        mago.animations.add('left',[0,1,2,3,4,5,6,7,8],10,true);
        mago.animations.add('right',[9,10,11,12,13,14,15,16,17],10,true);
        mago.frame=9;

        mago.body.gravity.y=500;											//Gravedad asignada al mago
        mago.body.bounce.y=0.1;												//Rebote con el suelo
        

        

        //Asignamos los controles a las teclas "W", "A", "S", "D", "V" y "B"
        wkey=game.input.keyboard.addKey(Phaser.Keyboard.W);
        akey=game.input.keyboard.addKey(Phaser.Keyboard.A);
        skey=game.input.keyboard.addKey(Phaser.Keyboard.S);
        dkey=game.input.keyboard.addKey(Phaser.Keyboard.D);
        fire2Button = game.input.keyboard.addKey(Phaser.Keyboard.V);
        ench2Button = game.input.keyboard.addKey(Phaser.Keyboard.B);
    },

    update: function() {
    	mensaje = {
        		type:"UPDATE_PLAYER",
        		player: game.player1
        }
        
        ws.send(JSON.stringify(mensaje));
    	//Muerte por caida
    	if(mago.body.y>540){
    		game.player1.vida=0;
    	}
    	
    	/*if(game.player1.vida == 0 || game.player2.vida == 0){
    		this.game.state.start("endingState");
    	}*/

        //funcion de disparo para el mago verde
    	function fireHechizo(){
    		//Aquí comprobamos hacia dónde mira el jugador a la hora de asignarle una dirección al hechizo
    		//Después, lo hacemos visible y le asignamos velocidad en x y en y.
    		if(direccionIzq==true){
    			lanzamiento=true;
    			hechizo=game.add.sprite(game.player1.x,game.player1.y+10,'hechizo');
    			game.physics.enable(hechizo,Phaser.Physics.ARCADE);
    			hechizo.visible=true;
    			hechizo.body.velocity.x=-400;
    			hechizo.body.velocity.y=-50;
    		}else if(direccionIzq==false){
    			lanzamiento=true;
    			console.log("Direccion derecha");
    			hechizo=game.add.sprite(game.player1.x,game.player1.y+10,'hechizo');
    			game.physics.enable(hechizo,Phaser.Physics.ARCADE);
    			hechizo.visible=true;
    			hechizo.body.velocity.x=400;
    			hechizo.body.velocity.y=-50;
    		}
    	}
    	//------------------------------BARRAS DE VIDA Y MANÁ-----------------------------------//
    	//Volvemos a pintar las barras con las variables actualizadas
    	game.debug.geom(vida,'rgba(0,255,0,1)');									//Vida
    	game.debug.geom(vidaEnemigo,'rgba(0,255,0,1)');
        	
        game.debug.geom(mana,'rgba(0,0,255,1)');									//Maná
        game.debug.geom(manaEnemigo,'rgba(0,0,255,1)');
        
        
        //--------------------------------MOVIMIENTO DEL MAGO-----------------------------------//
        
        mago.body.velocity.x=0;														//Eliminamos la velocidad en x del mago,
        																			//para que no afecte a los cáculos del movimiento 
        																			//a continuación

        //Movimiento mago
        if(akey.isDown){
            mago.body.velocity.x=-150;												//Velocidad en x 
            
            direccionIzq=true;														//El mago ahora apunta a la izquierda; si no lo 
            																		//hacía ahora lo hace
            game.player1.facing="left";
            if(facing_j1!='left'){
                mago.animations.play('left');										//El conjunto de sprites de la animación es "left"
                facing_j1='left';
            }
            greenLeft = true;
        }else if(dkey.isDown){
             
            mago.body.velocity.x=150;												//Velocidad en x 
            
            direccionIzq=false;														//El mago ahora apunta a la izquierda; si no lo 
																					//hacía ahora lo hace
            game.player1.facing="right";

            if(facing_j1!='right'){
                mago.animations.play('right');										//El conjunto de sprites de la animación es "right"
                facing_j1='right';
            }
            greenLeft = false;
        }else{																		//Se reasigna el frame
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
            mago.body.velocity.y=-300;												//Se le asigna un salto de 300 de velocidad 
            temp2=game.time.now+750;												//Se reinicia el temporizador del salto
        }

        

        if (fire2Button.isDown && hechizoTempo>3)
        {
            hechizoTempo=0;															//Se reinicia el temporizador del hechizo
            if(game.player1.mana>0){
                fireHechizo();														//Función de disparo del hechizo
                //game.player1.mana-=spellCost;
                if(game.player1.id==1){
                	mana=new Phaser.Rectangle(25,50,game.player1.mana-spellCost,20);
                }else{
                	mana=new Phaser.Rectangle(650,50,game.player1.mana-spellCost,20);
                }
                game.player1.mana-=spellCost;
            }
        }
        
        /*this.putPlayer();															//Envía los datos del jugador al servidor

        this.getPlayer(function(updatePlayer2){										//Obtiene la posición del jugador 2
            game.player2 = JSON.parse(JSON.stringify(updatePlayer2));
            mago2.x =game.player2.x;
            mago2.y=game.player2.y;
            if(game.player2.id==2){													//Pinta la vida y el maná del enemigo
            	vidaEnemigo=new Phaser.Rectangle(650,25,game.player2.vida,20);
            	manaEnemigo=new Phaser.Rectangle(650,50,game.player2.mana,20);
            }else if(game.player2.id==1){
            	vidaEnemigo=new Phaser.Rectangle(25,25,game.player2.vida,20);
            	manaEnemigo=new Phaser.Rectangle(25,50,game.player2.mana,20);
            }
           
            if(game.player2.id==1){
            	mago2.scale.x=-1;
            }

        })*/
        
       /* if(lanzamiento==true){
        	this.putHechizo();											//Si se ha lanzado un hechizo, se añade un hechizo al servidor
        }*/
        
        /*this.getHechizo(function(updateHechizo2){						//Obtiene el hechizo del jugador 2
    		console.log("Entra en la funcion getHechizoIzquierda");
    		game.hechizo2 = JSON.parse(JSON.stringify(updateHechizo2));
    		
    		hechizo2.visible=true;
        		hechizo2.x=game.hechizo2.x;
        		hechizo2.y=game.hechizo2.y;
        		hechizo2.visible=true;
    		
    		});*/
        	
       //------------------------------COLISIÓN CON EL HECHIZO------------------------------------------//
        var micolision=game.physics.arcade.collide(game.player1,game.hechizo2);				//Colisión del jugador con el hechizo enemigo almacenado en un boolean
        //console.log(micolision);
        if(micolision){																		//Si han colisionado el hechizo tiene efecto
        	console.log("yes");
        	hechizo2.kill();
        	game.player1.vida-=20;
        }else{																				//Si no, se llama al update del hechizo 2
        	/*this.getHechizo(function(updateHechizo2){
        		game.hechizo2.x=updateHechizo2.x;
        		game.hechizo2.y=updateHechizo2.y;
        	})*/
        }

        game.physics.arcade.collide(mago,layer,colisionMapaMagoVerde,null,this);			//Activa la colisión entre el mapa y el mago

        hechizoTempo+=0.05;																	//Aumenta la cuenta del temporizador del hechizo

        mensaje = {
        		type: "UPDATE_PLAYER",
        		//playerX: game.player1.x,
        		//playerY: game.player1.y,
        		player: game.player1
        }

        
    },
    
    

}