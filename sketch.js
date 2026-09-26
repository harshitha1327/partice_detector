const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

const WIDTH = 1000;
const HEIGHT = 700;
const FPS = 100;

function setup() {
    r.InitWindow(WIDTH, HEIGHT, "Particle detector");
    r.SetTargetFPS(FPS);
}

let detectorIncrement = 1;
let detectorEnd = 0;

let detectorX = 0;
const detectorY = 0;
const detectorWidth = 50;
const detectorHeight = HEIGHT;

function update() {
    if (detectorX === (WIDTH - detectorWidth) && detectorEnd === 1) {
        detectorEnd = 0;
        detectorIncrement = -1;
    }
    if (detectorX === 0 && detectorEnd === 0) {
        detectorEnd = 1;
        detectorIncrement = 1;
    }

    detectorX += detectorIncrement;
}


function drawDetector() {
    r.DrawRectangle(detectorX, detectorY, detectorWidth, detectorHeight, r.WHITE);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawDetector();

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
