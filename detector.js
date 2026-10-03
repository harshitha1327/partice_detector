const range = require("./range");

function isDetectorOutOfBound(d) {
    return (d.start <= d.lower) || (d.end >= d.upper);
}

function getDetectorVelocity(d) {
    d.velocity = isDetectorOutOfBound(d) ? -(d.velocity) : d.velocity;
    return d;
}

function getDetectorStart(d) {
    d.start += d.velocity;
    return d;
}

function createDetector(start, dimension, upper, lower, velocity, isHorizontal) {
    return isHorizontal ? { start, width: dimension, upper, lower, velocity, isHorizontal } : { start, height: dimension, upper, lower, velocity, isHorizontal };
}

function areParticlesOverlapped(d, p1, p2) {
    return (range.isRangeOverlapped(p1, d) || range.isRangeOverlapped(p2, d));
}

function update(d, p1, p2) {
    d.end = d.start + (d.isHorizontal ? d.width : d.height);
    d = getDetectorVelocity(d);
    d = getDetectorStart(d);
    d.hasDetected = areParticlesOverlapped(d, p1, p2)
    return d;
}

function getDetectorColor(hasDetected) {
    return hasDetected ? { r: 255, g: 0, b: 0, a: 100, } : { r: 255, g: 255, b: 255, a: 180 };
}

function draw(detector) {
    range.drawRange(detector, getDetectorColor(detector.hasDetected));
}

module.exports = {
    createDetector,
    update,
    draw,
};