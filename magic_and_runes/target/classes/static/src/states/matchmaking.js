MagicAndRunes.matchmakingState = function(game){

}
var jugadores = 0;

MagicAndRunes.matchmakingState.prototype = {

    init: function(){
        this.getNumPlayers(function(numero_jugadores){
            if(numero_jugadores.length > 1){
                console.log("El servidor esta lleno\n Vuelva a intentarlo mas tarde");
                game.state.start("menuState");
            }
        })
    },

    preload: function() {
       var text = "Esperando jugadores\n Jugadores conectados: ";
       var style = {font: "20px Times New Roman", fill: "#FFFFFF", align: "center"};
    },

    create: function() {
        this.createPlayer();
    },

    update: function(){
        this.getNumPlayers(function(numero_jugadores){
            if(numero_jugadores===2){
                game.state.start('level0State');
            }
        })
    },


    getNumPlayers: function (callback){
        $.ajax({
            url: 'http://localhost:8080/game',
        }).done(function(data){
            callback(data);
        })
    },

    createPlayer: function(){
        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/game',
            processData: false,
            headers:{
                "Content-Type":"application/json"
            }
        }).done(function(data){
            console.log("Jugador creado: " + JSON.stringify(data));
            game.player1=data;
        })
    }
}
