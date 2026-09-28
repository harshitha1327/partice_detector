const r = require("raylib");

const s = require("./screen.js");
const d1 = require("./d1.js");
const d2 = require("./d2.js");
const d3 = require("./d3.js");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(s.WIDTH, s.HEIGHT, "Particle detector");
    r.SetTargetFPS(s.FPS);
}

const particle1Start = 200;
const particle1Width = 100;

const particle2Start = 400;
const particle2Width = 30;

const particle3Start = 230;
const particle3Height = 20;

function isDetectorOutOfBound(start, end, upper, lower) {
    return (start < lower) || (end > upper);
}

function getDetectorVelocity(start, end, velocity, upper, lower) {
    return isDetectorOutOfBound(start, end, upper, lower) ? -velocity : velocity;
}

function getDetectorStart(start, velocity) {
    return start + velocity;
}

function update() {
    const particle1End = particle1Start + particle1Width;
    const particle2End = particle2Start + particle2Width;
    const particle3End = particle3Start + particle3Height; // Vertical Particle.

    const detector1End = d1.start + d1.width;
    const detector2End = d2.start + d2.width;
    const detector3End = d3.start + d3.height; // Vertical Detector.

    d1.velocity = getDetectorVelocity(d1.start, detector1End, d1.velocity, d1.upper, d1.lower);
    d1.start = getDetectorStart(d1.start, d1.velocity);

    d1.hasDetected = overlapParticleFields(particle1Start, particle1End, particle2Start, particle2End, d1.start, detector1End);

    d2.velocity = getDetectorVelocity(d2.start, detector2End, d2.velocity, d2.upper, d2.lower);
    d2.start = getDetectorStart(d2.start, d2.velocity);

    d2.hasDetected = overlapParticleFields(particle1Start, particle1End, particle2Start, particle2End, d2.start, detector2End);

    d3.velocity = getDetectorVelocity(d3.start, detector3End, d3.velocity, d3.upper, d3.lower);
    d3.start = getDetectorStart(d3.start, d3.velocity);

    d3.hasDetected = isDetectorOverlapped(particle3Start, particle3End, d3.start, detector3End);
}

function drawHorizonalParticleField(particleStart, particleWidth) {
    r.DrawRectangle(particleStart, 0, particleWidth, r.GetScreenHeight(), r.SKYBLUE);
}

function drawVerticalParticleField(particleStart, particleHeight) {
    r.DrawRectangle(0, particleStart, r.GetScreenWidth(), particleHeight, r.SKYBLUE);
}

function drawHorizontalDetector(detectorStart, detectorWidth, color) {
    r.DrawRectangle(detectorStart, 0, detectorWidth, r.GetScreenHeight(), color);
}

function drawVerticalDetector(detectorStart, detectorHeight, color) {
    r.DrawRectangle(0, detectorStart, r.GetScreenWidth(), detectorHeight, color);

}

function overlapParticleFields(particle1Start, particle1End, particle2Start, particle2End, detectorStart, detectorEnd) {
    return (isDetectorOverlapped(detectorStart, detectorEnd, particle1Start, particle1End) || isDetectorOverlapped(detectorStart, detectorEnd, particle2Start, particle2End));
}

function isDetectorOverlapped(start1, end1, start2, end2) {
    return !(end1 < start2 || end2 < start1);
}

function getDetectorColor(hasDetected) {
    return hasDetected ? r.RED : r.WHITE;
}


function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);


    drawHorizonalParticleField(particle1Start, particle1Width);
    drawHorizonalParticleField(particle2Start, particle2Width);
    drawVerticalParticleField(particle3Start, particle3Height);

    drawHorizontalDetector(d1.start, d1.width, getDetectorColor(d1.hasDetected));
    drawHorizontalDetector(d2.start, d2.width, getDetectorColor(d2.hasDetected));
    drawVerticalDetector(d3.start, d3.height, getDetectorColor(d3.hasDetected));

    r.EndDrawing();
}

function teardown() {
    return r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};


