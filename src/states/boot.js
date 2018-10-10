var CatCatcher = {}

CatCatcher.bootState = function(game) {

}

CatCatcher.bootState.prototype = {

    preload: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
    },
    
    create: function() {
       

    },

    update: function() {
        this.state.start('preloadState');
    }

}