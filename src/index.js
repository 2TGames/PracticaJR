

var game = new Phaser.Game(800, 590, Phaser.AUTO, 'gameDiv' );





game.state.add('bootState', MagicAndRunes.bootState)
game.state.add('preloadState', MagicAndRunes.preloadState)
game.state.add('pantalla_cargaState', MagicAndRunes.pantalla_cargaState)
game.state.add('menuState', MagicAndRunes.menuState)
game.state.add('level0State', MagicAndRunes.level0State)
game.state.add('level_izq1State', MagicAndRunes.level_izq1State)
game.state.add('level_izq2State', MagicAndRunes.level_izq2State)
game.state.add('level_dcha1State', MagicAndRunes.level_dcha1State)
game.state.add('level_dcha2State', MagicAndRunes.level_dcha2State)
game.state.add('endingState', MagicAndRunes.endingState)
game.state.add('errorState', MagicAndRunes.errorState)
game.state.add('endingMagoNaranjaState', MagicAndRunes.endingMagoNaranjaState)
game.state.add('endingMagoVerdeState', MagicAndRunes.endingMagoVerdeState)


game.state.start('bootState')

