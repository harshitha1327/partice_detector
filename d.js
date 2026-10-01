function isDetectorOutOfBound(start, end, upper, lower) {
    return (start < lower) || (end > upper);
}

function getDetectorVelocity(d) {
    return isDetectorOutOfBound(d.start, d.end, d.upper, d.lower) ? -(d.velocity) : d.velocity;
}

function getDetectorStart(d) {
    return d.start + d.velocity;
}

module.exports = {
    isDetectorOutOfBound,
    getDetectorVelocity,
    getDetectorStart,
};