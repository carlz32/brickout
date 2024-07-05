class SceneEditor extends GameScene {
    constructor(game) {
        super(game)
        this.registerActions(game)
        this.bindEvents(game)
        this.levels = []
        this.isSaving = false
    }

    registerActions(game) {
        super.registerActions(game)
        game.registerAction('Enter', () => {
            const data = `const levels = ${JSON.stringify(this.levels)}`
            log(data)
            this.levels = []
        })

        game.registerAction('s', () => {
            // save bricks to file
            if (this.bricks.length == 0) {
                log("Nothing to save")
                return
            }

            if (this.isSaving == true) {
                log("Saving...")
            }
            this.isSaving = true

            let level = []
            for (const brick of this.bricks) {
                const { x, y, lifes } = brick
                level.push([x, y, lifes])
            }

            this.levels.push(level)

            this.isSaving = false
            log('level', this.levels)
            this.bricks = []
        })
    }

    bindEvents(game) {
        const editor = e('#level-elements')
        editor.addEventListener('click', (event) => {
            this.setSelectedElement(event.target)
        })

        const canvas = document.querySelector('#id-canvas')
        canvas.addEventListener('click', (event) => {
            try {
                const x = Math.floor(event.offsetX / game.cellWidth) * game.cellWidth
                const y = Math.floor(event.offsetY / game.cellHeight) * game.cellHeight
                const imageName = this.selectedElement.id
                const lifes = Number(imageName.split('0')[1])
                const element = new Brick(game, {
                    imageName,
                    x,
                    y,
                    lifes,
                })
                this.addBrick(element)
            } catch (err) {
                log("Please select an element")
            }
        })
    }

    draw() {
        super.draw()
        this.drawGrids(this.game, this.game.cellWidth, this.game.cellHeight)

    }

    setSelectedElement(element) {
        this.selectedElement = element
    }

    resetSelectedElement() {
        this.selectedElement = null
    }

    drawGrids(game, cellWidth, cellHeight) {
        const { context: ctx, canvas } = game

        const canvasW = canvas.width
        const canvasH = canvas.height
        ctx.save()
        ctx.lineWidth = 1
        ctx.setLineDash([5, 15])
        for (let i = cellWidth; i < canvasW; i += cellWidth) {
            ctx.beginPath()
            ctx.moveTo(i, 0)
            ctx.lineTo(i, canvasH)
            ctx.closePath()
            ctx.stroke()
        }
        for (let i = cellHeight; i < canvasH; i += cellHeight) {
            ctx.beginPath()
            ctx.moveTo(0, i)
            ctx.lineTo(canvasW, i)
            ctx.closePath()
            ctx.stroke()
        }
        ctx.restore()
    }

    update() { }

    debug() { }
}
