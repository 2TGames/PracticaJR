package es.urjc.jer.game;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;


public class GameController {

	Map<String, Player> players = new ConcurrentHashMap<>();			//mapa de jugadores
	Map<Long,Hechizo> hechizos = new ConcurrentHashMap<>();			//mapa de hechizos
	Map<Long,Niebla> nieblas = new ConcurrentHashMap<>();			//mapa de nieblas
	AtomicLong nextId = new AtomicLong(0);							//suma de IDs de jugadores
	AtomicLong nextIdHechizo= new AtomicLong(0);					//suma de IDs de hechizos
	AtomicLong nextIdNiebla= new AtomicLong(0);						//suma de IDs de nieblas
	//Hechizo hechizo = new Hechizo();
	
	//Con este GET recuperamos el número de jugadores
	
	public Collection<Player> getPlayers() {
		return players.values();
	}
	
	public Player getPlayer(int id) {
		return players.get(id);
	}
	
	// Con este GET recuperamos los hechizos 
	
	public Collection<Hechizo> getHechizos(){
		return hechizos.values();
	}
	
	// Con este GET recuperamos las nieblas 
		
		public Collection<Niebla> getNieblas(){
			return nieblas.values();
		}

	// Con este POST creamos un nuevo jugador
	public void addPlayer(Player player) {
		
		Hechizo hechizo = new Hechizo();
		if(player.getId() == 0) {
			player.setX(50);
			player.setY(400);
			player.setFacing(1);
			hechizo.setX(player.getX());
			hechizo.setY(player.getY());
		}else if (player.getId()== 1) {
			player.setX(750);
			player.setY(400);
			player.setFacing(-1);
			hechizo.setX(player.getX());
			hechizo.setY(player.getY());
		}
		
		players.put(player.getSession().getId(),player);
	}
	
	
	
	/*public Player newPlayer() {
		Player player = new Player();
		Hechizo hechizo = new Hechizo();
		long id = nextId.incrementAndGet();
		player.setId(id);
		hechizo.setId(id);
		if(player.getId()==1) {
			player.setX(100);
			player.setY(400);
			hechizo.setX(player.getX());
			hechizo.setY(player.getY());
			player.setFacing("right");
		}else if(player.getId()==2) {
			player.setX(700);
			player.setY(400);
			hechizo.setX(player.getX());
			hechizo.setY(player.getY());
			player.setFacing("left");
		}
		players.put(player.getId(), player);
		return player;
	}*/
	
	
	public Hechizo newHechizo() {
		Hechizo hechizo = new Hechizo();
		long id = nextIdHechizo.incrementAndGet();
		hechizo.setId(id);
		hechizos.put(hechizo.getId(),hechizo);
		return hechizo;
	}
	
	
	public Niebla newNiebla() {
		Niebla niebla = new Niebla();
		long id = nextIdNiebla.incrementAndGet();
		niebla.setId(id);
		nieblas.put(niebla.getId(),niebla);
		return niebla;
	}
	
	public void deletePlayer(long id) {
		Player savedPlayer = players.get(id);
		if(savedPlayer != null) {
			players.remove(savedPlayer.getId());
		}
	}
	
	public void deleteHechizo(long id) {
		Hechizo savedHechizo = hechizos.get(id);
		if (savedHechizo != null){
			hechizos.remove(savedHechizo.getId());
		}
	}
	
	public void deleteNiebla(long id) {
		Niebla savedNiebla = nieblas.get(id);
		if(savedNiebla != null ) {
			nieblas.remove(savedNiebla.getId());
		}
	}

}
