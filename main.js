const __main = () => {
	const paddleVertices = [
		// [12, 0],
		// [22, 0],
		// [82, 0],
		// [92, 0],
		// [104, 12],
		// [92, 24],
		// [82, 24],
		// [22, 24],
		// [12, 24],
		// [0, 12],
		[0, 0],
		[104, 0],
		[104, 24],
		[0, 24],
	]
	const brickVertices = [
		[0, 0],
		[64, 0],
		[64, 32],
		[0, 32],
	]
	const ballVertices = [
		// [11, 0],
		// [11 + 11 * Math.cos(Math.PI / 4), 11 - 11 * Math.sin(Math.PI / 4)],
		// [22, 11],
		// [11 + 11 * Math.cos(Math.PI / 4), 11 + 11 * Math.sin(Math.PI / 4)],
		// [11, 22],
		// [11 - 11 * Math.cos(Math.PI / 4), 11 + 11 * Math.sin(Math.PI / 4)],
		// [0, 11],
		// [11 - 11 * Math.cos(Math.PI / 4), 11 - 11 * Math.sin(Math.PI / 4)],
		[0, 0],
		[22, 0],
		[22, 22],
		[0, 22],
	]

	const images = {
		ball: {
			path: "img/ballBlue.png",
			vertices: ballVertices,
		},
		brick01: {
			path: "img/element_purple_rectangle.png",
			vertices: brickVertices,
		},
		brick02: {
			path: "img/element_blue_rectangle.png",
			vertices: brickVertices,
		},
		brick03: {
			path: "img/element_green_rectangle.png",
			vertices: brickVertices,
		},
		brick04: {
			path: "img/element_red_rectangle.png",
			vertices: brickVertices,
		},
		brick05: {
			path: "img/element_grey_rectangle.png",
			vertices: brickVertices,
		},
		brick06: {
			path: "img/element_yellow_rectangle.png",
			vertices: brickVertices,
		},
		paddle: {
			path: "img/paddleRed.png",
			vertices: paddleVertices,
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

	window.addEventListener("keyup", (e) => {
		const k = e.key
		if (k === "p") {
			game.debug = !game.debug
		}
	})

	e("#id-fps").addEventListener("input", (event) => {
		log(event.target.value)
		const value = event.target.value
		game.fps = Number(value)
	})
}

__main()
