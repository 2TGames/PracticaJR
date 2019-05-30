game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv')   			//Creación del lienzo

game.global = {
	player1: new Object(),											//Creacion del jugador 1
	hechizo1: new Object(),											//Creación del hechizo 1
	player2: new Object(),													//Creacion del jugador 2
	hechizo2: new Object(), 													//Creación del hechizo 2
	facing:0,
	numPlayers: 0,													//Número de jugadores
	gameReady: 0,
	playerReady: 0,
	wsReady: 0
	
}

debug={
	ws:1
}
var ws = new WebSocket('ws://'+window.location.host+'/game')


//--------------------------AÑADIMOS AL JUEGO TODOS LOS ESTADOS----------------------------//
game.state.add('bootState', MagicAndRunes.bootState)
game.state.add('preloadState', MagicAndRunes.preloadState)
game.state.add('pantalla_cargaState', MagicAndRunes.pantalla_cargaState)
game.state.add('menuState', MagicAndRunes.menuState)
game.state.add('matchmakingState', MagicAndRunes.matchmakingState)
game.state.add('level0State', MagicAndRunes.level0State)
game.state.add('endingState', MagicAndRunes.endingState)
game.state.add('errorState', MagicAndRunes.errorState)
game.state.add('ayudaState', MagicAndRunes.ayudaState)
game.state.add('codex_menuState', MagicAndRunes.codex_menuState)
//-----------------Empezamos por el estado "bootState"
game.state.start('bootState')


ws.onopen = function(event){
	if(debug.ws){
		console.log('[DEBUG-WS] Se ha establecido la conexion');
	}
}

ws.onmessage = function(message){
	if(debug.ws){
		//console.log('[DEBUG-WS] Se ha producido un mensaje: ' + message.data);
	}
	var msg = JSON.parse(message.data);
	console.log('INFO RECIBIDA '+msg.event);
	switch(msg.event){
	case "JOIN":
		console.log('Conexion stablished, player created')
		game.global.player1.id = msg.id
		game.global.player1.vida = msg.vida
		game.global.player1.mana = msg.mana
		game.global.player1.x = msg.x
		game.global.player1.y = msg.y
		game.global.player1.facing = msg.facing
		console.log(game.global.player1)
		break
	/*case "PLAYER_CREATED":
		console.log("******PLAYER CREATED******");
		console.log("id: "+msg.id);
		game.player1 = msg.player;
		console.log(game.player1);
		break;*/
	case "MAX_PLAYERS":
		console.log("El servidor esta lleno, vuelve a intentarlo mas tarde");
		break;
	case "ENOUGH":
		console.log("Empieza la partida");
		game.global.gameReady=1;
		break;
	case "WAIT":
		console.log("Faltan jugadores");
		break;
	case "UPDATED":
		
		if(typeof game.global.player1.image !== 'undefined'){
			console.log(msg.player)
			if(game.global.player1.id == msg.player.id){
				game.global.player1.vida = msg.player.vida
				game.global.player1.mana = msg.player.mana
				game.global.player1.x = msg.x
				game.global.player1.y = msg.y
				game.global.player1.facing = msg.facing
			}else{
				if(typeof game.global.player2.id == 'undefined'){
					game.global.player2.id = msg.player.id
					if(game.global.player1.image.key == 'mago_verde'){
						game.global.player2.image = game.add.sprite(msg.player.x,msg.player.y,'mago_naranja')
					}else if(game.global.player1.image.key == 'mago_naranja'){
						game.global.player2.image = game.add.sprite(msg.player.x,msg.player.y,'mago_verde')
					}
					game.global.player2.image.animations.add('left',[0,1,2,3,4,5,6,7,8],10,true);
			        game.global.player2.image.animations.add('right',[9,10,11,12,13,14,15,16,17],10,true);
			        if(game.global.player2.id == 0){
			        	game.global.player2.image.frame=9;
			        }else if(game.global.player2.id == 1){
			        	game.global.player2.image.frame = 0;
			        }
					//game.global.player2.image.anchor.setTo(0.5,0.5)
					game.physics.enable(game.global.player2.image,Phaser.Physics.ARCADE);
					game.global.player2.image.body.gravity.y=500;											//Gravedad asignada al mago
			        game.global.player2.image.body.bounce.y=0.1;
					game.global.player2.vida = msg.player.vida
					game.global.player2.mana = msg.player.mana
					game.global.player2.image.x = msg.player.x
					game.global.player2.image.y = msg.player.y
					game.global.player2.image.body.velocity.x = msg.player.velocityX
					game.global.player2.image.body.velocity.y = msg.player.velocityY
					console.log(msg.player.facing)
					if(msg.player.facing == -1){
						game.global.player2.facing = -1
						game.global.facing = -1
						game.global.player2.image.animations.play('left');	
					}else if(msg.player.facing == 1){
						game.global.player2.facing = 1
						game.global.facing = 1
						game.global.player2.image.animations.play('right');
					}else{
						if(msg.player.facing == 0){
							game.global.player2.image.animations.stop();
							if(game.global.facing == 1){
								game.global.player2.image.frame = 9
							}else{
								game.global.player2.image.frame = 0
							}
						}
					}
				}else{
					game.global.player2.id = msg.player.id
					if(game.global.player2.id == 0){
						game.global.player2.image.frame = 9
					}else if(game.global.player2.id == 1){
						game.global.player2.image.frame = 0
					}
					game.global.player2.vida = msg.player.vida
					game.global.player2.mana = msg.player.mana
					game.global.player2.image.x = msg.player.x
					game.global.player2.image.y = msg.player.y
					game.global.player2.image.body.velocity.x = msg.player.velocityX
					game.global.player2.image.body.velocity.y = msg.player.velocityY
					console.log(msg.player.facing)
					if(msg.player.facing == -1){
						game.global.player2.facing = -1
						game.global.facing = -1
						game.global.player2.image.animations.play('left');	
					}else if(msg.player.facing == 1){
						game.global.player2.facing = 1
						game.global.facing = 1
						game.global.player2.image.animations.play('right');
					}else{
						if(msg.player.facing == 0){
							game.global.player2.image.animations.stop();
							if(game.global.facing == 1){
								game.global.player2.image.frame = 9
							}else{
								game.global.player2.image.frame = 0
							}
						}
					}
				}
			}
		}
		console.log('Jugador actualizado');
		console.log(game.global.player2);
		break;
	case "SPELL_UPDATED":
		if(typeof game.global.hechizo1.image!='undefined'){
			if(typeof game.global.hechizo2.image=='undefined'){
				if(game.global.player1.image.key == 'mago_verde'){
					game.global.hechizo2.image = game.add.sprite(msg.x,msg.y,'hechizo')
				}else if(game.global.player1.image.key == 'mago_naranja'){
					game.global.hechizo2.image = game.add.sprite(msg.x,msg.y,'hechizoverde')
				}
				game.global.hechizo2.image.anchor.setTo(0.5,0.5)
				game.physics.enable(game.global.hechizo2.image,Phaser.Physics.ARCADE)
				game.global.hechizo2.image.x = msg.x
				game.global.hechizo2.image.y = msg.y
				game.global.hechizo2.image.visible = msg.visible
				game.global.hechizo2.image.body.velocity.x = msg.velocityX
				game.global.hechizo2.image.body.velocity.y = msg.velocityY
			}else{
				game.global.hechizo2.image.x = msg.x
				game.global.hechizo2.image.y = msg.y
				game.global.hechizo2.image.visible = msg.visible
				game.global.hechizo2.image.body.velocity.x = msg.velocityX
				game.global.hechizo2.image.body.velocity.y = msg.velocityY
			}
		}
		
		break;
	}
}

ws.onerror = function(error){
	console.log('Se ha producido un error');
}

ws.onclose = function(event){
	if(debug.ws){
		console.log('[DEBUG-WS] Se ha cerrado la conexion');
	}
}


