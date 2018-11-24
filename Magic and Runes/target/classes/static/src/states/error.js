CatCatcher.errorState = function(game) {

}
var play;																			//Creamos una variable play que igualada a true nos
																					//lleve al estado "menuState" 

CatCatcher.errorState.prototype = {

    preload: function() {
        game.load.image('fondo','assets/images/menu_principal/fondo_error.png');
    },

    create: function() {
    	
    	//------------MUSICA------------------------------------------------------//
    	//Destruimos la canción del menú principal (NoN). 
    	//Esto se hace para no acumular la canción repitiéndose cada vez que vayamos 
    	//de la ayuda al menú principal, ya que se inicia una nueva canción sin que 
    	//se elimine la anterior.
        music.destroy();
        game.cache.removeSound('NoN');

        //-----------------------FONDO--------------------------------------------//    
        var pantalla_inicio=game.add.image(0,0,'fondo');
        
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