MagicAndRunes.level1State = function(game) {
    
}

    var layer;														//Capa actual del mapa
    var medidor;													//Imagen correspondiente al "mapa", en la parte superior
    																//de la pantalla
    var temp2=0;													//Temporizador para el salto
    																//en las barras correspondientes de vida y de maná
    var lanzamiento=false;											//Se pone a true para disparar un hechizo
    																//trabajar sin usar game.player1.vida
    var nivel;														//Almacena todo lo referente al nivel
    var facing_j1='right',facing_j2='left';							//Almacena a dónde apinta el jugador 1 y el jugador 2
    var vida,mana;
    var isHit = false;												//Para controlar si se ha golpeado al enemigo con el hechizo
    var isHitEnch = false;											//Para controlar si el enemigo colisiona con el encantamiento
    var play = false;												//Variable para controllar la animacion del encantamiento

    
    
    //Variables de los hechizos
    var hechizo,hechizo2;											//Hechizos del jugador y del enemigo, respectivamente
    var fire2Button,ench2Button;												//Tecla a pulsar que dispara los hechizos
    var hechizoTempo=0;												//Temporizador que regula la cadencia de los hechizos
    var direccionIzq =false;										//Variable que almacena la dirección del 
    																//hechizo en función de si mira a la izquierda
    var spellCost=2;												//Coste en maná de disparar un hechizo
   

//-------------------------------------Si el mago entra en contacto con el mapa, este actúa 
//-------------------------------------como suelo sobre el que se puede saltar.
    function colisionMapaMagoVerde(mago_izquierda){
    	//-----------------------------Función de salto con la "W"
        if(wkey.isDown && mago_izquierda.body.onFloor() && game.time.now > temp2){
            mago_izquierda.body.velocity.y=-350;
            game.global.player1.y = mago_izquierda.body.y
            temp2=game.time.now+750;
        }
    }

    
    MagicAndRunes.level1State.prototype = {


    preload: function() {
    	

    },

    create: function() {
         
    	 lanzamiento=false;													//Inicializamos lanzamiento a false
    	 
    	 //----------------------------MÚSICA-----------------------------------------//
         
         //Mantenemos la que se encuentre sonando
        
       
         //---------------------ELEMENTOS BÁSICOS DEL NIVEL------------------------//
        background= game.add.sprite(0,0,'background');						//Asignamos el background a su variable
        nivel=this.add.tilemap('nivel+1',16,16);								//   ""    el tilemap  ""
        nivel.addTilesetImage('tiles');										//   ""    el tileset  ""
        layer=nivel.createLayer(0);											//Creamos una capa del mapa en la que vamos a trabajar
        nivel.setCollisionBetween(1,5302);									//Asignamos las colisiones con los tiles del mapa

        layer.resizeWorld();												//Redefinimos el tamaño de la escena

        medidor=game.add.sprite(292,20,'nivAct');							//Le asignamos la imagn al medidor
        
        //Añadimos el personaje del jugador 1
        if(game.global.player1.id==0){
        	game.global.player1.image = game.add.sprite(game.global.player1.x,game.global.player1.y,'mago_verde');
        }else if(game.global.player1.id==1){
        	game.global.player1.image =game.add.sprite(game.global.player1.x,game.global.player1.y,'mago_naranja');
        	//mago.scale.x=-1;
        }
        
        
        
        //----------------------------BARRAS PLAYER 1-------------------------------//
        //Creamos las barras de vida y maná del jugador local dependiendo de su ID
        if(game.global.player1.id==0){
       	 vidaUI = game.add.text(game.world.centerX-300,25,'Vida: '+game.global.player1.vida,{font:"20px Arial",fill:"#08FF00",align:"center"})
       	 vidaUI.anchor.setTo(0.5,0.5)
       	 manaUI = game.add.text(game.world.centerX-300,50,'Mana: '+game.global.player1.mana,{font:"20px Arial",fill:"#00F3FF",align:"center"})
       	 manaUI.anchor.setTo(0.5,0.5)
        }else if (game.global.player1.id == 1){
         vidaUI = game.add.text(game.world.centerX+300,25,'Vida: '+game.global.player1.vida,{font:"20px Arial",fill:"#08FF00",align:"center"})
       	 vidaUI.anchor.setTo(0.5,0.5)
       	 manaUI = game.add.text(game.world.centerX+300,50,'Mana: '+game.global.player1.mana,{font:"20px Arial",fill:"#00F3FF",align:"center"})
       	 manaUI.anchor.setTo(0.5,0.5)
        }
        
        vidaLocal = game.global.player1.vida;										//Igualamos la vidaLocal a la vida de player1
        
        game.physics.enable(game.global.player1.image,Phaser.Physics.ARCADE);					//Asignamos las físicas arcade al juego
        
        //Creamos un hechizo invisible y le asignamos las físicas ARCADE
        if(game.global.player1.id == 0){
        	game.global.hechizo1.image =game.add.sprite(game.global.player1.x,game.global.player1.y+10,'hechizoverde');
        }else if(game.global.player1.id == 1){
        	game.global.hechizo1.image =game.add.sprite(game.global.player1.x,game.global.player1.y+10,'hechizo');
        }
    	
    	game.physics.enable(game.global.hechizo1.image,Phaser.Physics.ARCADE);
    	game.global.hechizo1.image.visible=false;
    	
    	//Creamo un encantamiento invisible y le asignamos las fisicas ARCADE
    	if(game.global.player1.id == 0){
        	game.global.encantamiento1.image = game.add.sprite(game.global.player1.x,game.global.player1.y,'nubeVerde')
        }else if(game.global.player1.id == 1){
        	game.global.encantamiento1.image = game.add.sprite(game.global.player1.x,game.global.player1.y,'nubeNaranja')
        }
    	game.physics.enable(game.global.encantamiento1.image,Phaser.Physics.ARCADE);
    	game.global.encantamiento1.image.visible = false
    	game.global.encantamiento1.isAlive = false;
    	game.global.encantamiento1.image.scale.setTo(0.5,0.5)
    	game.global.encantamiento1.image.anchor.setTo(0.5,0.5)
    	game.global.encantamiento1.image.animations.add('start')
        
        //Animaciones personajes
        game.global.player1.image.animations.add('left',[0,1,2,3,4,5,6,7,8],10,true);
        game.global.player1.image.animations.add('right',[9,10,11,12,13,14,15,16,17],10,true);
        if(game.global.player1.id == 0){
        	game.global.player1.image.frame=9;
        }else if(game.global.player1.id == 1){
        	game.global.player1.image.frame = 0;
        }
        

        game.global.player1.image.body.gravity.y=500;											//Gravedad asignada al mago
        game.global.player1.image.body.bounce.y=0.1;												//Rebote con el suelo
        
        //Asignamos los controles a las teclas "W", "A", "S", "D", "V" y "B"
        wkey=game.input.keyboard.addKey(Phaser.Keyboard.W);
        akey=game.input.keyboard.addKey(Phaser.Keyboard.A);
        skey=game.input.keyboard.addKey(Phaser.Keyboard.S);
        dkey=game.input.keyboard.addKey(Phaser.Keyboard.D);
        fire2Button = game.input.keyboard.addKey(Phaser.Keyboard.V);
        ench2Button = game.input.keyboard.addKey(Phaser.Keyboard.B);
    },

    update: function() {
    	/*
    	//Muerte por caida
    	if(game.global.player1.image.body.y>540){
    		game.global.player1.vida=0;
    		this.game.state.start('endingState')
    	}
    	
    	if(game.global.player1.vida <= 0){
    		this.game.state.start('endingState')
    	}/*
    	
    	//*****Implementar aquí la funcionalidad de pasar de nivel y de pasar al endingState cuando se llegue al final de todos los niveles*****/
    	
    	if(game.global.player1.id=0){
    		//Muerte por caida
        	if(game.global.player1.image.body.y>540){
        		game.global.player1.vida=0;
        		this.game.state.start('level0State')
        	}
        	
        	if(game.global.player1.vida <= 0){
        		this.game.state.start('level0State')
        	}
    	}else{
    		//Muerte por caida
        	if(game.global.player1.image.body.y>540){
        		game.global.player1.vida=0;
        		this.game.state.start('level2State')
        	}
        	
        	if(game.global.player1.vida <= 0){
        		this.game.state.start('level2State')
        	}
    	}
    	
    	
    	
    	
    	
    	

        //funcion de disparo para el mago verde
    	function fireHechizo(){
    		//Aquí comprobamos hacia dónde mira el jugador a la hora de asignarle una dirección al hechizo
    		//Después, lo hacemos visible y le asignamos velocidad en x y en y.
    		if(direccionIzq==true){
    			lanzamiento=true;
    			if(game.global.player1.id == 0){
    				game.global.hechizo1.image=game.add.sprite(game.global.player1.image.x,game.global.player1.image.y+10,'hechizoverde');
    			}else if(game.global.player1.id == 1){
    				game.global.hechizo1.image=game.add.sprite(game.global.player1.image.x,game.global.player1.image.y+10,'hechizo');
    			}
    			game.physics.enable(game.global.hechizo1.image,Phaser.Physics.ARCADE);
    			game.global.hechizo1.image.visible=true;
    			game.global.hechizo1.image.body.velocity.x=-400;
    			game.global.hechizo1.image.body.velocity.y=-50;
    		}else if(direccionIzq==false){
    			lanzamiento=true;
    			console.log("Direccion derecha");
    			if(game.global.player1.id == 0){
    				game.global.hechizo1.image=game.add.sprite(game.global.player1.image.x,game.global.player1.image.y+10,'hechizoverde');
    			}else if(game.global.player1.id == 1){
    				game.global.hechizo1.image=game.add.sprite(game.global.player1.image.x,game.global.player1.image.y+10,'hechizo');
    			}
    			game.physics.enable(game.global.hechizo1.image,Phaser.Physics.ARCADE);
    			game.global.hechizo1.image.visible=true;
    			game.global.hechizo1.image.body.velocity.x=400;
    			game.global.hechizo1.image.body.velocity.y=-50;
    		}
    	}
    	
    	function fireEncantamiento(){
    		if(game.global.player1.id == 0){
            	game.global.encantamiento1.image = game.add.sprite(game.global.player1.image.x + 10,game.global.player1.image.y + 30,'nubeVerde')
            }else if(game.global.player1.id == 1){
            	game.global.encantamiento1.image = game.add.sprite(game.global.player1.image.x + 10,game.global.player1.image.y + 30,'nubeNaranja')
            }
    		game.physics.enable(game.global.encantamiento1.image,Phaser.Physics.ARCADE)
    		game.global.encantamiento1.image.body.allowGravity = false
    		game.global.encantamiento1.image.scale.setTo(0.5,0.5)
    		game.global.encantamiento1.image.anchor.setTo(0.5,0.5)
    		game.global.encantamiento1.image.visible = true;
    		game.global.encantamiento1.isAlive = true;
    		game.global.encantamiento1.image.animations.add('start')
    		
    	}
    	//------------------------------BARRAS DE VIDA Y MANÁ-----------------------------------//
    	//Volvemos a pintar la informacion con las variables actualizadas
        vidaUI.setText("Vida: " + game.global.player1.vida)
        manaUI.setText("Mana: " + game.global.player1.mana)
        
        //--------------------------------MOVIMIENTO DEL MAGO-----------------------------------//
        
        game.global.player1.image.body.velocity.x=0;														//Eliminamos la velocidad en x del mago,
        																			//para que no afecte a los cáculos del movimiento 
        																			//a continuación

        //Movimiento mago
        if(akey.isDown){
        	game.global.player1.image.body.velocity.x=-150;												//Velocidad en x 
        	game.global.player1.x = game.global.player1.image.body.x
            direccionIzq=true;														//El mago ahora apunta a la izquierda; si no lo 
            																		//hacía ahora lo hace
            game.global.player1.facing=-1;
            
            if(facing_j1!='left'){
            	game.global.player1.image.animations.play('left');										//El conjunto de sprites de la animación es "left"
                facing_j1='left';
            }
            greenLeft = true;
        }else if(dkey.isDown){
             
        	game.global.player1.image.body.velocity.x=150;												//Velocidad en x 
        	game.global.player1.x = game.global.player1.image.body.x
            direccionIzq=false;														//El mago ahora apunta a la izquierda; si no lo 
																					//hacía ahora lo hace
            game.global.player1.facing=1;
            if(facing_j1!='right'){
            	game.global.player1.image.animations.play('right');										//El conjunto de sprites de la animación es "right"
                facing_j1='right';
            }
            greenLeft = false;
        }else{																		//Se reasigna el frame
        	game.global.player1.facing = 0
            if(facing_j1!='idle'){
            	game.global.player1.image.animations.stop();
                if(facing_j1=='right'){
                	game.global.player1.image.frame=9;
                }else{
                	game.global.player1.image.frame=0;
                }
            }
        }

        if(wkey.isDown && game.global.player1.image.body.onFloor() && game.time.now > temp2){
        	game.global.player1.image.body.velocity.y=-300;							//Se le asigna un salto de 300 de velocidad 
            game.global.player1.y = game.global.player1.image.body.y
        	temp2=game.time.now+750;												//Se reinicia el temporizador del salto
        }

        
        //Funcion para lanzar el hechizo
        if (fire2Button.isDown && hechizoTempo>3)
        {
            hechizoTempo=0;															//Se reinicia el temporizador del hechizo
            if(game.global.player1.mana>0){
                fireHechizo();														//Función de disparo del hechizo
                game.global.player1.mana-=spellCost;
            }
        }
        
        //Funcion para lanzar el encatamiento, no puede volver a lanzarse otro encantamiento mientras haya un encantamiento vivo (isAlive)
        if(ench2Button.isDown && hechizoTempo>3 && game.global.encantamiento1.isAlive == false){
        	hechizoTempo = 0;
        	if(game.global.player1.mana > 0){
        		fireEncantamiento();
        		play = true
        		game.global.player1.mana -= spellCost;
        	}
        }
        
        if(play){
        	game.global.encantamiento1.image.animations.play('start',15,true)
        }
        
        	
       //------------------------------COLISIÓN CON EL HECHIZO------------------------------------------//

        game.physics.arcade.collide(game.global.player1.image,layer,colisionMapaMagoVerde,null,this);			//Activa la colisión entre el mapa y el mago
        game.physics.arcade.collide(game.global.player2.image,layer,colisionMapaMagoVerde,null,this);			//Activa la colisión entre el mapa y el mago2
        
        game.physics.arcade.overlap(game.global.hechizo1.image,game.global.player2.image,collisionHandler,null,this) //Para comprobar la colision del hechizo con el enemigo
        game.physics.arcade.overlap(game.global.encantamiento1.image,game.global.player2.image,collisionHandlerEnch,null,this) //Para comprobar la colision del encantamiento con el enemigo
        
        function collisionHandler(hechizo,player2){
        	game.global.hechizo1.image.kill();
        	isHit = true;
        }
        
        function collisionHandlerEnch(encatamiento,player2){
        	game.global.encantamiento1.image.kill();
        	game.global.encantamiento1.isAlive = false;
        	isHitEnch = true;
        }
        
        
        
        hechizoTempo+=0.05;																	//Aumenta la cuenta del temporizador del hechizo

        //Mensaje de actualizacion del jugador
        let mensaje = new Object();
        mensaje.event = "UPDATE_PLAYER"
        mensaje.info = {
        		id: game.global.player1.id,
        		x: game.global.player1.image.x,
        		y: game.global.player1.image.y,
        		velocityX:game.global.player1.image.body.velocity.x,
        		velocityY:game.global.player1.image.body.velocity.y,
        		vida: game.global.player1.vida,
        		mana: game.global.player1.mana,
        		facing:game.global.player1.facing
        }
        
        	ws.send(JSON.stringify(mensaje))
       
        	//Mensaje de actualizacion del hechizo
        	mensaje2 = {
                	event:"SPELL",
                	id:game.global.player1.id,
                	x:game.global.hechizo1.image.x,
                	y:game.global.hechizo1.image.y,
                	visible:game.global.hechizo1.image.visible,
                	velocityX:game.global.hechizo1.image.body.velocity.x,
                	velocityY:game.global.hechizo1.image.body.velocity.y,
                	isHit:isHit
                }
                ws.send(JSON.stringify(mensaje2))
             
            //Mensaje de actualizacion del encatamiento
        	mensaje3 = {
        			event:"ENCH",
        			id:game.global.player1.id,
        			x:game.global.encantamiento1.image.x,
        			y:game.global.encantamiento1.image.y,
        			visible:game.global.encantamiento1.image.visible,
        			isHitEnch:isHitEnch
        	}
        	ws.send(JSON.stringify(mensaje3))
        	
        	isHit = false
        	isHitEnch = false
    },
    
    

}