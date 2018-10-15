var MagicAndRunes = {}

MagicAndRunes.bootState = function(game) {

}

MagicAndRunes.bootState.prototype = {

    preload: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y=100;
        
    },
    
    create: function() {
       

    },

    update: function() {
        this.state.start('preloadState');
    }

}