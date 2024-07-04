class Game {
    constructor(images, runCallback, fps = 60) {
        this.actions = {}
        this.keydowns = {}
        this.scene = null
        this.runCallback = runCallback
        this.images = images
        this.fps = fps
        this.debug = false
        this.cellWidth = 64
        this.cellHeight = 32

        this.initCanvas()
        this.bindEvents()
        this.loadImages()
    }

    initCanvas() {
        const canvas = document.querySelector('#id-canvas')
        const context = canvas.getContext('2d')

        this.canvas = canvas
        this.context = context
        this.h = this.canvas.height
        this.w = this.canvas.width
    }

    bindEvents() {
        window.addEventListener('keydown', (event) => {
            this.keydowns[event.key] = true
        })

        window.addEventListener('keyup', (event) => {
            this.keydowns[event.key] = false
        })
    }

    registerAction(key, callback) {
        if (!this.actions[key]) {
            this.actions[key] = []
        }
        this.actions[key].push(callback)
    }

    resetActions() {
        this.actions = {}
    }

    drawElement(element) {
        this.context.drawImage(element.image, element.x, element.y)
    }

    drawText(ctx) {
        const { context } = this
        // text object which contains x, y, contents, font, size, color, textAlign, textBaseline config
        const defaultConfig = {
            x: 0,
            y: 0,
            color: 'black',
            font: 'serif',
            type: '',
            size: 24,
            textAlign: 'center',
            textBaseline: 'bottom',
        }
        const { x, y, contents, ...config } = {
            ...defaultConfig,
            ...ctx,
        }

        const textWidths = []
        for (const c of contents) {
            const style = {
                ...config,
                ...c,
            }
            setContextFont(context, style)
            const { width } = context.measureText(style.text)
            textWidths.push(width)
        }

        const totalWidth = textWidths.reduce((cur, acc) => acc + cur, 0)

        let curX
        let curY

        if (config.textAlign === 'left') {
            curX = x
            curY = y
        } else if (config.textAlign === 'center') {
            curX = x - totalWidth / 2
            curY = y
        } else if (config.textAlign === 'right') {
            curX = x - totalWidth
            curY = y
        }

        for (let i = 0; i < contents.length; i++) {
            const c = contents[i]
            const style = {
                ...config,
                ...c,
            }
            context.font = `${style.type} ${style.size}px ${style.font}`
            context.fillStyle = style.color
            context.textAlign = 'left'
            context.fillText(c.text, curX, curY)

            const w = textWidths[i]
            curX += w
        }
    }

    drawPoints(points) {
        this.context.save()
        this.context.fillStyle = 'red'
        for (let i = 0; i < points.length; i++) {
            const p = points[i]
            this.context.beginPath()
            this.context.arc(...p, 2, 0, Math.PI * 2)
            this.context.fill()
        }
        this.context.restore()
    }

    draw() {
        this.scene.draw()
    }

    update() {
        if (this.debug) return
        this.scene.update()
    }

    runloop() {
        // run events
        const actions = Object.keys(this.actions)
        for (let i = 0; i < actions.length; i++) {
            const key = actions[i]
            if (this.keydowns[key]) {
                for (const handler of this.actions[key]) {
                    handler()
                }
            }
        }

        // update
        this.update()

        // clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // draw
        this.draw()

        setTimeout(() => this.runloop(), 1000 / this.fps)
    }

    runWithScene(scene) {
        this.scene = scene
        this.runloop()
    }

    __start() {
        this.runCallback(this)
    }

    loadImages() {
        const loaded = []
        const names = Object.keys(this.images)
        for (let i = 0; i < names.length; i++) {
            const name = names[i]
            const path = this.images[name].path
            const img = new Image()
            img.src = path
            img.onload = () => {
                this.images[name].img = img
                loaded.push(1)
                if (loaded.length === names.length) {
                    this.__start()
                }
            }
        }
    }

    imageByName(name) {
        const { img, vertices } = this.images[name]
        const image = {
            image: img,
            vertices: vertices,
            w: img.width,
            h: img.height,
        }

        return image
    }

    replaceScene(Scene) {
        this.resetActions()
        this.scene = new Scene(this)
    }
}
