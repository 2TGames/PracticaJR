MagicAndRunes.ayudaState = function(game) {

}
function men() {

    this.state.start("menuState");

}

MagicAndRunes.ayudaState.prototype = {

    preload: function() {
        game.load.image('fondo','assets/ayuda/fondo.png');
        game.load.image('halo_verde','assets/ayuda/halo_verde.png');
        //game.load.image('fondo','assets/images/fondo magico.png');
    },

    create: function() {

        music.destroy();
        game.cache.removeSound('NoN');
        
        var fondo=game.add.image(0,0,'fondo');

        /*var halo_negro=game.add.image(340,80,'halo_negro');
        var halo_rojo=game.add.image(520,204,'halo_rojo');
        var halo_verde=game.add.image(170,204,'halo_verde');
        var halo_azul=game.add.image(230,404,'halo_azul');
        var halo_naranja=game.add.image(455,404,'halo_naranja');*/
        
        //var texto = game.add.text(300,250,"1 Para jugar",{font:"30px Arial", fill:"#FFE400",align:"center"});
        /*var texto2 = game.add.text(300,300,"2 Controles",{font:"30px Arial", fill:"#FFE400",align:"center"});
        var texto = game.add.text(300,350,"3 Códice",{font:"30px Arial", fill:"#FFE400",align:"center"});*/
        //this.play=game.input.keyboard.addKey(Phaser.Keyboard.ONE);


        buttonGreen = game.add.button(710,195, 'halo_verde', men, this, 0);
        

    },

    update: function() {

    }
}