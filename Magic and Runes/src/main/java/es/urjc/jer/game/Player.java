package es.urjc.jer.game;

public class Player {

	private long id;
	private int x, y;
	private int score;
	
	Player() {
		this.score = 0;
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

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	@Override
	public String toString() {
		return "Player [id=" + id + ", x=" + x + ", y=" + y + ", score=" + score + "]";
	}

}
