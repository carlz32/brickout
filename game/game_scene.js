class GameScene {
    constructor(game) {
        this.game = game
        this.elements = {}
        this.paddles = []
        this.balls = []
        this.bricks = []
    }

    draw() {
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i]
            if (Array.isArray(element)) {
                // TODO check if the element is to be drawed
                for (const e of element) {
                    this.game.drawElement(e)
                }
            } else {
                this.game.drawElement(element)
            }
        }

        if (this.game.debug) {
            this.debug()
        }
    }

    addElement(element, type) {
        this.elements.push(element)
    }

    update() {}

    debug() {}
}
