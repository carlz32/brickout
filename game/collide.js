function intersectAABBs(box1, box2) {
    return box1.x < box2.x + box2.w && box1.x + box1.w > box2.x && box1.y < box2.y + box2.h && box1.y + box1.h > box2.y
}

function intersectCircles(circle1, circle2) {
    const direction = subtract(circle1.center, circle2.center)
    const distance = magnitude(direction)
    const len = distance - circle1.radius - circle2.radius
    if (len > 0) return false
    const normal = normalize(direction)
    const depth = Math.abs(len)

    return {
        normal,
        depth,
    }
}

function intersectCirclePolygon(circle, vertices) {
    const axies = calcCirclePolygonAxises(circle.center, vertices)
    let normal = [0, 0]
    let depth = Number.POSITIVE_INFINITY
    for (let i = 0; i < axies.length; i++) {
        const axis = axies[i]

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

    const arithmeticCenter = findArithmeticMean(vertices)
    const direction = subtract(circle.center, arithmeticCenter)

    if (dot(direction, normal) < 0) {
        normal = scale(normal, -1)
    }

    return {
        depth,
        normal,
    }
}

function findArithmeticMean(vertices) {
    const sum = [0, 0]
    const len = vertices.length
    for (let i = 0; i < len; i++) {
        const v = vertices[i]
        sum[0] += v[0]
        sum[1] += v[1]
    }

    return [sum[0] / len, sum[1] / len]
}

function calcCirclePolygonAxises(center, vertices) {
    const axises = []
    for (let i = 0; i < vertices.length; i++) {
        const va = vertices[i]
        const vb = vertices[(i + 1) % vertices.length]
        const edge = subtract(vb, va)
        const axis = [-edge[1], edge[0]]
        axises.push(axis)
    }

    const cp = findNearestPoint(center, vertices)
    axises.push(cp)

    return axises
}

function findNearestPoint(center, vertices) {
    let minDis = Number.POSITIVE_INFINITY
    let index = -1
    for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i]
        const dis = squaredDis(center, v)
        if (dis < minDis) {
            minDis = dis
            index = i
        }
    }
    return vertices[index]
}

function projectCircle(circle, axis) {
    const center = circle.center
    const radius = circle.radius
    const direction = normalize(axis)

    const p1 = add(center, scale(direction, radius))
    const p2 = subtract(center, scale(direction, radius))

    const min = dot(p1, direction)
    const max = dot(p2, direction)

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
    let min = Number.POSITIVE_INFINITY
    let max = Number.NEGATIVE_INFINITY
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
