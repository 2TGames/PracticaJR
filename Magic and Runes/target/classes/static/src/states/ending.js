MagicAndRunes.endingState = function(game) {

}
var mKey;
MagicAndRunes.endingState.prototype = {

	// Elimina el cazador que ha creado este cliente.
	init: function() {
		mensaje = {
				event:"GAME OVER",
				id:game.global.player1.id
		}
		ws.send(JSON.stringify(mensaje))
	},
	
	// Habría que hacer pequeños cambios para indicar que ha ganado uno u otro la partida.
    preload: function() {
        //Indicamos como iniciar partida
    	var fin=game.add.image(0,0,'match');
        var text = "Fin de partida\n Pulse la tecla 'M' \n para volver al menu.";
        var style = { font: "35px Arial", fill: "#FFBF00", align: "center" };

        var t = game.add.text(game.world.centerX-200, game.world.centerY-100, text, style);

    },

    create: function() {
        //Iniciamos tecla 'm'
        this.mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    },

    update: function() {
        if(this.mKey.isDown){
            game.state.start('menuState');
        }
    }
}