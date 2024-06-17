const __main = () => {
    const images = {
        ball: {
            path: 'img/ballBlue.png',
        },
        brick01: {
            path: 'img/element_grey_rectangle.png',
        },
        brick02: {
            path: 'img/element_green_rectangle.png',
        },
        brick03: {
            path: 'img/element_blue_rectangle.png',
        },
        brick04: {
            path: 'img/element_yellow_rectangle.png',
        },
        brick05: {
            path: 'img/element_purple_rectangle.png',
        },
        brick06: {
            path: 'img/element_red_rectangle.png',
        },
        paddle: {
            path: 'img/paddleRed.png',
        },
    }

    // As we see here, the Scene class initialization process needs the Game instance,
    // likewise, the Game class also needs a Scene instance to initialize
    // So here, we use a callback function, when the Game instance finished it's asynchronous things,
    // call the callback function, then Scene is prepared and signed to Game.
    game = new Game(
        images,
        (g) => {
            const scene = new SceneStart(g)
            g.runWithScene(scene)
        },
        30,
    )

    enableDebugMode(game, true)
}

function enableDebugMode(game, enable) {
    if (!enable) {
        return
    }

    window.addEventListener('keyup', (e) => {
        const k = e.key
        if (k === 'p') {
            game.debug = !game.debug
        }
    })

    e('#id-fps').addEventListener('input', (event) => {
        log(event.target.value)
        const value = event.target.value
        game.fps = Number(value)
    })
}

__main()
