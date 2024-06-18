class GameScene {
    constructor(game) {
        this.game = game

        this.paddles = []
        this.balls = []
        this.bricks = []
        this.elements = {
            paddles: this.paddles,
            balls: this.balls,
            bricks: this.bricks,
        }
    }

    draw() {
        for (let key in this.elements) {
            const elements = this.elements[key]
            for (const e of elements) {
                if (!e.isAlive || e.isAlive()) {
                    this.game.drawElement(e)
                }
            }
        }

        if (this.game.debug) {
            this.debug()
        }
    }

    addElement(element, type) {
        this.elements[type].push(element)
    }

    update() {}

    debug() {}
}
