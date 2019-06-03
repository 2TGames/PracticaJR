MagicAndRunes.pantalla_cargaState = function(game) {

}
var play;																			//Creamos una variable play que igualada a true nos lleve al estado "menuState" 
var distance = 300;
var speed = 4;
var stars;

var max = 200;
var xx = [];
var yy = [];
var zz = [];																		

MagicAndRunes.pantalla_cargaState.prototype = {

    preload: function() {
    	
    },

    create: function() {
    	//-----------------------FONDO--------------------------------------------//
        var pantalla_inicio=game.add.image(0,0,'match');
        
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
        
        var titulo = game.add.sprite(game.world.centerX, game.world.centerY,'titulo')
        titulo.anchor.setTo(0.5,0.5)
        
        
        //-----------------TEXTO--------------------------------------------------//
        //Creamos el texto "Pulsa espacio para continuar" en amarillo en la parte inferior de la pantalla
        //play será el identificador de la barra espaciadora.
        var texto = game.add.text(240,550,"Pulsa espacio para continuar",{font:"25px Arial", fill:"#FFBF00",align:"center"});
        this.play=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
    	//Si la barra espaciadora se pulsa, cambiaremos al estado "menuState"
    	if(this.play.isDown){
           this.state.start("menuState");
    	}
    }
}