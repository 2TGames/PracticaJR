# MAGIC AND RUNES

![Imagen de pantalla inicio](https://github.com/2TGames/PracticaJR/blob/master/Assets/images/pantalla%20inicio.png)

## CONCEPTO.

*Título*: MAGIC & RUNES.

*Estudio*: 2TGames.

*Miembros*: Luis Sánchez Valencia (Diseñador / Programador) 
 	  Rodrigo Pérez Turel (Game Designer / Programador).

*Plataforma*: PC.

*Versión*: 2.0.

*Sinopsis*: Los personajes jugables (por el momento solo uno) serán magos repudiados por la sociedad mágica a la que pertenecen. Para que los vuelvan a aceptar se enfrentarán en un duelo a muerte frente a otro renegado.

*Categoria(s)*: Shooter / Estrategia / Plataformas.

*Licencia*: La forma de conseguir objetivos está basada en el videojuego Nidhogg.

*Mecánicas*: Juego de plataformas con hechizos de lanzamiento tipo proyectil y que alteren el mapa o las estadísticas del jugador. Cada jugador deberá llegar al otro lado de la pantalla o matar al otro jugador para avanzar. Esta acción deberá repetirse sucesivas veces hasta llegar al objetivo final  (puesto que cada objetivo alcanzado por un jugador le resta objetivos al otro).

*Público*: Jugadores habituales de juegos de acción con ciertos elementos de estrategia.

## HISTORIAL DE VERSIONES.
0.1 Concepción de la idea.

1.0 Primera versión offline.

2.0 (ACTUAL) Primera versión con multijugador online.


## VISIÓN GENERAL DEL JUEGO.

Se trata de un juego que mezcla la estrategia y la acción, de forma que sean igual de importantes, ya que el ser capaz de acertar y esquivar hechizos es igual de importante que saber colocar trampas mágicas.
Por una parte tendremos proyectiles mágicos, que los jugadores utilizarán como ataques más directos. Esto, además, se podrá combinar con trampas que se activarán con la proximidad del rival. De esta forma,se ha pensado que en un futuro se podrán emplear varios tipos de magias a la vez (por ejemplo, encerrando al enemigo en una trampa, sin que pueda usar magia por 3 o 4 segundos, y acribillarlo con tus proyectiles con total seguridad). Además, se podrá alterar el entorno de diferentes maneras, dándole a los jugadores infinitas estrategias para obtener ventajas de posición frente al otro jugador. Por último, en versiones posteriores habrá magias que alteren las estadísticas del jugador que las use a cambio de maná (lo que, usualmente significará sacrificar un nivel a cambio de una mejora permanente en el resto de la partida).
Este juego, con una mecánica de avanzar y retroceder con respecto al objetivo (y el del otro jugador), y las magias previamente expuestas, le asegurará al jugador tardes de entretenimiento con otros jugadores.

## MECÁNICA DEL JUEGO.

*Cámara*: perspectiva lateral en 2D sin scroll lateral.

*Periféricos*: teclado y monitor.

*Controles*: 

	Movimiento: teclas WASD(J1), flechas del teclado (J2).

	Lanzamiento de hechizo: V (J1), I (J2).

	Lanzamiento de trampa: B (J1), O (J2).

	
*Puntuación*: La puntuación se mostrará en la parte superior de la pantalla en forma de mapas superados, con un cartel de “VICTORIA” o “DERROTA” al final de la partida.

*Guardar/Cargar*: Al tratarse de partidas aisladas, el jugador empezará siempre partida nueva con otro jugador.

*Reloj*: Habrá un temporizador de 3 minutos, que se reiniciará con cada muerte. Si llega a cero la partida acaba, ganando el que esté más cerca de su objetivo. Además, por cada minuto transcurrido, se le restará una cantidad de maná resultante de la siguiente fórmula "escenarios avanzados desde el inicial * 10% del maná inicial del jugador", y en su defecto, se le restará vida. Esto se hará a fin de evitar juegos estáticos y obligar a los jugadores a avanzar.

	~~NOTA:Puesto que no es necesario matar el otro jugador para avanzar, la mecánica del reloj ya no es necesaria para agilizar el juego.~~

	NOTA: Puest que el dejar un camino alternativo al combate abierto dejaba la opción de no combatir y no hacer caso al enemigo, decidimos eliminar esa opción.


## ESTADOS DEL JUEGO.

El jugador, estando en el menú principal, en un futuro podrá ir a la pantalla de estadísticas y a la del códice, que almacenará los logros completados y por completar (así como pequeños fragmentos del lore o la intrahistoria del videojuego). Por último, podrá acceder al modo de juego “Multijugador Online” (que, por el momento, es el único del que dispone el juego) y el “Multijugador Offline”, los cuales no tendrán menús de pausa. Una vez que se seleccione en un futuro el modo de juego online se iniciará un proceso de "match making" en el cual se seleccionará a otro jugador con el mismo nivel o experiencia de juego que el jugador para así que ambos jugadores tengan las mismas posibilidades de ganar debido a que el nivel de ambos será el mismo o muy parecido. Para ello se implementará un sistema en base a las victorias que recompensará con rangos a los jugadores y será lo que se utilice para el proceso de "match making". Asimismo, también se ha añadido una opción de ayuda al menú principal.

## INTERFACES.

![Imagen diagrama estados](https://github.com/2TGames/PracticaJR/blob/master/Assets/images/diagrama%20de%20estados.png)


**HUD**


![Imagen vida y mana](https://github.com/2TGames/PracticaJR/blob/master/Assets/images/HUD%20(vida%2C%20mana%20y%20magia).jpg)

Nombre de la pantalla: HUD.

Descripción: En tiempo de juego se mostrará la cantidad de vida y maná del personaje.

Estados del juego al comenzar la partida:

**Interfaz del menú principal:**

![Imagen menu principal](https://github.com/2TGames/PracticaJR/blob/master/Assets/images/menu%20principal.png)

Nombre de la pantalla: Menú principal.

Descripción de la pantalla: En esta pantalla el jugador podrá acceder al modo jugar y al estado de ayuda. También tendrá acceso al estado asignado a los modos de juego en desarrollo.

Estados del juego: Abrir el juego; al terminar una partida.


**Interfaz del Multijugador**:

Nombre de la pantalla: Multijugador.

Descripción de la pantalla: Además de la acción principal (la partida en sí), se mostrarán dos barras (vida y maná) en las esquinas superiores. En la parte superior central se encontrarán una serie de casillas que representarán el mapa y la posición de los jugadores en el mismo.

Ejemplo medidor:

![Imagen medidor](https://github.com/2TGames/PracticaJR/blob/master/assets/Medidores/medidor_0.png)


Estados del juego: Al Multijugador solo se podrá acceder desde el menú principal.


## NIVELES.

El juego dispondrá únicamente de un nivel, dividido en 5 pantallas, y los jugadores empezarán en la pantalla central, a partir de la cual habrá una serie de pantallas simétricas a cada lado hasta la pantalla final.

Nivel 0:

![Imagen nivel 0](https://github.com/2TGames/PracticaJR/blob/master/Assets/scenarios/level0.png)

Nivel 1:

![Imagen nivel 1](https://github.com/2TGames/PracticaJR/blob/master/Assets/scenarios/level1.png)

Nivel 2: 

![Imagen nivel 2](https://github.com/2TGames/PracticaJR/blob/master/Assets/scenarios/level2.png)

Victoria J2:

![Imagen nivel victoria J2](https://github.com/2TGames/PracticaJR/blob/master/Assets/scenarios/victoriaVerde.png)

Nivel -1:

![Imagen nivel -1](https://github.com/2TGames/PracticaJR/blob/master/Assets/scenarios/level-1.png)

Nivel -2:

![Imagen nivel -2](https://github.com/2TGames/PracticaJR/blob/master/Assets/scenarios/level-2.png)

Victoria J1:

![Imagen nivel victoria J1](https://github.com/2TGames/PracticaJR/blob/master/Assets/scenarios/victoriaNaranja.png)


## PROGRESO DEL JUEGO.

El jugador avanzará en el juego matando al rival o atravesando la puerta contraria al lado por el que ha salido. Esto le acercará un mapa a su objetivo y al rival le hará retroceder en la misma medida.


## PERSONAJES.

Nombre del personaje: Renegado (verde / naranja)
Descripción: Encapuchado. Llevará puesta una túnica de color verde o naranja, la cual tendrá una capucha que llevará colocada en la cabeza, así como unas botas de calzado.

Concepto: El mago en cuestión es un renegado, repudiado por el Consejo al ser visto iniciándose en la Magia Negra. Al ser un negado en esa disciplina, y no poseer ningún poder oscuro realmente fuerte, contará con el repertorio de hechizos de los novatos, además del único hechizo de magia negra que pudo aprender (así como la Magia de Trampas, en la que era un estudiante aventajado antes de ser expulsado) para matar al mago rival tantas veces como haga falta para superar la Prueba.
Armas: varita mágica.

![Imagen mago naranja](https://github.com/2TGames/PracticaJR/blob/master/assets/images/mago_perfil_derecho.png)

![Imagen mago verde](https://github.com/2TGames/PracticaJR/blob/master/assets/images/mago_perfil_izq.png)

## HABILIDADES.

Impacto básico: Hechizo que aprenden a usar todos los magos de la Escuela (2 maná/ -20 vida).
Gas explosivo: Trampa mágica de gran daño. Desaparece al aplicar sus efectos. (30 maná/ -40 vida).

## ARMAS.

Varita mágica: palo de madera, no muy largo.

## MIEMBROS DEL EQUIPO.

**Luis Sánchez Valencia**: Rol (Diseñador / Programador). 
Correo: l.sanchezva.2016@alumnos.urjc.es.

**Rodrigo Pérez Turel**: Rol (Game Designer / Programador). 
Correo: r.perezt.2016@alumnos.urjc.es

