class Brick {
    constructor(game, { imageName, x, y, lifes }) {
        this.game = game
        const { image, w, h } = game.imageByName(imageName)
        this.image = image
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        this.vertices = this.createBoxVertices(w, h)
        this.lifes = lifes

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
            this.lifes--
            return intersectCirclePolygon(ball, this.transformedVertices)
        }
        return null
    }
}
