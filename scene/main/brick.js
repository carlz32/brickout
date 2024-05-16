class Brick {
	constructor(game) {
		this.game = game
		const { image, vertices, w, h } = game.imageByName("brick01")
		this.image = image
		this.w = w
		this.h = h
		this.x = 20
		this.y = 20
		this.vertices = vertices
		this.lifes = 2

		this.update()
	}

	update() {
		this.transformedVertices = transformVertices(this.vertices, { x: this.x, y: this.y })
	}

	collide(ball) {
		if (intersectAABBs(ball, this)) {
			return intersectCirclePolygon(ball, this.transformedVertices)
		}
		return null
	}
}
