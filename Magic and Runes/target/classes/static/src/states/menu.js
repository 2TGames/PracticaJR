CatCatcher.menuState = function(game) {

}

var music;											//Almacena toda la música que sonará en el juego

var temporizador_runa=0;							//Creamos una variable que cuente las iteraciones de Update 
													//para medir el tiempo que transcurre entre el cambio de una 
													//runa a otra.

//Si se inicia la función jugar, el estado actual pasará a ser "matchmakingState"
function jugar() {
    this.state.start("matchmakingState");			
}

//Si se inicia la función ayu, el estado actual pasará a ser "ayudaState"
function ayu() {
    this.state.start("ayudaState");
}

//Si se inicia la función err, el estado actual pasará a ser "errorState"
function err() {
    this.state.start("errorState");
}

CatCatcher.menuState.prototype = {

    preload: function() {
    	//-----------------------CARGA DE IMÁGENES--------------------------------------//
    	//----------------------Fondo
        game.load.image('fondo','assets/images/menu_principal/fondo_menu.png');
        //----------------------Halos
        game.load.image('halo_negro','assets/images/menu_principal/halo_negro.png');
        game.load.image('halo_rojo','assets/images/menu_principal/halo_rojo.png');
        game.load.image('halo_verde','assets/images/menu_principal/halo_verde.png');
        game.load.image('halo_azul','assets/images/menu_principal/halo_azul.png');
        game.load.image('halo_naranja','assets/images/menu_principal/halo_naranja.png');
        //----------------------Runas
        game.load.image('runa_1','assets/runas/runas_separadas/runa_1.png');
        game.load.image('runa_2','assets/runas/runas_separadas/runa_2.png');
        game.load.image('runa_3','assets/runas/runas_separadas/runa_3.png');
        game.load.image('runa_4','assets/runas/runas_separadas/runa_4.png');
        game.load.image('runa_5','assets/runas/runas_separadas/runa_5.png');
        game.load.image('runa_6','assets/runas/runas_separadas/runa_6.png');
        game.load.image('runa_7','assets/runas/runas_separadas/runa_7.png');
        game.load.image('runa_8','assets/runas/runas_separadas/runa_8.png');
        game.load.image('runa_9','assets/runas/runas_separadas/runa_9.png');

        //-----------------------------CARGA DE MÚSICA-----------------------------------//
        game.load.audio('NoN', 'assets/music/now-or-never.mp3');

    },

    create: function() {
    	
    	//---------------------------IMÁGENES--------------------------------------------//
    	//Almacenamos el feondo en una variable y la primera runa en otra
        var fondo=game.add.image(0,0,'fondo');
        var runa=game.add.sprite(game.world.centerX - 15, game.world.centerY,'runa_1');

        //----------------------------------BOTONES--------------------------------------//
        //Creamos los 5 botones, asignándole a cada un un sprite (halos), una posición y una funciòn
        buttonBlack = game.add.button(340,80, 'halo_negro', jugar, this, 0);		//Pos: (340,80); llama a "jugar()"
        buttonGreen = game.add.button(170,204, 'halo_verde', ayu, this, 0);			//Pos: (170,204); llama a "ayu()"
        buttonRed = game.add.button(520,204, 'halo_rojo', err, this, 0);			//Pos: (520,204); llama a "err()"
        buttonBlue = game.add.button(230,404, 'halo_azul', err, this, 0);			//Pos: (230,404); llama a "err()"
        buttonOrange = game.add.button(455,404, 'halo_naranja', err, this, 0);		//Pos: (455,404); llama a "err()"

        //----------------------------MÚSICA----------------------------------------------//
        //Introducimos la música del menú principal (NoN) en la variable vacía reservada 
        //para ese fin (music)
        music = game.add.audio('NoN');
        music.play();


    },

    update: function() {
    	//Cambiamos de runa a intervalos de 30 sumas del temporizador
        if(temporizador_runa<30){
            runa=game.add.sprite(game.world.centerX - 15, game.world.centerY,'runa_1');
        }else if(temporizador_runa<60){
            runa=game.add.sprite(game.world.centerX - 15, game.world.centerY,'runa_2');
        }else if(temporizador_runa<90){
            runa=game.add.sprite(game.world.centerX - 15, game.world.centerY,'runa_3');
        }else if(temporizador_runa<120){
            runa=game.add.sprite(game.world.centerX - 15, game.world.centerY,'runa_4');
        }else if(temporizador_runa<150){
            runa=game.add.sprite(game.world.centerX - 15, game.world.centerY,'runa_5');
        }else if(temporizador_runa<180){
            runa=game.add.sprite(game.world.centerX - 15, game.world.centerY,'runa_6');
        }else if(temporizador_runa<210){
            runa=game.add.sprite(game.world.centerX - 15, game.world.centerY,'runa_7');
        }else if(temporizador_runa<240){
            runa=game.add.sprite(game.world.centerX - 15, game.world.centerY,'runa_8');
        }else if(temporizador_runa<270){
            runa=game.add.sprite(game.world.centerX - 15, game.world.centerY,'runa_9');
        }else if(temporizador_runa<300){
            runa=game.add.sprite(game.world.centerX - 15, game.world.centerY,'runa_1');
            temporizador_runa=0;//Al llegar a 30 sumas del temporizador en la última runa, 
            					//reiniciamos el temporizador
        }
        temporizador_runa++;  	//Sumamos 1 al temporizador, volviendo al principio de update
    }
}