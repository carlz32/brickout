class Brick {
	constructor(game) {
		this.game = game
		const { image, w, h } = game.imageByName("brick01")
		this.image = image
		this.w = w
		this.h = h
		this.x = 20
		this.y = 20
		this.vertices = this.createBoxVertices(w, h)
		this.lifes = 2

		this.update()
	}

	createBoxVertices(width, height) {
		const left = 0
		const right = width
		const top = 0
		const bottom = height

		return [
			[left, top],
			[right, top],
			[right, bottom],
			[left, bottom],
		]
	}

	update() {
		this.transformedVertices = transformVertices(this.vertices, {
			x: this.x,
			y: this.y,
		})
	}

	collide(ball) {
		if (intersectAABBs(ball, this)) {
			return intersectCirclePolygon(ball, this.transformedVertices)
		}
		return null
	}
}
