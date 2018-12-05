MagicAndRunes.matchmakingState = function (game) {

}

MagicAndRunes.matchmakingState.prototype = {
	
	// Obtenemos el número de jugadores creados con this.getNumPlayers. Si ya hay 
	// suficientes jugadores, echa al menú al jugador para que lo vuelva a intentar.
	init: function () {
		this.getNumPlayers(function (numPlayers) {
			if (numPlayers.length > 1) {
				console.log ('= El servidor está lleno. Vuelve a intentarlo más tarde. =');
				game.state.start('menuState');
			}
		});
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
    	this.createPlayer();
    	this.createHechizo();
    },

    // Una vez hay suficientes jugadores, se pasa a levelState. El problema de no hacer en INIT
    // el this.createPlayer, haciendo un ELSE de si puede crear jugadores, es que va tan rápido,
    // que antes de haber comprobado si más de 1 jugador ya conectado, llega aquí y te dice que hay ya 2.
    // Por eso el comprobador de >1 y que en el MENÚ revise si hay un jugador sobrante creado para eliminar.
    update: function () {
		this.getNumPlayers(function (numPlayers) {
			if (numPlayers.length === 2) {
				console.log ('##### COMIENZA EL JUEGO #####');
				game.state.start('level0State');
			}
		});
    }, 
    
    getNumPlayers: function (callback) {
        $.ajax({
            url: '/game',
        }).done(function (data) {
            callback(data);
        })
    },
    
    createPlayer: function () {
        $.ajax({
            method: "POST",
            url: '/game',
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
        }).done(function (data) {
            console.log("Player created: " + JSON.stringify(data));
            game.player1 = data;
        })
    },
    
    createHechizo(){
    	$.ajax({
    		method:"POST",
        	url:'/hechizo',
        	processData:false,
        	headers:{
        		"Content-Type":"application/json"
        	}
    	}).done(function(data){
    		console.log("Hechizo creado: " + JSON.stringify(data));
    		game.hechizo1 = data;
    	})
    },
}