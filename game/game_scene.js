class GameScene {
    constructor(game) {
        this.game = game

        this.paddles = []
        this.balls = []
        this.bricks = []
        this.notifications = []
    }

    registerActions(game) {
        game.registerAction('r', () => {
            game.replaceScene(SceneStart)
        })
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

        for (let message of this.notifications) {
            // TODO: draw background before text
            if (message) this.game.drawText(message)
        }

        if (this.game.debug) {
            this.debug()
        }
    }

    addBrick(element) {
        this.bricks.push(element)
    }

    removeBricks() {
        this.bricks = []
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

    addNotification(message) {
        log(message)
        const { id, duration, ...config } = message
        log('add Message')
        this.notifications[id] = config
        if (duration) {
            setTimeout(() => this.removeNotification(id), duration)
        }
        log('queue', this.notifications)
    }

    removeNotification(id) {
        this.notifications[id] = null
    }

    update() {}

    debug() {}
}
