package es.urjc.jer.game;

public class Player {

	private long id;
	private int x, y, vida, mana;
	private String facing="idle";
	
	Player() {
		this.vida = 100;
		this.mana = 100;
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
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
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


	@Override
	public String toString() {
		//return "Player [id=" + id + ", x=" + x + ", y=" + y + ", vida=" + vida + ", mana=" + mana + "]";
		return "{\"id\":" + id + ",\"x\":" + x + ",\"y\":" + y + ",\"vida\":" + vida + ",\"mana\":" + mana +"}";

	}

}
