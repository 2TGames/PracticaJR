game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv')   			//Creación del lienzo

game.global = {
	player1: null,													//Creación del jugador 1
	player2: null,													//Creación del jugador 2
	hechizo1:null,													//Creación del hechizo 1
	hechizo2:null,													//Creación del hechizo 2
	numPlayers: 0													//Número de jugadores
}

//--------------------------AÑADIMOS AL JUEGO TODOS LOS ESTADOS----------------------------//
game.state.add('bootState', CatCatcher.bootState)
game.state.add('preloadState', CatCatcher.preloadState)
game.state.add('pantalla_cargaState', CatCatcher.pantalla_cargaState)
game.state.add('menuState', CatCatcher.menuState)
game.state.add('matchmakingState', CatCatcher.matchmakingState)
game.state.add('level0State', CatCatcher.level0State)
game.state.add('endingState', CatCatcher.endingState)
game.state.add('errorState', CatCatcher.errorState)
game.state.add('ayudaState', CatCatcher.ayudaState)
//-----------------Empezamos por el estado "bootState"
game.state.start('bootState')
