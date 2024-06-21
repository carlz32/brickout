class Ball {
    constructor(game) {
        this.game = game
        const { image, w, h } = game.imageByName('ball')
        this.image = image
        this.w = w
        this.h = h
        this.x = (game.w - this.w) / 2
        this.y = 450
        this.speedX = 10
        this.speedY = -10
        this.fired = false
        this.vertices = this.createBoxVertices(w, h)
        this.center = [this.x + this.w / 2, this.y + this.h / 2]
        this.radius = w / 2
        this.update()
    }

    update() {
        this.center = [this.x + this.w / 2, this.y + this.h / 2]
        this.transformedVertices = transformVertices(this.vertices, {
            x: this.x,
            y: this.y,
        })
    }

    fire() {
        this.fired = true
    }

    reset() {
        this.x = (game.w - this.w) / 2
        this.y = 450
        this.speedX = 10
        this.speedY = -10
        this.fired = false
    }

    outOfBoundary(y) {
        return this.y > y
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

    move(step) {
        if (this.fired) {
            if (this.x < 0 || this.x + this.w > this.game.w) {
                this.speedX *= -1
            }
            if (this.y < 0 || this.y + this.h > this.game.h) {
                this.speedY *= -1
            }
            // move
            this.x += this.speedX * step
            this.y += this.speedY * step
        }
        this.update()
    }
}
