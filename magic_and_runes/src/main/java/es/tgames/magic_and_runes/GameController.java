package es.tgames.magic_and_runes;

import java.util.Collection;
import java.util.Map;
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

@RestController()
public class GameController {

	Map<Long,Jugador> jugadores=new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	
	@GetMapping(value="/game")
	public Collection<Jugador> getJugadores() {
		return jugadores.values();
	}
	
	@PostMapping(value="/game")
	@ResponseStatus(HttpStatus.CREATED)
	public Jugador newJugador() {
		Jugador jugador = new Jugador();
		long id = nextId.incrementAndGet();
		jugador.setId(id);
		if(jugador.getId()==1) {
		jugador.setX(100);
		jugador.setY(400);
		}else if (jugador.getId()==2) {
			jugador.setX(700);
			jugador.setY(400);
		}
		jugadores.put(jugador.getId(), jugador);
		return jugador;
	}
	
	@GetMapping(value="/game/{id}")
	public ResponseEntity<Jugador> getJugador(@PathVariable long id){
		Jugador jugador = jugadores.get(id);
		if(jugador!=null) {
			return new ResponseEntity<>(jugador,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping(value = "/game/{id}")
	public ResponseEntity<Jugador> actualizaJugador(@PathVariable long id, @RequestBody Jugador jugador){
		Jugador savedJugador = jugadores.get(jugador.getId());
		if(savedJugador != null) {
			return new ResponseEntity<>(savedJugador,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("game/{id}")
	public ResponseEntity<Jugador> borraJugador(@PathVariable long id){
		Jugador savedJugador = jugadores.get(id);
		if(savedJugador!=null) {
			return new ResponseEntity<>(savedJugador,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
