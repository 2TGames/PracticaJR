package es.urjc.jer.game;

import java.util.Collection;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

	Map<Long, Player> players = new ConcurrentHashMap<>();			//mapa de jugadores
	Map<Long,Hechizo> hechizos = new ConcurrentHashMap<>();			//mapa de hechizos
	AtomicLong nextId = new AtomicLong(0);							//suma de IDs de jugadores
	AtomicLong nextIdHechizo= new AtomicLong(0);					//suma de IDs de hechizos
	//Hechizo hechizo = new Hechizo();
	
	// Con este GET recuperamos el número de jugadores
	@GetMapping(value = "/game")
	public Collection<Player> getPlayers() {
		return players.values();
	}
	
	// Con este GET recuperamos los hechizos 
	@GetMapping(value = "/hechizo")
	public Collection<Hechizo> getHechizos(){
		return hechizos.values();
	}

	// Con este POST creamos un nuevo jugador
	@PostMapping(value = "/game")
	@ResponseStatus(HttpStatus.CREATED)
	public Player newPlayer() {
		Player player = new Player();
		long id = nextId.incrementAndGet();
		player.setId(id);
		if(player.getId()==1) {
			player.setX(100);
			player.setY(400);
		}else if(player.getId()==2) {
			player.setX(700);
			player.setY(400);
		}
		players.put(player.getId(), player);
		return player;
	}
	
	//Con este POST creamos los hechizos
	@PostMapping("/hechizo")
	@ResponseStatus(HttpStatus.CREATED)
	public Hechizo newHechizo() {
		Hechizo hechizo = new Hechizo();
		long id = nextIdHechizo.incrementAndGet();
		hechizo.setId(id);
		hechizos.put(hechizo.getId(),hechizo);
		return hechizo;
	}

	// Con este GET, podemos recuperar la información particular de cada uno de los
	// jugadores
	@GetMapping(value = "/game/{id}")
	public ResponseEntity<Player> getPlayer(@PathVariable long id) {
		Player player = players.get(id);
		if (player != null) {
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	//Con este GET optenemos la información del hechizo con id = x;
		@GetMapping(value="/hechizo/{id}")
		public ResponseEntity<Hechizo> getHechizo(@PathVariable long id){
			Hechizo hechizo = hechizos.get(id);
			if(hechizo != null) {
				return new ResponseEntity<>(hechizo,HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}

	// Con este PUT actualizamos la información del jugador con ID = id
	@PutMapping(value = "/game/{id}")
	public ResponseEntity<Player> updatePlayer(@PathVariable long id, @RequestBody Player player) {
		Player savedPlayer = players.get(player.getId());
		if (savedPlayer != null) {
			players.put(id, player);
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	// Con este PUT actualizamos la información del hechizo del jugador con su respectiva id
	@PutMapping(value="/hechizo/{id}")
	public ResponseEntity<Hechizo> updateHechizo(@PathVariable long id, @RequestBody Hechizo hechizo){
		Hechizo savedHechizo = hechizos.get(hechizo.getId());
		if(savedHechizo!=null) {
			hechizos.put(id, hechizo);
			return new ResponseEntity<>(hechizo,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Con este DELETE borramos el jugador con ID = id
	@DeleteMapping(value = "/game/{id}")
	public ResponseEntity<Player> borraJugador(@PathVariable long id) {
		Player savedPlayer = players.get(id);
		if (savedPlayer != null) {
			players.remove(savedPlayer.getId());
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	// Con este DELETE borramos el hechizo con ID = x
	@DeleteMapping(value="/hechizo/{id}")
	public ResponseEntity<Hechizo> borraHechizo(@PathVariable long id){
		Hechizo savedHechizo = hechizos.get(id);
		if(savedHechizo != null) {
			hechizos.remove(savedHechizo.getId());
			return new ResponseEntity<>(savedHechizo, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
