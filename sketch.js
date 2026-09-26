const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

const WIDTH = 900;
const HEIGHT = 600;
const FPS = 100;

function setup() {
    r.InitWindow(WIDTH, HEIGHT, "Particle scanner");
    r.SetTargetFPS(FPS);
}

let scannerMovement = 1;
let scannerEnd = 0;

let scannerX = 0;
const scannerY = 0;
const scannerWidth = 50;
const scannerHeight = HEIGHT;

function update() {
    if (scannerX === (WIDTH - scannerWidth) && scannerEnd === 1) {
        scannerEnd = 0;
        scannerMovement = -1;
    }
    if (scannerX === 0 && scannerEnd === 0) {
        scannerEnd = 1;
        scannerMovement = 1;
    }

    scannerX += scannerMovement;
}


function drawParticleField() {

    const particleX = 300;
    const particleY = 0;

    const particleWidth = 150;
    const particleHeight = HEIGHT;

    r.DrawRectangle(particleX, particleY, particleWidth, particleHeight, r.SKYBLUE);
}

function drawScanner() {
    r.DrawRectangle(scannerX, scannerY, scannerWidth, scannerHeight, r.WHITE);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticleField();
    drawScanner();

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
