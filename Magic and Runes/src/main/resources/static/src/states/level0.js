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
    var vidaLocal												//Almacena la vida del jugador de forma que se pueda
    																//trabajar sin usar game.player1.vida
    var nivel;														//Almacena todo lo referente al nivel
    var facing_j1='right',facing_j2='left';							//Almacena a dónde apinta el jugador 1 y el jugador 2
    var vida,mana;
    var isHit = false;												//Para controllar si se ha golpeado al enemigo con el hechizo

    
    
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
            game.global.player1.y = mago_izquierda.body.y
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
         
        
       
         //---------------------ELEMENTOS BÁSICOS DEL NIVEL------------------------//
        background= game.add.sprite(0,0,'background');						//Asignamos el background a su variable
        nivel=this.add.tilemap('nivel0',16,16);								//   ""    el tilemap  ""
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
       	 /*vida=new Phaser.Rectangle(25,25,game.global.player1.vida,20);
       	 mana=new Phaser.Rectangle(25,50,game.global.player1.mana,20);*/
       	 vidaUI = game.add.text(game.world.centerX-300,25,'Vida: '+game.global.player1.vida,{font:"20px Arial",fill:"#08FF00",align:"center"})
       	 vidaUI.anchor.setTo(0.5,0.5)
       	 manaUI = game.add.text(game.world.centerX-300,50,'Mana: '+game.global.player1.mana,{font:"20px Arial",fill:"#00F3FF",align:"center"})
       	 manaUI.anchor.setTo(0.5,0.5)
        }else if (game.global.player1.id == 1){
       	 /*vida=new Phaser.Rectangle(650,25,game.global.player1.vida,20);
       	 mana=new Phaser.Rectangle(650,50,game.global.player1.mana,20);*/
         vidaUI = game.add.text(game.world.centerX+300,25,'Vida: '+game.global.player1.vida,{font:"20px Arial",fill:"#08FF00",align:"center"})
       	 vidaUI.anchor.setTo(0.5,0.5)
       	 manaUI = game.add.text(game.world.centerX+300,50,'Mana: '+game.global.player1.mana,{font:"20px Arial",fill:"#00F3FF",align:"center"})
       	 manaUI.anchor.setTo(0.5,0.5)
        }
        
        vidaLocal = game.global.player1.vida;										//Igualamos la vidaLocal a la vida de player1
        
        game.physics.enable(game.global.player1.image,Phaser.Physics.ARCADE);					//Asignamos las físicas arcade al juego
        
        //---------------------------------Cogemos la posición inicial del jugador 2
       
        
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
        if(game.global.player1.id == 0){
        	game.global.hechizo1.image =game.add.sprite(game.global.player1.x,game.global.player1.y+10,'hechizoverde');
        }else if(game.global.player1.id == 1){
        	game.global.hechizo1.image =game.add.sprite(game.global.player1.x,game.global.player1.y+10,'hechizo');
        }
    	
    	game.physics.enable(game.global.hechizo1.image,Phaser.Physics.ARCADE);
    	game.global.hechizo1.image.visible=false;
		//Obtenemos el hechizo del jugador enemigo
        /*this.getHechizo(function(hechizo2Data){
        	game.hechizo2 = JSON.parse(JSON.stringify(hechizo2Data));
        	hechizo2=game.add.sprite(game.player2.x,game.player2.y,'hechizo2');
        	hechizo2.visible=false;
        	//console.log("Informacion el hechizo: "+JSON.stringify(game.hechizo2));
        })*/
        
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
    	//Muerte por caida
    	if(game.global.player1.image.body.y>540){
    		game.global.player1.vida=0;
    	}
    	
    	if(game.global.player1.vida <= 0){
    		this.game.state.start('endingState')
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
    	//------------------------------BARRAS DE VIDA Y MANÁ-----------------------------------//
    	//Volvemos a pintar las barras con las variables actualizadas
    	/*game.debug.geom(vida,'rgba(0,255,0,1)');									//Vida
    	game.debug.geom(vida2,'rgba(0,255,0,1)');
        	
        game.debug.geom(mana,'rgba(0,0,255,1)');									//Maná
        game.debug.geom(mana2,'rgba(0,0,255,1)');*/
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

        

        if (fire2Button.isDown && hechizoTempo>3)
        {
            hechizoTempo=0;															//Se reinicia el temporizador del hechizo
            if(game.global.player1.mana>0){
                fireHechizo();														//Función de disparo del hechizo
                game.global.player1.mana-=spellCost;
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
        /*var micolision=game.physics.arcade.collide(game.global.player1.image,game.global.hechizo2.image);				//Colisión del jugador con el hechizo enemigo almacenado en un boolean
        var hit = game.physics.arcade.collide(game.global.hechizo1.image,game.global.player2.image);
        
        if(hit){
        	console.log('hola')
        	//game.global.hechizo1.image.visible = false;
        }
        //console.log(micolision);
        if(micolision){																		//Si han colisionado el hechizo tiene efecto
        	console.log("yes");
        	//game.global.hechizo2.image.visible = false;
        	game.global.player1.vida-=20;
        }*/

        game.physics.arcade.collide(game.global.player1.image,layer,colisionMapaMagoVerde,null,this);			//Activa la colisión entre el mapa y el mago
        game.physics.arcade.collide(game.global.player2.image,layer,colisionMapaMagoVerde,null,this);
        
        game.physics.arcade.overlap(game.global.hechizo1.image,game.global.player2.image,collisionHandler,null,this)
        
        function collisionHandler(hechizo,player2){
        	game.global.hechizo1.image.kill();
        	isHit = true;
        }
        
        
        
        hechizoTempo+=0.05;																	//Aumenta la cuenta del temporizador del hechizo

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
        
        isHit = false;
    },
    
    

}