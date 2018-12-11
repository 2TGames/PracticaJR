MagicAndRunes.ayudaState = function(game) {

}

//Creamos una función que lleve a menuState, que se activará una vez se pulse
//el botón verde de vuelta al menú principal
function men() {

    this.state.start("menuState");

}

MagicAndRunes.ayudaState.prototype = {

    preload: function() {
        game.load.image('fondo','assets/ayuda/fondo.png');
        game.load.image('halo_verde','assets/images/menu_principal/halo_verde.png');	
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
        var fondo=game.add.image(0,0,'fondo');
        
        //-----------------------------BOTÓN VERDE--------------------------------//
        //En la posición (710, 195), y empleando la imagen 'halo_verde', creamos 
        //un botón que al pulsarlo ejecute la función "men", expuesta arriba.
        buttonGreen = game.add.button(710,195, 'halo_verde', men, this, 0);
        

    },

    update: function() {

    }
}