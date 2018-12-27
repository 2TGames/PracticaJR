package es.urjc.jer.game;

import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

//import es.urjc.jer.game.Player;


public class WebsocketGameHandler extends TextWebSocketHandler{
	
	private static Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
	ObjectMapper mapper = new ObjectMapper();
	boolean debug = true;
	GameController gameController = new GameController();
	Player player;
	
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}

	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

	/*protected void enviaMensaje(WebSocketSession session, TextMessage message) throws Exception {
		for(int i=0; i<sessions.size(); i++) {
			session.sendMessage(message);
		}
	}*/
	
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		synchronized (sessions) {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode json = mapper.createObjectNode();

			switch (node.get("type").asText()) {
			case "JOIN":
				if (gameController.getPlayers().size() < 2) {
					player = gameController.newPlayer();
					/*ObjectNode jsonPlayer = mapper.createObjectNode();
					jsonPlayer.put("id", player.getId());
					jsonPlayer.put("x", player.getX());
					jsonPlayer.put("y", player.getY());
					jsonPlayer.put("vida",player.getVida());
					jsonPlayer.put("mana", player.getMana());*/
					

					json.put("type", "PLAYER_CREATED");
					//json.putPOJO("player", jsonPlayer);
					json.putPOJO("player", player);
				} else {
					json.put("type", "MAX_PLAYERS");
				}
				session.sendMessage(new TextMessage(json.toString()));

				if (debug)
					System.out.println("[DEBUG] " + json.toString());
				break;
			case "PLAYERS":
				
				if(gameController.getPlayers().size()< 2) {
					json.put("type", "WAIT");
					json.putPOJO("numJugadores", gameController.getPlayers().size());
					session.sendMessage(new TextMessage(json.toString()));
				}
					
				if(gameController.getPlayers().size()==2) {
					json.put("type", "ENOUGH");
					json.putPOJO("numJugadores", gameController.getPlayers().size());
					for(int i=0; i < sessions.size(); i++) {
						session.sendMessage(new TextMessage(json.toString()));
					}
				}else if (gameController.getPlayers().size() > 2) {
					json.put("type", "EXCEED");
					json.putPOJO("numJugadores", gameController.getPlayers().size());
					session.sendMessage(new TextMessage(json.toString()));
				}
				
				if(debug) {
					System.out.println(json.toString());
				}
				break;
			case "UPDATE_PLAYER":
				if(!gameController.getPlayers().equals(node.path("player").get("id").asLong())) {
					json.put("type","UPDATED");
					json.putPOJO("player", player);
					player.setX(node.path("player").get("x").asInt());
					player.setY(node.path("player").get("y").asInt());
					player.setVida(node.path("player").get("vida").asInt());
					player.setMana(node.path("player").get("mana").asInt());
					for(int i=0; i < sessions.size(); i++) {
						session.sendMessage(new TextMessage(json.toString()));
					}
					System.out.println(json.toString());
				}
				break;
				
			default:
				break;
			}
		}
	}
}
