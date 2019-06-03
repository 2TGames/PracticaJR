MagicAndRunes.matchmakingState = function (game) {
	 
}


var jugadores = 0;
var distance = 300;
var speed = 4;
var stars;

var max = 200;
var xx = [];
var yy = [];
var zz = [];

MagicAndRunes.matchmakingState.prototype = {
	 
	// Obtenemos el número de jugadores creados con this.getNumPlayers. Si ya hay 
	// suficientes jugadores, echa al menú al jugador para que lo vuelva a intentar.
	
		
    preload: function () {
    	
    	
    },

    // en CREATE, a pesar de estar bastante lejos de INIT, puede dar tiempo a que se cree el jugador
    // ya que this.getNumPlayers puede haberse ejecutado en su totalidad (a falta del DONE) y Phaser
    // sigue con la ejecución de PRELOAD y de CREATE. ¡¡¡ Esa es una de las claves.!!!
    create: function () {
    	
    	var match=game.add.image(0,0,'match');
    	
    	if(game.renderType === Phaser.WEBGL){
        	max == 2000
        }
        
        var sprites = game.add.spriteBatch();
        stars = []
        
        for(var i = 0; i < max; i++){
        	xx[i] = Math.floor(Math.random() * 800)-400
        	yy[i] = Math.floor(Math.random()*600)-300
        	zz[i] = Math.floor(Math.random()*1700) - 100
        	
        	var star = game.make.sprite(0,0,'star')
        	star.anchor.setTo(0.5);
        	
        	sprites.addChild(star);
        	
        	stars.push(star);
        }
        
        var text = "Esperando a otro jugador...";
        var style = { font: "20px Arial", fill: "#FFBF00", align: "center" };
        var t = game.add.text(game.world.centerX - 350, game.world.centerY+250, text, style);
    	
    	
    },

    // Una vez hay suficientes jugadores, se pasa a levelState. El problema de no hacer en INIT
    // el this.createPlayer, haciendo un ELSE de si puede crear jugadores, es que va tan rápido,
    // que antes de haber comprobado si más de 1 jugador ya conectado, llega aquí y te dice que hay ya 2.
    // Por eso el comprobador de >1 y que en el MENÚ revise si hay un jugador sobrante creado para eliminar.
    
    
   
    update: function () {
    	
    	for(var i = 0; i < max; i++){
    		stars[i].perspective = distance / (distance - zz[i])
    		stars[i].x = game.world.centerX + xx[i] * stars[i].perspective;
    		stars[i].y = game.world.centerY + yy[i] * stars[i].perspective;
    		
    		zz[i] += speed;
    		
    		if(zz[i] > 290){
    			zz[i] -= 600
    		}
    		
    		stars[i].alpha = Math.min(stars[i].perspective/2,1)
    		stars[i].scale.set(stars[i].perspective/2)
    		stars[i].rotation += 0.1
    	}
    	
    	mensaje = {
    			event:'PLAYERS'
    	}
    	ws.send(JSON.stringify(mensaje));
    	
    	if(game.global.gameReady==1){
    		this.state.start("level0State");
    	}
    	
    }, 
    
    
}