function isDetectorOutOfBound(start, end, upper, lower) {
    return (start < lower) || (end > upper);
}

function getDetectorVelocity(start, end, velocity, upper, lower) {
    return isDetectorOutOfBound(start, end, upper, lower) ? -velocity : velocity;
}

function getDetectorStart(start, velocity) {
    return start + velocity;
}

module.exports = {
    isDetectorOutOfBound,
    getDetectorVelocity,
    getDetectorStart,
};