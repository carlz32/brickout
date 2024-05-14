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

		this.update(this.vertices, {
			x: this.x,
			y: this.y,
		})
	}

	update(points, origin) {
		this.newPoints = transformVertices(points, origin)
		// outline segments
		this.segments = segmentsFromVertices(this.newPoints)
	}

	collide(ball) {
		// log('brick', this.segments)
		for (let i = 0; i < this.segments.length; i++) {
			const p = this.segments[i]
			for (let j = 0; j < ball.segments.length; j++) {
				const b = ball.segments[j]
				if (calcIntersection(p[0], p[1], b[0], b[1])) {
					return i
				}
			}
		}
		return -1
	}
}
