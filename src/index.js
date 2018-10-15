

var game = new Phaser.Game(800, 590, Phaser.AUTO, 'gameDiv' );





game.state.add('bootState', MagicAndRunes.bootState)
game.state.add('preloadState', MagicAndRunes.preloadState)
game.state.add('menuState', MagicAndRunes.menuState)
game.state.add('levelState', MagicAndRunes.levelState)
game.state.add('endingState', MagicAndRunes.endingState)


game.state.start('bootState')

