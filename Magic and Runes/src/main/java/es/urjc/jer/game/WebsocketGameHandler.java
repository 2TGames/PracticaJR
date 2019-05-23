package es.urjc.jer.game;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

//import es.urjc.jer.game.Player;

public class WebsocketGameHandler extends TextWebSocketHandler {

	private static Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
	private static final String PLAYER_ATTRIBUTE = "PLAYER";
	private AtomicInteger playerId = new AtomicInteger(0);
	ObjectMapper mapper = new ObjectMapper();
	boolean debug = true;
	GameController gameController = new GameController();
	Player player;
	private ArrayNode arrayPlayers = mapper.createArrayNode();

	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Player player = new Player(playerId.getAndIncrement(), session);
		session.getAttributes().put(PLAYER_ATTRIBUTE, player);
		gameController.addPlayer(player);
		
		ObjectNode msg = mapper.createObjectNode();
		msg.put("event", "JOIN");
		msg.put("id", player.getId());
		msg.put("vida", player.getVida());
		msg.put("mana", player.getMana());
		msg.put("x", player.getX());
		msg.put("y", player.getY());
		arrayPlayers.addPOJO(msg);
		player.getSession().sendMessage(new TextMessage(msg.toString()));
	}

	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

	/*
	 * protected void enviaMensaje(WebSocketSession session, TextMessage message)
	 * throws Exception { for(int i=0; i<sessions.size(); i++) {
	 * session.sendMessage(message); } }
	 */
	
	public void broadcast(String message) {
		for(Player player: gameController.getPlayers()) {
			try {
				player.getSession().sendMessage(new TextMessage(message.toString()));
			}catch(Exception e) {
				System.err.println("Error sending message to player: " + player.getId());
				e.printStackTrace();
			}
		}
	}

	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		synchronized (sessions) {
			try {
				JsonNode node = mapper.readTree(message.getPayload());
				ObjectNode msg = mapper.createObjectNode();
				Player player = (Player) session.getAttributes().get(PLAYER_ATTRIBUTE);

				switch (node.get("event").asText()) {
				/*
				 * case "JOIN": if (gameController.getPlayers().size() < 3) { msg.put("event",
				 * "PLAYER_CREATED"); msg.put("id", player.getId()); msg.put("x",
				 * player.getX()); msg.put("y", player.getY());
				 * msg.put("vida",player.getVida()); msg.put("mana", player.getMana());
				 * //json.putPOJO("player", jsonPlayer); player.getSession().sendMessage(new
				 * TextMessage(msg.toString())); } else { msg.put("type", "MAX_PLAYERS"); }
				 * session.sendMessage(new TextMessage(msg.toString()));
				 * 
				 * if (debug) System.out.println("[DEBUG] " + msg.toString()); break;
				 */
				case "PLAYERS":

					if (gameController.getPlayers().size() < 2) {
						msg.put("event", "WAIT");
						/*
						 * msg.put("numJugadores", gameController.getPlayers().size());
						 * player.getSession().sendMessage(new TextMessage(msg.toString()));
						 */

						msg.putPOJO("numJugadores", gameController.getPlayers().size());
						session.sendMessage(new TextMessage(msg.toString()));
					}

					if (gameController.getPlayers().size() == 2) {
						msg.put("event", "ENOUGH");
						msg.put("numJugadores", gameController.getPlayers().size());
						player.getSession().sendMessage(new TextMessage(msg.toString()));
						// msg.putPOJO("numJugadores", gameController.getPlayers().size());
						for (int i = 0; i < sessions.size(); i++) {
							session.sendMessage(new TextMessage(msg.toString()));
						}
					} else if (gameController.getPlayers().size() > 2) {
						msg.put("event", "EXCEED");
						msg.put("numJugadores", gameController.getPlayers().size());
						player.getSession().sendMessage(new TextMessage(msg.toString()));
						/*
						 * msg.putPOJO("numJugadores", gameController.getPlayers().size());
						 * session.sendMessage(new TextMessage(msg.toString()));
						 */
					}

					if (debug) {
						System.out.println(msg.toString());
					}
					break;
				case "UPDATE_PLAYER":
					player.setX(node.path("x").asInt());
					player.setY(node.path("y").asInt());
					player.setVida(node.path("vida").asInt());
					player.setMana(node.path("mana").asInt());
					
					ObjectNode jsonPlayer = mapper.createObjectNode();
					jsonPlayer.put("event", "UPDATED");
					jsonPlayer.putPOJO("players", arrayPlayers);
					this.broadcast(jsonPlayer.toString());
					//player.getSession().sendMessage(new TextMessage(jsonPlayer.toString()));
					
					System.out.println(jsonPlayer.toString());

					break;

				default:
					break;
				}
			}catch(Exception e) {
				System.err.println("Error processing message: " + message.getPayload());
				e.printStackTrace();
			}
			
		}
	}
}
