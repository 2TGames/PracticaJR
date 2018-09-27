﻿# MAGIC AND RUNES

![Imagen de pantalla inicio](https://github.com/2TGames/PracticaJR/blob/master/Assets/pantalla%20inicio.jpg)

## CONCEPTO.

*Título*: MAGIC & RUNES.

*Estudio*: 2TGames.

*Miembros*: Luis Sánchez Valencia (Diseñador / Programador) 
 	  Rodrigo Pérez Turel (Game Designer / Programador).

*Plataforma*: PC.

*Versión*: 0.1.

*Sinopsis*: Los personajes jugables (por el momento solo uno) serán magos repudiados por la sociedad mágica a la que pertenecen. Para que los vuelvan a aceptar se enfrentarán en un duelo a muerte frente a otro renegado.

*Categoria(s)*: Shooter / Estrategia / Plataformas.

*Licencia*: La forma de conseguir objetivos está basada en el videojuego Nidhogg.

*Mecánicas*: Juego de plataformas con hechizos de lanzamiento tipo proyectil y que alteren el mapa o las estadísticas del jugador. Cada jugador deberá llegar al otro lado de la pantalla en un periodo de 5 seg tras matar al otro jugador. Esta acción deberá repetirse sucesivas veces hasta llegar al objetivo final  (puesto que cada objetivo alcanzado por un jugador le resta objetivos al otro).

*Público*: Jugadores habituales de juegos de acción con ciertos elementos de estrategia.

## HISTORIAL DE VERSIONES.
0.1 Concepción de la idea.

## VISIÓN GENERAL DEL JUEGO.

Se trata de un juego que mezcla la estrategia y la acción, de forma que sean igual de importantes, ya que el ser capaz de acertar y esquivar hechizos es igual de importante que saber colocar trampas mágicas y mejorarse las estadísticas con encantamientos.
Por una parte tendremos proyectiles mágicos, que los jugadores utilizarán como ataques más directos. Esto, además, se podrá combinar con una amplia variedad de trampas que se activarán con la proximidad del rival. De esta forma, se podrán emplear varios tipos de magias a la vez (por ejemplo, encerrando al enemigo en una trampa, sin que pueda usar magia por 3 o 4 segundos, y acribillarlo con tus proyectiles con total seguridad). Además, se podrá alterar el entorno de diferentes maneras, dándole a los jugadores infinitas estrategias para obtener ventajas de posición frente al otro jugador. Por último, habrá magias que alteren las estadísticas del jugador que las use a cambio de maná (lo que, usualmente significará sacrificar un nivel a cambio de una mejora permanente en el resto de la partida).
Este juego, con una mecánica de avanzar y retroceder con respecto al objetivo (y el del otro jugador), y las magias previamente expuestas, le asegurará al jugador tardes de entretenimiento con otros jugadores.

## MECÁNICA DEL JUEGO.

*Cámara*: perspectiva lateral en 2D sin scroll lateral (en principio).
*Periféricos*: teclado y monitor.
*Controles*: 
	Movimiento: teclas WASD.
	Selección de hechizo: barra espaciadora + flechas del teclado.
	Lanzamiento de hechizo: flechas del teclado.
	
*Puntuación*: La puntuación se mostrará en la parte inferior de la pantalla en forma de mapas superados, con un cartel de “VICTORIA” o “DERROTA” al final de la partida.
*Guardar/Cargar*: Al tratarse de partidas aisladas, el jugador únicamente dispondrá de su porcentaje de victorias, y el número de victorias y derrotas.
*Reloj*: Habrá un temporizador de 3 minutos, que se reiniciará con cada muerte. Si llega a cero la partida acaba, ganando el que esté más cerca de su objetivo. Además, por cada minuto transcurrido, se le restará una cantidad de maná resultante de la siguiente fórmula "escenarios avanzados desde el inicial * 10% del maná inicial del jugador", y en su defecto, se le restará vida. Esto e hará a fin de evitar juegos estáticos y obligar a los jugadores a avanzar.

## ESTADOS DEL JUEGO.

El jugador, estando en el menú principal, podrá ir a la pantalla de estadísticas, a la del códice, que almacenará los logros completados y por competar (así como pequeños fragmentos del lore o la intrahistoria del videojuego). Por último, podrá acceder al modo de juego “Multijugador Online” (que, por el momento, es el único del que dispone el juego), el cual no tendrá menús de pausa. Una vez que se seleccione este modo de juego se procederá a un proceso de "match making" en el cual se seleccionará a otro jugador con el mismo nivel o experiencia de juego que el jugador para así que ambos jugadores tengan las mismas posibilidades de ganar debido a que el nivel de ambos será el mismo o muy parecido.

## INTERFACES.
**HUD**
![Imagen vida y mana](https://github.com/2TGames/PracticaJR/blob/master/Assets/HUD%20(vida%2C%20mana%20y%20magia).jpg)

Nombre de la pantalla: HUD.

Descripción: En tiempo de juego se mostrará la cantidad de vida y maná del personaje junto con la runa seleccionada para lanzar hechizos.

Estados del juego: Al comenzar la partida.

**Interfaz del menú principal:**

![Imagen menu principal](https://github.com/2TGames/PracticaJR/blob/master/Assets/menu%20inicio.jpg)

Nombre de la pantalla: Menú principal.

Descripción de la pantalla: En esta pantalla el jugador podrá acceder al modo jugar; al listado del códice; y a las estadísticas de su perfil.

Estados del juego: Abrir el juego; al terminar una partida y salir del Códice y de las Estadísticas.

**Interfaz del Códice:**
Nombre de la pantalla: Códice.

Descripción de la pantalla: Se irán mostrando fragmentos del lore del juego a medida que el jugador vaya desbloqueando mediante logros (que en principio tenemos pensado que sean únicamente victorias).

Estados del juego: Al Códice solo se podrá acceder desde el menú principal.

**Interfaz de Estadísticas:**
Nombre de la pantalla: Estadísticas.

Descripción de la pantalla: El jugador podrá observar su porcentaje de victorias al mismo tiempo que contemplar el número de victorias y derrotas que ha ido almacenando.

Estados del juego: A las Estadísticas se podrá acceder desde el menú principal.

**Interfaz del Multijugador**:

Nombre de la pantalla: Multijugador.

Descripción de la pantalla: Además de la acción principal (la partida en sí), se mostrará la runa equipada actualmente (hechizo de acceso rápido del jugador), así como dos barras (vida y maná) saliendo de la misma. Esto se localizará en la parte superior izquierda de la pantalla, y en la parte superior central, una serie de casillas que representarán el mapa y la posición de los jugadores en el mismo.

Estados del juego: Al Multijugador solo se podrá acceder desde el menú principal.


## NIVELES.

El juego dispondrá únicamente de un nivel, dividido en varias pantallas, y los jugadores empezarán en la pantalla central, a partir de la cual habrá una serie de pantallas simétricas a cada lado hasta la pantalla final.

![Imagen nivel prototipo](https://github.com/2TGames/PracticaJR/blob/master/Assets/Prototipo%20escenario.jpeg)

## PROGRESO DEL JUEGO.

El progreso del juego consistirá en cada vez que un jugador mate a su oponente deberá avanzar hacia el lado de la pantalla que le corresponda, de tal manera que irá pasando por varias pantallas hasta llegar a la pantalla final donde acabará la partida y se volverá al menú principal.


## PERSONAJES.

Nombre del personaje: Renegado (azul / rojo)
Descripción: Hombre de complexión atlética, alto, rubio y con barba corta. Llevará puesta una túnica de color rojo o azul abierta por debajo de la cintura, la cual tendrá una capucha que llevará colocada en la cabeza, así como unos pantalones del mismo color y unas sandalias a modo de calzado.

Concepto: El mago en cuestión es un renegado, repudiado por el Consejo al ser visto iniciándose en la Magia Negra. Al ser un negado en esa disciplina, y no poseer ningún poder oscuro realmente fuerte, contará con el repertorio de hechizos de los novatos, además del único hechizo de magia negra que pudo aprender (así como la Magia de Trampas, en la que era un estudiante aventajado antes de ser expulsado) para matar al mago rival tantas veces como haga falta para superar la Prueba.
Armas: vara mágica.

![Imagen del personaje](https://github.com/2TGames/PracticaJR/blob/master/Assets/personaje.png)

## HABILIDADES.

Amplia variedad de hechizos con los que defenderse y atacar.

## ARMAS.

Vara mágica: bastón de madera, no muy largo.

## LOGROS.

El logro que poseerá el juego será poder ir desbloqueando fragmentos de la historia del juego. Estos fragmentos se irán desbloqueando y almacenandose en el Códice a medida que el jugador va consiguiendo victorias en el juego.

## MIEMBROS DEL EQUIPO.

**Luis Sánchez Valencia**: Rol (Diseñador / Programador). 
Correo: l.sanchezva.2016@alumnos.urjc.es.

**Rodrigo Pérez Turel**: Rol (Game Designer / Programador). 
Correo: r.perezt.2016@alumnos.urjc.es


