class GameScene {
    constructor(game) {
        this.game = game

        this.paddles = []
        this.balls = []
        this.bricks = []
    }

    draw() {
        for (let paddle of this.paddles) {
            this.game.drawElement(paddle)
        }

        for (let ball of this.balls) {
            this.game.drawElement(ball)
        }

        for (let brick of this.bricks) {
            if (brick.isAlive()) this.game.drawElement(brick)
        }

        if (this.game.debug) {
            this.debug()
        }
    }

    addBrick(element) {
        this.bricks.push(element)
    }

    addPaddle(element) {
        this.paddles.push(element)
    }

    addBall(element) {
        this.balls.push(element)
    }

    removeBall(index) {
        this.balls.splice(index, 1)
    }

    removeBricks() {
        this.bricks = []
    }

    update() {}

    debug() {}
}
