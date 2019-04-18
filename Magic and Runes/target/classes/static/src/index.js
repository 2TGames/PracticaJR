game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv')   			//Creación del lienzo

game.global = {
	player1: null,													//Creación del jugador 1
	player2: null,													//Creación del jugador 2
	hechizo1:null,													//Creación del hechizo 1
	hechizo2:null,													//Creación del hechizo 2
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
	/*data = {
			type:'JOIN'
	}
	this.send(JSON.stringify(data));
	console.log("Se ha enviado el mensaje: " +data.type);*/
	
}

ws.onmessage = function(message){
	if(debug.ws){
		//console.log('[DEBUG-WS] Se ha producido un mensaje: ' + message.data);
	}
	var msg = JSON.parse(message.data);
	console.log('INFO RECIBIDA '+msg.type);
	switch(msg.type){
	case "PLAYER_CREATED":
		console.log("******PLAYER CREATED******");
		console.log("id: "+msg.player.id);
		game.player1 = msg.player;
		console.log(game.player1);
		break;
	case "MAX_PLAYERS":
		console.log("El servidor esta lleno, vuelve a intentarlo mas tarde");
		break;
	case "ENOUGH":
		console.log("Empieza la partida");
		game.gameReady=1;
		break;
	case "WAIT":
		//console.log("Faltan jugadores");
		break;
	case "UPDATED":
		if(msg.player.id!=game.player1.id){
			game.player2 = msg.player;
		}
		
		console.log('Jugador actualizado');
		console.log(game.player2);
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


