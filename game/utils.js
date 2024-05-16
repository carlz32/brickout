const e = (el) => document.querySelector(el)

const log = console.log.bind(this)

const imageFromPath = (path) => {
	const img = new Image()
	img.src = path
	return img
}

function transformVertices(vertices, origin) {
	const { x, y } = origin
	return vertices.map((p) => [p[0] + x, p[1] + y])
}

function calcIntersection(A, B, C, D) {
	const tTop = (A[1] - C[1]) * (D[0] - C[0]) - (D[1] - C[1]) * (A[0] - C[0])
	const uTop = (B[0] - A[0]) * (A[1] - C[1]) - (A[0] - C[0]) * (B[1] - A[1])
	const bottom = (D[1] - C[1]) * (B[0] - A[0]) - (D[0] - C[0]) * (B[1] - A[1])

	if (bottom !== 0) {
		const t = tTop / bottom
		const u = uTop / bottom

		if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
			return {
				x: lerp(A[0], B[0], t),
				y: lerp(A[1], B[1], t),
				offset: t,
			}
		}
	}
	return null
}

function lerp(a, b, t) {
	return a + (b - a) * t
}

function dot(v1, v2) {
	return v1[0] * v2[0] + v1[1] * v2[1]
}

function magnitude(v) {
	return Math.hypot(v[0], v[1])
}

function squaredDis(p1, p2) {
	const x = p1[0] - p2[0]
	const y = p1[1] - p2[1]
	return x * x + y * y
}

function normalize(v) {
	return [v[0] / magnitude(v), v[1] / magnitude(v)]
}

function scale(v, scaler) {
	return [v[0] * scaler, v[1] * scaler]
}

function subtract(tip, tail) {
	return [tip[0] - tail[0], tip[1] - tail[1]]
}

function add(tip, tail) {
	return [tip[0] + tail[0], tip[1] + tail[1]]
}

function setContextFont(context, style) {
	context.font = `${style.type} ${style.size}px ${style.font}`
	context.fillStyle = style.color
	context.textAlign = style.textAlign
	context.textBaseline = style.textBaseline
}


class Vector2d {
	constructor(x, y) {
		this.x = x	
		this.y = y	
	}

	static default() {
		return new Vector2d(0, 0)
	}

}
