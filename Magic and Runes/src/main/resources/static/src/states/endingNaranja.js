MagicAndRunes.endingStateNaranja = function(game) {

}
var mKey;
var distance = 300;
var speed = 4;
var stars;

var max = 200;
var xx = [];
var yy = [];
var zz = [];
MagicAndRunes.endingStateNaranja.prototype = {

	// Elimina el cazador que ha creado este cliente.
	init: function() {
		
	},
	
	// Habría que hacer pequeños cambios para indicar que ha ganado uno u otro la partida.
    preload: function() {
    	

    },

    create: function() {
    	
    	var fin=game.add.image(0,0,'match');
        
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
        
        if(game.global.player1.id == 0){
    		var defeat = game.add.text(game.world.centerX,game.world.centerY, "DERROTA",{font:"40px Arial",fill:"#00FF1E",align:"center"})
    		defeat.anchor.setTo(0.5,0.5)
    	}else if(game.global.player1.id == 1){
    		var victory = game.add.text(game.world.centerX,game.world.centerY,"VICTORIA",{font:"40px Arial",fill:"#FF8000",align:"center"})
    		victory.anchor.setTo(0.5,0.5)
    	}

        
        var text = "M para volver al menu";
        var style = { font: "20px Arial", fill: "#FFBF00", align: "center" };
        var t = game.add.text(game.world.centerX, game.world.centerY+200, text, style);
        t.anchor.setTo(0.5,0.5)
    	//eliminamos la música para que no se superponga a la del menú de inicio
    	music.destroy();
    	game.cache.removeSound('ATA');
    	
        //Iniciamos tecla 'm'
        this.mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    },

    update: function() {
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
    	
        if(this.mKey.isDown){
            game.state.start('menuState');
        }
    }
}