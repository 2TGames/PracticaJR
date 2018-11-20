MagicAndRunes.menuState = function(game) {

}

var music;

function jugar() {

    this.state.start("matchmakingState");

}
function ayu() {

    this.state.start("ayudaState");

}
function err() {

    this.state.start("errorState");

}
var temporizador_runa=0;


MagicAndRunes.menuState.prototype = {

    init: function(){
        $.ajax({
            method: "DELETE",
            url: 'http://localhost/game/' + game.player1.id,
            processData: false,
            headers: {
                "Content-Type":"application/json"
            }
        }).done(function(data){
            console.log("Jugador eliminado: " + JSON.stringify(data));
        })
    },

    preload: function() {
        game.load.image('fondo','assets/images/menu_principal/fondo_menu.png');
        game.load.image('halo_negro','assets/images/menu_principal/halo_negro.png');
        game.load.image('halo_rojo','assets/images/menu_principal/halo_rojo.png');
        game.load.image('halo_verde','assets/images/menu_principal/halo_verde.png');
        game.load.image('halo_azul','assets/images/menu_principal/halo_azul.png');
        game.load.image('halo_naranja','assets/images/menu_principal/halo_naranja.png');
        game.load.image('runa_1','assets/runas/runas_separadas/runa_1.png');
        game.load.image('runa_2','assets/runas/runas_separadas/runa_2.png');
        game.load.image('runa_3','assets/runas/runas_separadas/runa_3.png');
        game.load.image('runa_4','assets/runas/runas_separadas/runa_4.png');
        game.load.image('runa_5','assets/runas/runas_separadas/runa_5.png');
        game.load.image('runa_6','assets/runas/runas_separadas/runa_6.png');
        game.load.image('runa_7','assets/runas/runas_separadas/runa_7.png');
        game.load.image('runa_8','assets/runas/runas_separadas/runa_8.png');
        game.load.image('runa_9','assets/runas/runas_separadas/runa_9.png');

        game.load.audio('NoN', 'assets/music/now-or-never.mp3');
        //game.load.image('fondo','assets/images/fondo magico.png');
    },

    create: function() {
        var fondo=game.add.image(0,0,'fondo');
        var runa=game.add.sprite(game.world.centerX - 15, game.world.centerY,'runa_1');

        /*var halo_negro=game.add.image(340,80,'halo_negro');
        var halo_rojo=game.add.image(520,204,'halo_rojo');
        var halo_verde=game.add.image(170,204,'halo_verde');
        var halo_azul=game.add.image(230,404,'halo_azul');
        var halo_naranja=game.add.image(455,404,'halo_naranja');*/
        
        //var texto = game.add.text(300,250,"1 Para jugar",{font:"30px Arial", fill:"#FFE400",align:"center"});
        /*var texto2 = game.add.text(300,300,"2 Controles",{font:"30px Arial", fill:"#FFE400",align:"center"});
        var texto = game.add.text(300,350,"3 Códice",{font:"30px Arial", fill:"#FFE400",align:"center"});*/
        //this.play=game.input.keyboard.addKey(Phaser.Keyboard.ONE);


        buttonBlack = game.add.button(340,80, 'halo_negro', jugar, this, 0);
        buttonGreen = game.add.button(170,204, 'halo_verde', ayu, this, 0);
        buttonRed = game.add.button(520,204, 'halo_rojo', err, this, 0);
        buttonBlue = game.add.button(230,404, 'halo_azul', err, this, 0);
        buttonOrange = game.add.button(455,404, 'halo_naranja', err, this, 0);


        
        music = game.add.audio('NoN');
        music.play();


    },

    update: function() {

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
            temporizador_runa=0;
        }
        temporizador_runa++;
    }
}