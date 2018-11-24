CatCatcher.pantalla_cargaState = function(game) {

}
var play;																			//Creamos una variable play que igualada a true nos
																					//lleve al estado "menuState" 

CatCatcher.pantalla_cargaState.prototype = {

    preload: function() {
        game.load.image('inicio','assets/images/pantalla_inicio.png');
    },

    create: function() {
    	//-----------------------FONDO--------------------------------------------//
        var pantalla_inicio=game.add.image(0,0,'inicio');
        
        //-----------------TEXTO--------------------------------------------------//
        //Creamos el texto "Pulsa espacio para continuar" en amarillo en la parte inferior de la pantalla
        //play será el identificador de la barra espaciadora.
        var texto = game.add.text(240,500,"Pulsa espacio para continuar",{font:"25px Arial", fill:"#FFE400",align:"center"});
        this.play=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function() {
    	//Si la barra espaciadora se pulsa, cambiaremos al estado "menuState"
    	if(this.play.isDown){
           this.state.start("menuState");
    	}
    }
}