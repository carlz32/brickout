class Paddle {
	constructor(game) {
		this.game = game
		const { image, w, h } = game.imageByName('paddle')
		this.image = image
		this.w = w
		this.h = h
		this.x = (game.w - this.w) / 2
		this.y = 540
		this.speed = 5
		this.paths = [
			{
				type: 'circle',
				radius: 12,
				center: [12, 12],
				topLeft: [0, 0],
			},
			{
				type: 'box',
				width: 10,
				height: 24,
				topLeft: [12, 0],
			},
			{
				type: 'box',
				width: 60,
				height: 24,
				topLeft: [22, 0],
			},
			{
				type: 'box',
				width: 10,
				height: 24,
				topLeft: [82, 0],
			},
			{
				type: 'circle',
				radius: 12,
				center: [92, 12],
				topLeft: [92, 0],
			},
		]
		this.vertices = this.createBoxVertices(this.paths)

		this.update()
	}

	#move(x) {
		this.x = x < 0 ? 0 : x > this.game.w - this.w ? this.game.w - this.w : x
		this.update()
	}

	createBoxVertices(paths) {
		const vertices = []
		for (const p of paths) {
			if (p.type === 'circle') {
				const left = p.topLeft[0]
				const top = p.topLeft[1]
				const right = left + p.radius * 2
				const bottom = top + p.radius * 2
				vertices.push({
					type: 'circle',
					center: p.center,
					radius: p.radius,
					vertices: [
						[left, top],
						[right, top],
						[right, bottom],
						[left, bottom],
					],
				})
			} else if (p.type === 'box') {
				const left = p.topLeft[0]
				const top = p.topLeft[1]
				const right = left + p.width
				const bottom = top + p.height
				vertices.push({
					type: 'box',
					vertices: [
						[left, top],
						[right, top],
						[right, bottom],
						[left, bottom],
					],
				})
			} else {
				vertices.push(null)
			}
		}
		return vertices
	}

	update() {
		this.transformedVertices = this.updateVertices()
	}

	updateVertices() {
		const transformedVertices = []
		for (const v of this.vertices) {
			if (v.type === 'circle') {
				transformedVertices.push({
					...v,
					center: [v.center[0] + this.x, v.center[1] + this.y],
					vertices: transformVertices(v.vertices, {
						x: this.x,
						y: this.y,
					}),
				})
			}

			if (v.type === 'box') {
				transformedVertices.push({
					...v,
					vertices: transformVertices(v.vertices, {
						x: this.x,
						y: this.y,
					}),
				})
			}
		}
		return transformedVertices
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
			log(ball.center[0], this.transformedVertices[0].vertices[1][0])
			if (ball.center[0] <= this.transformedVertices[0].vertices[1][0]) {
				log('left circle')
				return intersectCircles(ball, this.transformedVertices[0])
			}
			log(ball.center[0], this.transformedVertices[4].vertices[0][0])
			if (ball.center[0] >= this.transformedVertices[4].vertices[0][0]) {
				log('right circle')
				return intersectCircles(ball, this.transformedVertices[4])
			}

			for (let i = 1; i < 4; i++) {
				const v = this.transformedVertices[i]
				const res = intersectCirclePolygon(ball, v.vertices)
				if (res) return res
			}
		}
		return null
	}
}
