game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv')   			//Creación del lienzo

game.global = {
	player1: new Object(),											//Creacion del jugador 1
	hechizo1: new Object(),											//Creación del hechizo 1
	player2: new Object(),													//Creacion del jugador 2
	hechizo2: new Object(), 													//Creación del hechizo 2
	encantamiento1:new Object(),
	encantamiento2:new Object(),
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
var facing_j2;

//--------------------------AÑADIMOS AL JUEGO TODOS LOS ESTADOS----------------------------//
game.state.add('bootState', MagicAndRunes.bootState)
game.state.add('preloadState', MagicAndRunes.preloadState)
game.state.add('pantalla_cargaState', MagicAndRunes.pantalla_cargaState)
game.state.add('menuState', MagicAndRunes.menuState)
game.state.add('matchmakingState', MagicAndRunes.matchmakingState)
game.state.add('level0State', MagicAndRunes.level0State)
game.state.add('level1State', MagicAndRunes.level1State)
game.state.add('level2State', MagicAndRunes.level2State)
game.state.add('level_1State', MagicAndRunes.level_1State)
game.state.add('level_2State', MagicAndRunes.level_2State)
game.state.add('endingStateNaranja', MagicAndRunes.endingStateNaranja)
game.state.add('endingStateVerde', MagicAndRunes.endingStateVerde)
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
		game.global.player1.id = msg.id
		game.global.player1.vida = msg.vida
		game.global.player1.mana = msg.mana
		game.global.player1.x = msg.x
		game.global.player1.y = msg.y
		game.global.player1.facing = msg.facing
		break;
	case "CREATED":
		game.global.player1.id = msg.id
		game.global.player1.vida = msg.vida
		game.global.player1.mana = msg.mana
		game.global.player1.x = msg.x
		game.global.player1.y = msg.y
		game.global.player1.facing = msg.facing
		break;
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
	case "REMOVE PLAYER":
		game.global.player2.image.destroy();
		game.global.player2.vidaUI.destroy();
		game.global.player2.manaUI.destroy();
		delete game.global.player2;
		if(game.global.player1.id == 0){
			game.state.start('endingStateVerde')
		}else if(game.global.player1 == 1){
			game.state.start('endingStateNaranja')
		}
		break;
	case "UPDATED":
		console.log(msg.player.state)
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
						facing_j2 = 'left'
					}else if(game.global.player1.image.key == 'mago_naranja'){
						game.global.player2.image = game.add.sprite(msg.player.x,msg.player.y,'mago_verde')
						facing_j2 = 'right'
					}
					game.global.player2.image.animations.add('left',[0,1,2,3,4,5,6,7,8],10,true);
			        game.global.player2.image.animations.add('right',[9,10,11,12,13,14,15,16,17],10,true);
			        game.global.player2.facing = msg.player.facing
			        game.global.player2.puntuacion = msg.player.puntuacion
			        //Para asignar el frame correcto segun el id
			        if(game.global.player2.id == 0){
			        	game.global.player2.image.frame=9;
			        }else if(game.global.player2.id == 1){
			        	game.global.player2.image.frame = 0;
			        }
			        
			        
			        //Para las barras de vida y mana segun el id
			        if(game.global.player2.id==0){
			        	 game.global.player2.vidaUI = game.add.text(game.world.centerX-300,25,'Vida: '+game.global.player2.vida,{font:"20px Arial",fill:"#08FF00",align:"center"})
			          	 game.global.player2.vidaUI.anchor.setTo(0.5,0.5)
			          	 game.global.player2.manaUI = game.add.text(game.world.centerX-300,50,'Mana: '+game.global.player2.mana,{font:"20px Arial",fill:"#00F3FF",align:"center"})
			          	 game.global.player2.manaUI.anchor.setTo(0.5,0.5)
			           }else if (game.global.player2.id == 1){
			        	 game.global.player2.vidaUI = game.add.text(game.world.centerX+300,25,'Vida: '+game.global.player2.vida,{font:"20px Arial",fill:"#08FF00",align:"center"})
			          	 game.global.player2.vidaUI.anchor.setTo(0.5,0.5)
			          	 game.global.player2.manaUI = game.add.text(game.world.centerX+300,50,'Mana: '+game.global.player2.mana,{font:"20px Arial",fill:"#00F3FF",align:"center"})
			          	 game.global.player2.manaUI.anchor.setTo(0.5,0.5)
			           }
					//game.global.player2.image.anchor.setTo(0.5,0.5)
					game.physics.enable(game.global.player2.image,Phaser.Physics.ARCADE);
					game.global.player2.image.body.gravity.y=500;											//Gravedad asignada al mago
			        game.global.player2.image.body.bounce.y=0.1;
					game.global.player2.vida = msg.player.vida
					if(game.global.player2.vida <= 0){
						game.global.player1.puntuacion += 1
						if(game.global.player2.image.key == 'mago_naranja'){
							//game.global.hechizo1 = new Object();
							game.global.hechizo2 = new Object();
							game.global.player2 = new Object();
							//game.global.player1 = new Object();
							game.global.encantamiento1 = new Object();
							game.global.encantamiento2 = new Object();
							/*game.global.player2.vidaUI.destroy()
							game.global.player2.manaUI.destroy()
							game.global.player1.vidaUI.destroy()
							game.global.player1.manaUI.destroy()*/
							if(msg.player.state === 'level0'){
								game.state.start('level0State')
							}else if(msg.player.state === 'level1'){
								game.state.start('level1State')
							}else if(msg.player.state === 'level2'){
								game.state.start('level2State')
							}else if(msg.player.state === 'endingStateVerde'){
								game.state.start('endingStateVerde')
							}
						}else if(game.global.player2.image.key == 'mago_verde'){
							//game.global.hechizo1 = new Object();
							game.global.hechizo2 = new Object();
							game.global.player2 = new Object();
							//game.global.player1 = new Object();
							game.global.encantamiento1 = new Object();
							game.global.encantamiento2 = new Object();
							/*game.global.player2.vidaUI.destroy()
							game.global.player2.manaUI.destroy()
							game.global.player1.vidaUI.destroy()
							game.global.player1.manaUI.destroy()*/
							if(msg.player.state === 'level0'){
								game.state.start('level0State')
							}else if(msg.player.state === 'level-1'){
								game.state.start('level_1State')
							}else if(msg.player.state === 'level-2'){
								game.state.start('level_2State')
							}else if(msg.player.state === 'endingStateNaranja'){
								game.state.start('endingStateNaranja')
							}
						}
					}
					
					game.global.player2.mana = msg.player.mana
					game.global.player2.image.x = msg.player.x
					game.global.player2.image.y = msg.player.y
					game.global.player2.image.body.velocity.x = msg.player.velocityX
					game.global.player2.image.body.velocity.y = msg.player.velocityY
					if(msg.player.facing == -1){
						game.global.player2.facing = -1
						game.global.facing = -1
						game.global.player2.image.animations.play('left');	
						facing_j2 = 'left'
					}else if(msg.player.facing == 1){
						game.global.player2.facing = 1
						game.global.facing = 1
						game.global.player2.image.animations.play('right');
						facing_j2 = 'right'
					}else{
						if(msg.player.facing == 0){
							game.global.player2.image.animations.stop();
							if(facing_j2 == 'right'){
								game.global.player2.image.frame = 9
							}else{
								game.global.player2.image.frame = 0
							}
						}
					}
				}else{
					game.global.player2.id = msg.player.id
					//Para las barras de vida y mana segun el id
					
					if(game.global.player1.image.key == 'mago_verde'){
						game.global.player2.image.destroy()
						game.global.player2.vidaUI.destroy()
						game.global.player2.manaUI.destroy()
						game.global.player2.image = game.add.sprite(msg.player.x,msg.player.y,'mago_naranja')
					}else if(game.global.player1.image.key == 'mago_naranja'){
						game.global.player2.vidaUI.destroy()
						game.global.player2.manaUI.destroy()
						game.global.player2.image.destroy()
						game.global.player2.image = game.add.sprite(msg.player.x,msg.player.y,'mago_verde')
					}
					game.global.player2.image.animations.add('left',[0,1,2,3,4,5,6,7,8],10,true);
			        game.global.player2.image.animations.add('right',[9,10,11,12,13,14,15,16,17],10,true);
			        game.global.player2.puntuacion = msg.player.puntuacion
			        //Para asignar el frame correcto segun el id
			        if(game.global.player2.id == 0){
			        	game.global.player2.image.frame=9;
			        }else if(game.global.player2.id == 1){
			        	game.global.player2.image.frame = 0;
			        }
					game.physics.enable(game.global.player2.image,Phaser.Physics.ARCADE);
					
					game.global.player2.vida = msg.player.vida
					game.global.player2.mana = msg.player.mana
					if(game.global.player2.id==0){
			        	 game.global.player2.vidaUI = game.add.text(game.world.centerX-300,25,'Vida: '+game.global.player2.vida,{font:"20px Arial",fill:"#08FF00",align:"center"})
			          	 game.global.player2.vidaUI.anchor.setTo(0.5,0.5)
			          	 game.global.player2.manaUI = game.add.text(game.world.centerX-300,50,'Mana: '+game.global.player2.mana,{font:"20px Arial",fill:"#00F3FF",align:"center"})
			          	 game.global.player2.manaUI.anchor.setTo(0.5,0.5)
			           }else if (game.global.player2.id == 1){
			        	 game.global.player2.vidaUI = game.add.text(game.world.centerX+300,25,'Vida: '+game.global.player2.vida,{font:"20px Arial",fill:"#08FF00",align:"center"})
			          	 game.global.player2.vidaUI.anchor.setTo(0.5,0.5)
			          	 game.global.player2.manaUI = game.add.text(game.world.centerX+300,50,'Mana: '+game.global.player2.mana,{font:"20px Arial",fill:"#00F3FF",align:"center"})
			          	 game.global.player2.manaUI.anchor.setTo(0.5,0.5)
			           }
					game.global.player2.image.x = msg.player.x
					game.global.player2.image.y = msg.player.y
					game.global.player2.image.body.velocity.x = msg.player.velocityX
					game.global.player2.image.body.velocity.y = msg.player.velocityY
					if(msg.player.facing == -1){
						game.global.player2.facing = -1
						game.global.facing = -1
						game.global.player2.image.animations.play('left');	
						facing_j2 = 'left'
					}else if(msg.player.facing == 1){
						game.global.player2.facing = 1
						game.global.facing = 1
						game.global.player2.image.animations.play('right');
						facing_j2 = 'right'
					}else{
						if(msg.player.facing == 0){
							game.global.player2.image.animations.stop();
							if(facing_j2 == 'right'){
								game.global.player2.image.frame = 9
							}else{
								game.global.player2.image.frame = 0
							}
						}
					}
					if(game.global.player2.vida <= 0){
						game.global.player1.puntuacion += 1
						if(game.global.player2.image.key == 'mago_naranja'){
							//game.global.hechizo1 = new Object();
							game.global.hechizo2 = new Object();
							game.global.player2 = new Object();
							//game.global.player1 = new Object();
							game.global.encantamiento1 = new Object();
							game.global.encantamiento2 = new Object();
							/*game.global.player2.vidaUI.destroy()
							game.global.player2.manaUI.destroy()
							game.global.player1.vidaUI.destroy()
							game.global.player1.manaUI.destroy()*/
							if(msg.player.state === 'level0'){
								game.state.start('level0State')
							}else if(msg.player.state === 'level1'){
								game.state.start('level1State')
							}else if(msg.player.state === 'level2'){
								game.state.start('level2State')
							}else if(msg.player.state === 'endingStateVerde'){
								game.state.start('endingStateVerde')
							}
						}else if(game.global.player2.image.key == 'mago_verde'){
							//game.global.hechizo1 = new Object();
							game.global.hechizo2 = new Object();
							game.global.player2 = new Object();
							//game.global.player1 = new Object();
							game.global.encantamiento1 = new Object();
							game.global.encantamiento2 = new Object();
							/*game.global.player2.vidaUI.destroy()
							game.global.player2.manaUI.destroy()
							game.global.player1.vidaUI.destroy()
							game.global.player1.manaUI.destroy()*/
							if(msg.player.state === 'level0'){
								game.state.start('level0State')
							}else if(msg.player.state === 'level-1'){
								game.state.start('level_1State')
							}else if(msg.player.state === 'level-2'){
								game.state.start('level_2State')
							}else if(msg.player.state === 'endingStateNaranja'){
								game.state.start('endingStateNaranja')
							}
						}
					}
				}
			}
		}
		break;
	case "SPELL_UPDATED":
		if(typeof game.global.hechizo1.image!='undefined'){
			if(typeof game.global.hechizo2.image=='undefined'){
				if(game.global.player1.image.key == 'mago_verde'){
					game.global.hechizo2.image = game.add.sprite(msg.x,msg.y,'hechizo')
				}else if(game.global.player1.image.key == 'mago_naranja'){
					game.global.hechizo2.image = game.add.sprite(msg.x,msg.y,'hechizoverde')
				}
				game.physics.enable(game.global.hechizo2.image,Phaser.Physics.ARCADE)
				game.global.hechizo2.image.x = msg.x
				game.global.hechizo2.image.y = msg.y
				game.global.hechizo2.image.visible = msg.visible
				game.global.hechizo2.image.body.velocity.x = msg.velocityX
				game.global.hechizo2.image.body.velocity.y = msg.velocityY
				if(msg.isHit){
					game.global.player1.vida -= 20
				}
			}else{
				if(game.global.player1.image.key == 'mago_verde'){
					game.global.hechizo2.image.destroy()
					game.global.hechizo2.image = game.add.sprite(msg.x,msg.y,'hechizo')
				}else if(game.global.player1.image.key == 'mago_naranja'){
					game.global.hechizo2.image.destroy()
					game.global.hechizo2.image = game.add.sprite(msg.x,msg.y,'hechizoverde')
				}
				game.physics.enable(game.global.hechizo2.image,Phaser.Physics.ARCADE)
				game.global.hechizo2.image.x = msg.x
				game.global.hechizo2.image.y = msg.y
				game.global.hechizo2.image.visible = msg.visible
				game.global.hechizo2.image.body.velocity.x = msg.velocityX
				game.global.hechizo2.image.body.velocity.y = msg.velocityY
				if(msg.isHit){
					game.global.player1.vida -= 20
					
				}
			}
		}
		
		break;
	case "ENCH_UPDATED":
		if(typeof game.global.encantamiento1.image!='undefined'){
			if(typeof game.global.encantamiento2.image == 'undefined'){
				if(game.global.player1.image.key == 'mago_verde'){
					game.global.encantamiento2.image = game.add.sprite(msg.x + 10,msg.y + 30,'nubeNaranja')
				}else if(game.global.player1.image.key == 'mago_naranja'){
					game.global.encantamiento2.image = game.add.sprite(msg.x + 10 ,msg.y + 30,'nubeVerde')
				}
				game.physics.enable(game.global.encantamiento2.image,Phaser.Physics.ARCADE)
				game.global.encantamiento2.image.body.allowGravity = false
				game.global.encantamiento2.image.scale.setTo(0.5,0.5)
				game.global.encantamiento2.image.anchor.setTo(0.5,0.5)
				game.global.encantamiento2.image.visible = msg.visible
				game.global.encantamiento2.image.x = msg.x
				game.global.encantamiento2.image.y = msg.y
				if(msg.isHitEnch){
					game.global.player1.vida -= 60
				}
			}else{
				if(game.global.player1.image.key == 'mago_verde'){
					game.global.encantamiento2.image.destroy()
					game.global.encantamiento2.image = game.add.sprite(msg.x+10,msg.y + 30, 'nubeNaranja')
				}else if(game.global.player1.image.key == 'mago_naranja'){
					game.global.encantamiento2.image.destroy()
					game.global.encantamiento2.image = game.add.sprite(msg.x+10,msg.y + 30, 'nubeVerde')
				}
				game.physics.enable(game.global.encantamiento2.image,Phaser.Physics.ARCADE)
				game.global.encantamiento2.image.body.allowGravity = false
				game.global.encantamiento2.image.scale.setTo(0.5,0.5)
				game.global.encantamiento2.image.anchor.setTo(0.5,0.5)
				game.global.encantamiento2.image.x = msg.x
				game.global.encantamiento2.image.y = msg.y
				game.global.encantamiento2.image.visible = msg.visible
				if(msg.isHitEnch){
					game.global.player1.vida -= 60
				}
			}
		}
		break;
	case "VARIABLES RESETED":
		game.global.player1.vida = msg.vida
		game.global.player1.mana = msg.mana
		game.global.player1.x = msg.x
		game.global.player1.y = msg.y
		game.global.player1.facing = msg.facing
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


