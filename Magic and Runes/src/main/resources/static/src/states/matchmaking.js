MagicAndRunes.matchmakingState = function (game) {
	 
}

var ws;


MagicAndRunes.matchmakingState.prototype = {
	 
	// Obtenemos el número de jugadores creados con this.getNumPlayers. Si ya hay 
	// suficientes jugadores, echa al menú al jugador para que lo vuelva a intentar.
	init: function () {
		//console.log(ws);
	 ws = new WebSocket('ws://'+window.location.host+'/game');
		
	},
		
    preload: function () {
    	
    	var match=game.add.image(0,0,'match');
        var text = "Esperando a otro jugador...";
        var style = { font: "20px Arial", fill: "#FFBF00", align: "center" };
        var t = game.add.text(game.world.centerX - 350, game.world.centerY+250, text, style);
    },

    // en CREATE, a pesar de estar bastante lejos de INIT, puede dar tiempo a que se cree el jugador
    // ya que this.getNumPlayers puede haberse ejecutado en su totalidad (a falta del DONE) y Phaser
    // sigue con la ejecución de PRELOAD y de CREATE. ¡¡¡ Esa es una de las claves.!!!
    create: function () {
    	
    	//ws;
    	console.log('llega a onopen');
		ws.onopen = function(event){
			console.log('entra en onopen');
			if(debug.ws){
				console.log('[DEBUG-WS] Se ha establecido la conexion');
			}
			data = {
					type:'JOIN'
			}
			numPlayers = {
					type:'PLAYERS'
			}
			this.send(JSON.stringify(data));
			this.send(JSON.stringify(numPlayers));
			console.log("Se ha enviado el mensaje: " +data.type);
			console.log('Se ha enviado el mensaje: ' + numPlayers.type);
		}
    	
    	
    	/*ws.onmessage = function(message){
    		console.log('entra a onmessage');
    		if(debug.ws){
    			console.log('[DEBUG-WS] Se ha producido un mensaje: ' + message.data);
    		}
    		
    		var msg = JSON.parse(message.data);
    		
    		console.log('INFO RECIBIDA ' + message.data);
    		switch(msg.type){
    		case "PLAYER_CREATED":
    			console.log("*****PLAYER CREATED*******");
    			console.log("id: "+msg.player.id);
    			console.log("pos("+msg.player.x+","+msg.player.y+")");
    			jugadores++;
    			break;
    			
    		case "MAX PLAYERS":
    			console.log('El servidor esta lleno, vuelva a intentarlo mas tarde');
    			break;
    		}
    	}*/
    	
    	ws.onerror= function(error){
    		console.log('Se ha producido un error: ' + error);
    	}
    	
    	ws.onclose = function(event){
    		if(debug.ws){
    			console.log('[DEBUG-WS] Se ha cerrado la conexion');
    		}
    	}
    },

    // Una vez hay suficientes jugadores, se pasa a levelState. El problema de no hacer en INIT
    // el this.createPlayer, haciendo un ELSE de si puede crear jugadores, es que va tan rápido,
    // que antes de haber comprobado si más de 1 jugador ya conectado, llega aquí y te dice que hay ya 2.
    // Por eso el comprobador de >1 y que en el MENÚ revise si hay un jugador sobrante creado para eliminar.
   
    update: function () {
    	//ws = new WebSocket('ws://'+window.location.host+'/game');
    	/*console.log('entra en update');
    	ws.onopen = function(event){
			if(debug.ws){
				console.log('Se comprueba el numero de jugadores');
			}
			numPlayers = {
					type:'NUM_PLAYERS'
			}
			this.send(JSON.stringify(numPlayers));
			console.log('Se ha enviado el mensaje: '+numPlayers.type);
    	}*/
    	
    	ws.onmessage = function(message){
    		console.log('entra a onmessage');
    		if(debug.ws){
    			console.log('[DEBUG-WS] Se ha producido un mensaje: ' + message.data);
    		}
    		
    		var msg = JSON.parse(message.data);
    		
    		console.log('INFO RECIBIDA ' + message.data);
    		switch(msg.type){
    		case "PLAYER_CREATED":
    			console.log("*****PLAYER CREATED*******");
    			console.log("id: "+msg.player.id);
    			console.log("pos("+msg.player.x+","+msg.player.y+")");
    			break;
    			
    		case "MAX PLAYERS":
    			console.log('El servidor esta lleno, vuelva a intentarlo mas tarde');
    			break;
    			
    		case "ENOUGH":
    			console.log('Empieza la partida');
    			break;
    			
    		case "EXCEED":
    			console.log('El servidor esta lleno, vuelva a intentarlo mas tarde');
    			break;
    			
    		case "WAIT":
    			console.log('Faltan jugadores');
    			break;
    		}
    		
    		if(msg.numJugadores == 2){
    			game.state.start("level0State")
    		}else if(msg.numJugadores > 2){
    			game.state.start("menuState");
    		}
    		
    		
    	}
    	
    	/*console.log('entra en update');
    	var conexion = new WebSocket('ws://'+window.location.host+'/game')
    	conexion.onopen = function (event){
    		numPlayers = {
    				type:'NUM_PLAYERS'
    		}
    			this.send(JSON.stringify(numPlayers));
    			console.log('Se ha enviado el mensaje ' + numPlayers.type);
    	}
    	
    	conexion.onmessage = function(message){
    		var msg = JSON.parse(message.data);
    		
    		console.log('INFO RECIBIDA '+ message.data);
    		switch(msg.type){
    		case "ENOUGH":
    			console.log('Empieza el juego');
    			this.state.start("level0State");
    			break;
    		case "EXCEED":
    			console.log('El servidor esta lleno, vuelva a intentarlo mas tarde');
    			this.state.start("menuState");
    		}
    	}*/
    }, 
    
}