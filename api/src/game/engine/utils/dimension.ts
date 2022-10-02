export class GameDimension {
	public width: number;
	public height: number;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

	copy() {
		return new GameDimension(this.width, this.height);
	}

	// TODO: Add scale
}