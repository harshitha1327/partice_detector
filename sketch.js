const r = require("raylib");
const d = require("./detector.js");
const p = require("./particle.js");

let d1 = {};
let d2 = {};

let particle1 = {};
let particle2 = {};

let d3 = {};
let particle3 = {
    start: 230,
    height: 20,
};

function running() {
    return !r.WindowShouldClose();
}

function setup(width, height, title, fps) {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, height, title);
    r.SetTargetFPS(fps);

    d1 = d.createDetector(0, 50, width / 2, 0, -1);
    d2 = d.createDetector(width / 2, 50, width, width / 2, -2);

    particle1 = p.createParticle(200, 100);
    particle2 = p.createParticle(400, 30);

    particle1.end = particle1.start + particle1.width;
    particle2.end = particle2.start + particle2.width;

    // d3 =createDetector();
    // particle3.end = particle3.start + particle3.height;
}


function update() {
    d1 = d.update(d1, particle1, particle2);
    d2 = d.update(d2, particle1, particle2);

    // d3.end = d3.start + d3.height;
    // d3.velocity = d.getDetectorVelocity(d3);
    // d3.start = d.getDetectorStart(d3);
    // d3.hasDetected = isDetectorOverlapped(d3, particle3);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    p.draw(particle1);
    p.draw(particle2);

    d.draw(d1);
    d.draw(d2);

    // drawVerticalRange(particle3);
    // drawVerticalDetector(d3, getDetectorColor(d3.hasDetected));

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
