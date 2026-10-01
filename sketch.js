const r = require("raylib");

const w = {
    WIDTH: 600,
    HEIGHT: 400,
    FPS: 100,
};

const d1 = {};
const d2 = {};
const d3 = {};
const d = require("./d.js");

const particle1 = {
    start: 200,
    width: 100,
};

const particle2 = {
    start: 400,
    width: 30,
};

const particle3 = {
    start: 230,
    height: 20,
};

const transparentRed = {
    r: 255,
    g: 0,
    b: 0,
    a: 100,
};

const transparentWhite = {
    r: 255,
    g: 255,
    b: 255,
    a: 180,
}

function running() {
    return !r.WindowShouldClose();
}

function init() {
    d1.start = 0;
    d1.end = 0;
    d1.width = 50;
    d1.velocity = -1;
    d1.hasDetected = false;
    d1.upper = w.WIDTH / 2;
    d1.lower = 0;

    d2.start = w.WIDTH / 2;
    d2.end = 0;
    d2.width = 50;
    d2.velocity = -2
    d2.hasDetected = false;
    d2.upper = w.WIDTH;
    d2.lower = w.WIDTH / 2;

    d3.start = 0;
    d3.end = 0;
    d3.height = 50;
    d3.velocity = -1;
    d3.hasDetected = false;
    d3.upper = w.HEIGHT;
    d3.lower = 0;

    particle1.end = particle1.start + particle1.width;
    particle2.end = particle2.start + particle2.width;
    particle3.end = particle3.start + particle3.height; // Vertical Particle.
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(w.WIDTH, w.HEIGHT, "Particle detector");
    r.SetTargetFPS(w.FPS);

    init();
}


function update() {
    d1.end = d1.start + d1.width;
    d2.end = d2.start + d2.width;
    d3.end = d3.start + d3.height; // Vertical Detector.

    d1.velocity = d.getDetectorVelocity(d1);
    d1.start = d.getDetectorStart(d1);
    d1.hasDetected = overlapParticleFields(particle1, particle2, d1);

    d2.velocity = d.getDetectorVelocity(d2);
    d2.start = d.getDetectorStart(d2);
    d2.hasDetected = overlapParticleFields(particle1, particle2, d2);

    d3.velocity = d.getDetectorVelocity(d3);
    d3.start = d.getDetectorStart(d3);
    d3.hasDetected = isDetectorOverlapped(d3, particle3);
}

function drawHorizonalParticleField(particle) {
    r.DrawRectangle(particle.start, 0, particle.width, w.HEIGHT, r.SKYBLUE);
}

function drawVerticalParticleField(particle) {
    r.DrawRectangle(0, particle.start, w.WIDTH, particle.height, r.SKYBLUE);
}

function drawHorizontalDetector(detector, color) {
    r.DrawRectangle(detector.start, 0, detector.width, w.HEIGHT, color);
}

function drawVerticalDetector(detector, color) {
    r.DrawRectangle(0, detector.start, w.WIDTH, detector.height, color);
}

function overlapParticleFields(particle1, particle2, detector) {
    return (isDetectorOverlapped(particle1, detector) || isDetectorOverlapped(particle2, detector));
}

function isDetectorOverlapped(particle, detector) {
    return particle.end > detector.start && detector.end > particle.start;
}

function getDetectorColor(hasDetected) {
    return hasDetected ? transparentRed : transparentWhite;
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawHorizonalParticleField(particle1);
    drawHorizonalParticleField(particle2);
    drawVerticalParticleField(particle3);

    drawHorizontalDetector(d1, getDetectorColor(d1.hasDetected));
    drawHorizontalDetector(d2, getDetectorColor(d2.hasDetected));
    drawVerticalDetector(d3, getDetectorColor(d3.hasDetected));

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
