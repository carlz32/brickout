class Notify {
    constructor(game) {
        this.game = game
    }

    // TODO: after duration, clear the area of text?
    static info(message, duration = 3) {
        const config = {
            color: 'blue',
            contents: [
                {
                    text: message,
                },
            ],
        }
        this.game.drawText(config)
    }

    static warn() {}

    static error() {}
}
