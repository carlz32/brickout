class Paddle {
	constructor(game) {
		this.game = game
		const { image, vertices, w, h } = game.imageByName("paddle")
		this.image = image
		this.w = w
		this.h = h
		this.x = (game.w - this.w) / 2
		this.y = 540
		this.speed = 5
		this.vertices = vertices
		this.update()
	}

	#move(x) {
		this.x = x < 0 ? 0 : x > this.game.w - this.w ? this.game.w - this.w : x
		this.update()
	}

	update() {
		this.transformedVertices = transformVertices(this.vertices, { x: this.x, y: this.y })
	}

	moveLeft() {
		this.#move(this.x - this.speed)
	}

	moveRight() {
		this.#move(this.x + this.speed)
	}

	collide(ball) {
		// narrow phase
		if (intersectAABBs(ball, this)) {
			// If the collided segment's index is one of 0, 2, 3, 4, 5, 7, 8, 9, the ball will be accelerated,
			// and 3, 4, 8, 9's reflection is different
			return intersectCirclePolygon(ball, this.transformedVertices)
		}
		return null
	}
}
