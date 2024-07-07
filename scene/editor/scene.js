class SceneEditor extends GameScene {
    constructor(game) {
        super(game)
        this.registerActions(game)
        this.bindEvents(game)
        
        this.currentLevel = 1
        this.levels = []
        this.resetLevel()
    }

    registerActions(game) {
        super.registerActions(game)
    }

    bindEvents(game) {
        const editor = e('.elements')
        editor.addEventListener('click', (event) => {
            this.setSelectedElement(event.target)
        })

        const canvas = e('#id-canvas')
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
            } catch {
                log("Please select an element")
            }
        })

        // next level button
        const nextLevelButton = e('#id-button-next')
        nextLevelButton.addEventListener('click', () => {
            this.resetBricks()
            this.nextLevel()
        })

// next level button
        const saveCurrentLevelButton = e('#id-button-save-current')
        saveCurrentLevelButton.addEventListener('click', () => {
            const levelData = this.generateLevelData()
            this.addCurrentLevel(levelData)
        })

        // save button
        const saveButton = e('#id-button-save-all')
        saveButton.addEventListener('click', () => {
            log(`const levels = ${JSON.stringify(this.levels)}`)
        })
    }

    generateLevelData() {
        if (this.bricks.length == 0) {
            log("Nothing to save")
            return
        }

        let level = []
        for (const brick of this.bricks) {
            const { x, y, lifes } = brick
            level.push([x, y, lifes])
        }
        return level
    }

    resetBricks() {
        this.bricks = []
    }

    addCurrentLevel(level) {
        let index = this.currentLevel - 1
        if (!this.levels[index])
            this.levels[index] = []
        this.levels[index].push(...level)
        log('Current Level Saved', level)
    }

    nextLevel() {
        this.currentLevel++
        log(`Level ${this.currentLevel}`)
    }

    resetLevel() {
        this.currentLevel = 1
        this.bricks = []
        log(`Level ${this.currentLevel}`)
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

    update() {
        const levelText = e('#id-level')
        levelText.value = this.currentLevel
    }

    debug() { }
}
