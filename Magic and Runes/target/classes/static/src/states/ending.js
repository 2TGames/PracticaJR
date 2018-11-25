CatCatcher.endingState = function(game) {

}
var mKey;
CatCatcher.endingState.prototype = {

	// Elimina el mago que ha creado este cliente.
	init: function() {
		if (game.player1 != null) {
			$.ajax({
	            method: "DELETE",
	            url: 'http://10.0.49.165:8080/game/' + game.player1.id,
	            processData: false,
	            headers: {
	                "Content-Type": "application/json"
	            },
	        }).done(function (data) {
	            //console.log("Player removed: " + JSON.stringify(data));
	        })
		}
	},
	
	// Habría que hacer pequeños cambios para indicar que ha ganado uno u otro la partida.
    preload: function() {
        //Indicamos como iniciar partida
        var text = "- Enhorabuena, has terminado -\n Pulse la tecla 'M' \n para volver al menu.";
        var style = { font: "35px Arial", fill: "#0040FF", align: "center" };

        var t = game.add.text(game.world.centerX-200, 0, text, style);

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