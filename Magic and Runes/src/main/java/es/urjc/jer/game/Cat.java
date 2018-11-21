package es.urjc.jer.game;

import java.util.Random;

public class Cat {

	private int x, y;
	Random rnd = new Random();
	
	Cat() {
		this.x = rnd.nextInt(700);
		this.y = rnd.nextInt(500);
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
		return "Cat [x=" + x + ", y=" + y + "]";
	}
	
}
