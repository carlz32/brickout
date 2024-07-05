class SceneStart extends GameScene {
    constructor(game) {
        super(game)
        this.registerActions(game)
    }

    registerActions(game) {
        super.registerActions(game)
        game.registerAction('e', () => {
            game.replaceScene(SceneEditor)
        })

        game.registerAction('k', () => {
            game.replaceScene(SceneMain)
        })
    }

    draw() {
        super.draw()
        const x = this.game.w / 2
        const y = this.game.h / 2
        this.game.drawText({
            x: x,
            y: y,
            color: 'blue',
            contents: [
                {
                    text: 'Press ',
                    font: 'Iosevka Nerd Font',
                },
                {
                    text: 'k ',
                    font: 'VictorMono Nerd Font',
                    color: 'red',
                    size: 36,
                },
                {
                    text: 'to start',
                    font: 'Iosevka Nerd Font',
                },
            ],
        })
        this.game.drawText({
            x: x,
            y: y + 50,
            color: 'blue',
            contents: [
                {
                    text: 'Press ',
                    font: 'Iosevka Nerd Font',
                },
                {
                    text: 'e ',
                    font: 'VictorMono Nerd Font',
                    color: 'red',
                    size: 36,
                },
                {
                    text: 'to editor your level',
                    font: 'Iosevka Nerd Font',
                },
            ],
        })
    }

    update() {}

    debug() {}
}
