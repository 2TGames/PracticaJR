debug = {
		ws:1
}

var ws = new WebSocket('ws://127.0.0.1:8080/game');

ws.onopen = function (event){
	if(debug.ws){
		console.log('[DEBUG-WS] Se ha establecido la conexion con el servidor');
	}
	data = {
			type:'JOIN'
	}
	this.send(JSON.stringify(data));
}

ws.onerror = function(error){
	console.log('[DEBUG-WS] Se ha producido un error: ' + error);
}

ws.onclose= function(event){
	if(debug.ws){
		console.log('[DEBUG-WS] Se ha cerrado la conexion');
	}
}

ws.onmessage = function(message){
	if(debus.ws){
		console.log('[DEBUG-WS] Se ha producido un mensaje: ' + message.data)
	}
	
	var msg = JSON.parse(message.data);
	console.log('INFO RECIBIDA' + msg.type);
	
	switch (msg.type){
	case "PLAYER CREATED" : 
		console.log("***** PLAYER CREATED *****");
		console.log("id: " + msg.player.id);
		console.log("pos ("+msg.player.x+","+msg.player.y+")");
		break;
	case "GAME COMPLETE":
		console.log("*****GAME IS COMPLETE*****");
		break;
	case "UPDATE_STATE":
		console.log("****GAME SENDS UPDATE*****");
		break;
	}
}