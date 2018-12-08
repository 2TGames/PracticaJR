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
	
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}

	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

	
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		synchronized (sessions) {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode json = mapper.createObjectNode();

			switch (node.get("type").asText()) {
			case "JOIN":
				if (gameController.getPlayers().size() < 2) {
					Player player = gameController.newPlayer();
					ObjectNode jsonPlayer = mapper.createObjectNode();
					jsonPlayer.put("id", player.getId());
					jsonPlayer.put("x", player.getX());
					jsonPlayer.put("y", player.getY());
					jsonPlayer.put("vida",player.getVida());
					

					json.put("type", "PLAYER_CREATED");
					json.putPOJO("player", jsonPlayer);
				} else {
					json.put("type", "GAME_CPMPLETE");
				}
				session.sendMessage(new TextMessage(json.toString()));

				if (debug)
					System.out.println("[DEBUG] " + json.toString());
				break;

			default:
				break;
			}
		}
	}
}
