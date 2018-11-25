package es.urjc.jer.game;

public class Hechizo {
	private int x=-1,y=-1;
	private long id;
	
	
	public Hechizo() {
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
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	@Override
	public String toString() {
		return "Hechizo [x=" + x + ", y=" + y + ", id=" + id + "]";
	}
	
	
}
