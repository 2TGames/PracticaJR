MagicAndRunes.codex_menuState = function(game) {

}

var menu= true;

function lib() {
    if (menu){
        menu=false;
        this.state.start("menuState");
    }else {
        
        buttonLibro.pendingDestroy = true;

        var fondo = game.add.image(0,0,'fondo');
        
        buttonLibro = game.add.button(0,0, 'libro', lib, this, 0);
        buttonDiario = game.add.button(100,200, 'diario_boton', diar, this, 0);
        buttonInforme = game.add.button(100,300, 'informe_boton', inform, this, 0);
        buttonParte = game.add.button(100,400, 'parte_boton', text, this, 0);

        menu=true;
    }

}

function texCuatro(){

    buttonLibro.pendingDestroy = true;
    nextPage.pendingDestroy = true;
    
    
    menu=false;

    var fondo=game.add.image(0,0,'texto_4');

    buttonLibro = game.add.button(0,0, 'libro', lib, this, 0);
    prevPage = game.add.button(700,450, 'pag_ant', texTres, this, 0);


}

function texTres(){

    buttonLibro.pendingDestroy = true;
    nextPage.pendingDestroy = true;
    
    
    menu=false;

    var fondo=game.add.image(0,0,'texto_3');

    buttonLibro = game.add.button(0,0, 'libro', lib, this, 0);
    nextPage = game.add.button(700,500, 'pag_sig', texCuatro, this, 0);
    prevPage = game.add.button(700,450, 'pag_ant', texDos, this, 0);


}

function texDos(){

    buttonLibro.pendingDestroy = true;
    nextPage.pendingDestroy = true;
    
    
    menu=false;

    var fondo=game.add.image(0,0,'texto_2');

    buttonLibro = game.add.button(0,0, 'libro', lib, this, 0);
    nextPage = game.add.button(700,500, 'pag_sig', texTres, this, 0);
    prevPage = game.add.button(700,450, 'pag_ant', text, this, 0);


}

function text(){
    buttonDiario.pendingDestroy = true;
    buttonInforme.pendingDestroy = true;
    buttonParte.pendingDestroy = true;
    buttonLibro.pendingDestroy = true;

    menu=false;

    var fondo=game.add.image(0,0,'texto_1');

    buttonLibro = game.add.button(0,0, 'libro', lib, this, 0);
    nextPage = game.add.button(700,500, 'pag_sig', texDos, this, 0);

}

function diaCuatro(){

    buttonLibro.pendingDestroy = true;
    nextPage.pendingDestroy = true;
    
    
    menu=false;

    var fondo=game.add.image(0,0,'diario_4');

    buttonLibro = game.add.button(0,0, 'libro', lib, this, 0);
    prevPage = game.add.button(700,450, 'pag_ant', diaTres, this, 0);


}

function diaTres(){

    buttonLibro.pendingDestroy = true;
    nextPage.pendingDestroy = true;
    
    
    menu=false;

    var fondo=game.add.image(0,0,'diario_3');

    buttonLibro = game.add.button(0,0, 'libro', lib, this, 0);
    nextPage = game.add.button(700,500, 'pag_sig', diaCuatro, this, 0);
    prevPage = game.add.button(700,450, 'pag_ant', diaDos, this, 0);


}

function diaDos(){

    buttonLibro.pendingDestroy = true;
    nextPage.pendingDestroy = true;
    
    
    menu=false;

    var fondo=game.add.image(0,0,'diario_2');

    buttonLibro = game.add.button(0,0, 'libro', lib, this, 0);
    nextPage = game.add.button(700,500, 'pag_sig', diaTres, this, 0);
    prevPage = game.add.button(700,450, 'pag_ant', diar, this, 0);


}

function diar(){
    buttonDiario.pendingDestroy = true;
    buttonInforme.pendingDestroy = true;
    buttonParte.pendingDestroy = true;
    buttonLibro.pendingDestroy = true;

    menu=false;

    var fondo=game.add.image(0,0,'diario_1');

    buttonLibro = game.add.button(0,0, 'libro', lib, this, 0);
    nextPage = game.add.button(700,500, 'pag_sig', diaDos, this, 0);

}

function infTres(){

    buttonLibro.pendingDestroy = true;
    nextPage.pendingDestroy = true;
    
    menu=false;

    var fondo=game.add.image(0,0,'informe_3');

    buttonLibro = game.add.button(0,0, 'libro', lib, this, 0);
    prevPage = game.add.button(700,450, 'pag_ant', infDos, this, 0);

}

function infDos(){

    buttonLibro.pendingDestroy = true;
    nextPage.pendingDestroy = true;
    
    
    menu=false;

    var fondo=game.add.image(0,0,'informe_2');

    buttonLibro = game.add.button(0,0, 'libro', lib, this, 0);
    nextPage = game.add.button(700,500, 'pag_sig', infTres, this, 0);
    prevPage = game.add.button(700,450, 'pag_ant', inform, this, 0);


}

function inform(){
    buttonDiario.pendingDestroy = true;
    buttonInforme.pendingDestroy = true;
    buttonParte.pendingDestroy = true;
    buttonLibro.pendingDestroy = true;

    menu=false;

    var fondo=game.add.image(0,0,'informe_1');

    buttonLibro = game.add.button(0,0, 'libro', lib, this, 0);
    nextPage = game.add.button(700,500, 'pag_sig', infDos, this, 0);

}



MagicAndRunes.codex_menuState.prototype = {

    preload: function() {
        game.load.image('fondo','assets/codex/fondo.png');
        game.load.image('libro','assets/codex/libro.png');
        game.load.image('diario_1','assets/codex/textos/diario_1.png');
        game.load.image('diario_2','assets/codex/textos/diario_2.png');
        game.load.image('diario_3','assets/codex/textos/diario_3.png');
        game.load.image('diario_4','assets/codex/textos/diario_4.png');
        game.load.image('informe_1','assets/codex/textos/informe_1.png');
        game.load.image('informe_2','assets/codex/textos/informe_2.png');
        game.load.image('informe_3','assets/codex/textos/informe_3.png');
        game.load.image('texto_1','assets/codex/textos/texto_1.png');
        game.load.image('texto_2','assets/codex/textos/texto_2.png');
        game.load.image('texto_3','assets/codex/textos/texto_3.png');
        game.load.image('texto_4','assets/codex/textos/texto_4.png');
        game.load.image('diario_boton','assets/codex/botones/diario_boton.png');
        game.load.image('informe_boton','assets/codex/botones/informe_boton.png');
        game.load.image('parte_boton','assets/codex/botones/parte_boton.png');
        game.load.image('pag_sig','assets/codex/botones/pagsig.png');
        game.load.image('pag_ant','assets/codex/botones/pagant.png');
    },

    create: function() {
        var pagSig, pagAnt;
        var diario= false;
        var informe= false;
        var texto= false;

        music.destroy();
        game.cache.removeSound('NoN');
        
        var fondo=game.add.image(0,0,'fondo');

        buttonLibro = game.add.button(0,0, 'libro', lib, this, 0);

        buttonDiario = game.add.button(100,200, 'diario_boton', diar, this, 0);
        buttonInforme = game.add.button(100,300, 'informe_boton', inform, this, 0);
        buttonParte = game.add.button(100,400, 'parte_boton', text, this, 0);
        

    },

    update: function() {

    }
}