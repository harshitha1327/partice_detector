const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

const WIDTH = 600;
const HEIGHT = 400;
const FPS = 100;

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Particle detector");
    r.SetTargetFPS(FPS);
}


let detector1Start = 0;
const detector1Width = 50;
let detector1Velocity = -1;
const detector1Lower = 0;
const detector1Upper = WIDTH / 2;
let hasDetected1 = false;

let detector2Start = WIDTH / 2;
const detector2Width = 50;
let detector2Velocity = -2;
const detector2Lower = detector2Start;
const detector2Upper = WIDTH;
let hasDetected2 = false;


let detector3Start = 0;
const detector3Height = 50;
let detector3Velocity = -1;
const detector3Lower = 0;
const detector3Upper = HEIGHT;
let hasDetected3;

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

    const detector1End = detector1Start + detector1Width;
    const detector2End = detector2Start + detector2Width;
    const detector3End = detector3Start + detector3Height; // Vertical Detector.

    detector1Velocity = getDetectorVelocity(detector1Start, detector1End, detector1Velocity, detector1Upper, detector1Lower);
    detector1Start = getDetectorStart(detector1Start, detector1Velocity);

    hasDetected1 = overlapParticleFields(particle1Start, particle1End, particle2Start, particle2End, detector1Start, detector1End);

    detector2Velocity = getDetectorVelocity(detector2Start, detector2End, detector2Velocity, detector2Upper, detector2Lower);
    detector2Start = getDetectorStart(detector2Start, detector2Velocity);

    hasDetected2 = overlapParticleFields(particle1Start, particle1End, particle2Start, particle2End, detector2Start, detector2Width);

    detector3Velocity = getDetectorVelocity(detector3Start, detector3End, detector3Velocity, detector3Upper, detector3Lower);
    detector3Start = getDetectorStart(detector3Start, detector3Velocity);

    hasDetected3 = isDetectorOverlapped(particle3Start, particle3End, detector3Start, detector3End);
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

    drawHorizontalDetector(detector1Start, detector1Width, getDetectorColor(hasDetected1));
    drawHorizontalDetector(detector2Start, detector2Width, getDetectorColor(hasDetected2));
    drawVerticalDetector(detector3Start, detector3Height, getDetectorColor(hasDetected3));

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


// const detectorHeight = HEIGHT;
// const detector1Y = 0;

// const detector2Y = 0;
// const detector2Height = HEIGHT;

// let detector3X = 0;
// const detector3Width = WIDTH;

// const particle1Y = 0;
// const particle1Height = HEIGHT;

// const particle2Y = 0;
// const particle2Height = HEIGHT;

// const particle3X = 0;
// const particle3Width = WIDTH;

// function drawParticleField(particleX, particleY, particleWidth, particleHeight) {
//     r.DrawRectangle(particleX, particleY, particleWidth, particleHeight, particleColor);
// }

// drawParticleField(particle1Start, particle1Y, particle1Width, particle1Height);
// drawParticleField(particle2Start, particle2Y, particle2Width, particle2Height);
// drawParticleField(particle3X, particle3Start, particle3Width, particle3Height);