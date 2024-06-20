class SceneMain extends GameScene {
    constructor(game) {
        super(game)
        this.init(game)
    }

    init(game) {
        this.currentLevel = 1
        this.bricks = this.loadLevels(this.currentLevel)

        for (let brick of this.bricks) {
            this.addElement(brick, 'bricks')
        }

        this.paddle = new Paddle(game)
        this.addElement(this.paddle, 'paddles')

        this.ball = new Ball(game)
        this.addElement(this.ball, 'balls')

        this.ball2 = new Ball(game)
        this.ball2.x = 100
        this.ball2.y = 300
        this.addElement(this.ball2, 'balls')

        this.game.registerAction('a', () => this.paddle.moveLeft())

        this.game.registerAction('d', () => this.paddle.moveRight())

        this.game.registerAction('f', () => this.ball.fire())
        this.game.registerAction('f', () => this.ball2.fire())
    }

    update() {
        if (this.allBricksOut()) {
            log(this.currentLevel)
            this.currentLevel++
            this.bricks = this.loadLevels(this.currentLevel)
        }

        const { game, paddle, balls, bricks } = this

        for (let x = 0; x < balls.length; x++) {
            const ball = balls[x]

            // use iterations to improve the precision of collision detection
            const step = 0.05
            for (let i = 0; i < 1; i += step) {
                ball.move(step)

                let res = paddle.collide(ball)
                if (res) this.handleReflection(ball, res)

                for (const brick of bricks) {
                    if (brick.isAlive()) {
                        res = brick.collide(ball)
                        if (res) this.handleReflection(ball, res)
                    }
                }
            }

            if (ball.outOfBoundary(paddle.y + paddle.h)) {
                balls.splice(x, 1)
                if (balls.length < 1) {
                    const s = new SceneEnd(game)
                    game.replaceScene(s)
                }
            }
        }
    }

    allBricksOut() {
        for (let brick of this.bricks) {
            if (brick.isAlive()) return false
        }
        return true
    }

    loadLevels(levelIndex) {
        log('levelIndex', levelIndex)
        const levelData = levels[levelIndex - 1]
        const bricks = []
        for (const brickData of levelData) {
            const [x, y, lifes] = brickData
            const imageName = `brick${lifes.toString().padStart(2, '0')}`
            const brick = new Brick(this.game, {
                imageName,
                x,
                y,
                lifes,
            })
            bricks.push(brick)
        }
        return bricks
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
        const { game, ball, ball2 } = this
        game.drawPoints(ball.transformedVertices)
        game.drawPoints(ball2.transformedVertices)

        game.context.save()
        game.context.strokeStyle = 'red'
        game.context.beginPath()
        game.context.moveTo(...ball.center)
        const endX = add(ball.center, [ball.speedX, 0])
        game.context.lineTo(...endX)

        const endY = add(ball.center, [0, ball.speedY])
        game.context.moveTo(...ball.center)
        game.context.lineTo(...endY)
        game.context.stroke()
        game.context.restore()

        game.canvas.addEventListener(
            'click',
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
            }
        )
    }
}
