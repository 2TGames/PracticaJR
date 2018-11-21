package es.tgames.magic_and_runes;

public class Jugador {
	private long id;
	private int x,y;
	private int vida, mana;
	
	public Jugador() {
		vida = 100;
		mana = 100;
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
	public int getVida() {
		return vida;
	}
	public void setVida(int vida) {
		this.vida = vida;
	}
	public int getMana() {
		return mana;
	}
	public void setMana(int mana) {
		this.mana = mana;
	}
	
	@Override
	public String toString() {
		return "Jugador [id=" + id + ", x=" + x + ", y=" + y + ", vida=" + vida + ", mana=" + mana + "]";
	}
	
}
