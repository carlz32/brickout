class SceneMain extends GameScene {
	constructor(game) {
		super(game)
		this.init(game)
	}

	init(game) {
		this.paddle = new Paddle(game)
		this.brick = new Brick(game)

		this.balls = []
		this.ball = new Ball(game)
		this.balls.push(this.ball)

		this.ball2 = new Ball(game)
		this.ball2.x = 100
		this.ball2.y = 300
		this.balls.push(this.ball2)

		this.addElement(this.paddle)
		this.addElement(this.balls)
		this.addElement(this.brick)

		this.game.registerAction("a", () => this.paddle.moveLeft())

		this.game.registerAction("d", () => this.paddle.moveRight())

		this.game.registerAction("f", () => this.ball.fire())
		this.game.registerAction("f", () => this.ball2.fire())
	}

	update() {
		const { game, paddle, balls, brick } = this

		for (let x = 0; x < balls.length; x++) {
			const ball = balls[x]
			ball.move()

			let res = paddle.collide(ball)
			if (res) this.handleReflection(ball, res)

			// If the collided segment's index is one of 0, 2, 3, 4, 5, 7, 8, 9, the ball will be accelerated,
			// and 3, 4, 8, 9's reflection is different
			// arc part
			// if ([3, 4, 8, 9].includes(i)) {
			// 	log("reflect [3, 4, 8, 9]")
			// 	const unitSegVector = this.unitSegVector(paddle.segments[i])

			// 	const newSpeed = this.newBallSpeed(ball, unitSegVector)
			// 	ball.speedX = newSpeed[0]
			// 	ball.speedY = newSpeed[1]
			// }

			// // line part
			// if ([0, 1, 2, 5, 6, 7].includes(i)) {
			// 	log("reflect [0, 1, 2, 5, 6, 7]")
			// 	ball.speedY *= -1
			// }

			// // accelerate part
			// if ([0, 2, 3, 4, 5, 7, 8, 9].includes(i)) {
			// 	log("reflect [0, 2, 3, 4, 5, 7, 8, 9]")
			// 	ball.speedX *= 1.05
			// 	ball.speedY *= 1.05
			// }

			res = brick.collide(ball) 
			if (res) this.handleReflection(ball, res)

			if (ball.y > paddle.y + paddle.h) {
				balls.splice(x, 1)
				if (balls.length < 1) {
					const s = new SceneEnd(game)
					game.replaceScene(s)
				}
			}
		}
	}

	handleReflection(ball, { normal, depth }) {
		// speed
		const speedVector = [ball.speedX, ball.speedY]
		const project = dot(normal, speedVector)
		const speedA = scale(normal, project)
		const speedB = subtract(speedVector, speedA)
		const newSpeed = add(speedB, scale(speedA, -1))
		ball.speedX = newSpeed[0]
		ball.speedY = newSpeed[1]
		// location
		const offset = scale(normal, depth)
		;[ball.x, ball.y] = add([ball.x, ball.y], offset)
	}

	debug() {
		const { game, paddle, ball, ball2, brick } = this
		game.drawPoints(paddle.transformedVertices)
		game.drawPoints(ball.transformedVertices)
		game.drawPoints(ball2.transformedVertices)
		game.drawPoints(brick.transformedVertices)

		game.canvas.addEventListener(
			"click",
			(e) => {
				const x = e.offsetX
				const y = e.offsetY
				this.ball.x = x
				this.ball.y = y
				this.ball.update(this.ball.relativePoints, {
					x: x,
					y: y,
				})
			},
			{
				once: true,
			},
		)
	}
}
