function intersectAABBs(box1, box2) {
	return (
		box1.x < box2.x + box2.w &&
		box1.x + box1.w > box2.x &&
		box1.y < box2.y + box2.h &&
		box1.y + box1.h > box2.y
	)
}

function intersectCircles(circle1, circle2) {
	const distance = magnitude(subtract(circle1.center, circle2.center))
	return distance < circle1.radius + circle2.radius
}

function intersectCirclePolygon(circle, polygon) {
	const vertices = polygon.vertices

	let normal = [0, 0]
	let depth = Number.Infinity
	for (let i = 0; i < vertices.length; i++) {
		const va = vertices[i]
		const vb = vertices[(i + 1) % vertices.length]

		const edge = subtract(vb - va)
		const axis = [-edge[1], edge[0]]

		const { max: maxA, min: minA } = projectCircle(circle, axis)
		const { max: maxB, min: minB } = projectVertices(vertices, axis)

		if (minA >= maxB || minB >= maxA) {
			return false
		}

		const axisDepth = Math.min(maxB - minA, maxA - minB)
		if (axisDepth < depth) {
			depth = axisDepth
			normal = normalize(axis)
		}
	}

	const center = circle.center
	const cpIndex = findNearestPoint(center, vertices)
	const cpVertice = vertices[cpIndex]
	const axis = subtract(cpVertice, center)
	// TODO: refactor
	const { max: maxA, min: minA } = projectCircle(circle, axis)
	const { max: maxB, min: minB } = projectVertices(vertices, axis)
	if (minA >= maxB || minB >= maxA) {
		return false
	}

	const axisDepth = Math.min(maxB - minA, maxA - minB)
	if (axisDepth < depth) {
		depth = axisDepth
		normal = normalize(axis)
	}

	return {
		depth,
		normal,
	}
}

function findNearestPoint(center, vertices) {
	let minDis = Number.Infinity
	let index = -1
	for (let i = 0; i < vertices.length; i++) {
		const v = vertices[i]
		const dis = findNearestPoint(center, v)
		if (dis < minDis) {
			minDis = dis
			index = i
		}
	}

	return index
}

function projectCircle(circle, axis) {
	const center = circle.center
	const radius = circle.radius
	const direction = normalize(axis)

	const p1 = add(center, scale(direction, radius))
	const p2 = subtract(center, scale(direction, radius))

	const min = dot(p1, axis)
	const max = dot(p2, axis)

	if (min > max) {
		return {
			min: max,
			max: min,
		}
	}

	return {
		min,
		max,
	}
}

function projectVertices(vertices, axis) {
	const direction = normalize(axis)
	let min = Number.Infinity
	let max = -Number.Infinity
	for (let i = 0; i < vertices.length; i++) {
		const point = vertices[i]
		const l = dot(point, direction)
		if (l < min) {
			min = l
		} else if (l > max) {
			max = l
		}
	}

	return {
		min,
		max,
	}
}
