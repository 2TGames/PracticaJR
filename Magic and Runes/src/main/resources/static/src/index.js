game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv')   			//Creación del lienzo

game.global = {
	player1: new Object(),											//Creacion del jugador 1
	hechizo1: new Object(),											//Creación del hechizo 1
	player2: new Object(),													//Creacion del jugador 2
	hechizo2: new Object(), 													//Creación del hechizo 2
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
			for(var player of msg.players){
				if(game.global.player1.id == player.id){
					game.global.player1.image.x = player.x
					game.global.player1.image.y = player.y
					game.global.player1.vida = player.vida
					game.global.player1.mana = player.mana
				}else{
					if(typeof game.global.player2.id == 'undefined'){
						if(game.global.player1.image.key == 'mago_verde'){
							game.global.player2.image = game.add.sprite(player.x,player.y,'mago_naranja')
						}else if(game.global.player1.image.key == 'mago_naranja'){
							game.global.player2.image = game.add.sprite(player.x,player.y,'mago_verde')
						}
						game.global.player2.image.anchor.setTo(0.5,0.5)
						game.global.player2.x = player.x
						game.global.player2.y = player.y
						game.global.player2.vida = player.vida
						game.global.player2.mana = player.mana
					}else{
						game.global.player2.image.x = player.x
						game.global.player2.image.y = player.y
						game.global.player2.vida = player.vida
						game.global.player2.mana = player.mana
					}
				}
			}
		}
		
		console.log('Jugador actualizado');
		console.log(game.global.player2);
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


