package es.urjc.jer.game;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class Player {

	private final WebSocketSession session;
	private int id;
	private int x, y, vida, mana;
	private String facing="idle";
	
	public Player(int playerId, WebSocketSession session) {
		this.id = playerId;
		this.vida = 100;
		this.mana = 100;
		this.session = session;
	}


	public String getFacing() {
		return facing;
	}

	public void setFacing(String facing) {
		this.facing = facing;
	}

	public int getVida() {
		return vida;
	}

	public void setVida(int v) {
		this.vida = v;
	}
	
	public int getMana() {
		return mana;
	}

	public void setMana(int m) {
		this.mana = m;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}
	
	public WebSocketSession getSession() {
		return this.session;
	}
	
	public void sendMessage(String msg) throws Exception{
		this.session.sendMessage(new TextMessage(msg));
	}


	@Override
	public String toString() {
		//return "Player [id=" + id + ", x=" + x + ", y=" + y + ", vida=" + vida + ", mana=" + mana + "]";
		return "{\"id\":" + id + ",\"x\":" + x + ",\"y\":" + y + ",\"vida\":" + vida + ",\"mana\":" + mana +"}";

	}

}
