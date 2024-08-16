class Notification {
    static id = 0
    constructor() {}

    static Info(position, message, duration) {
        const config = {
            id: this.id++,
            x: position[0],
            y: position[1],
            color: 'blue',
            contents: [
                {
                    text: message,
                },
            ],
            duration,
        }
        return config
    }

    static Warn() {}

    static Error() {}
}
