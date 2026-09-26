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

let scannerColor = r.WHITE;

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

const particleX = 300;
const particleY = 0;

const particleWidth = 150;
const particleHeight = HEIGHT;

const particle2X = 600;
const particle2Y = 0;

const particle2Width = 15;
const particle2Height = HEIGHT;

function drawParticleFields() {
    r.DrawRectangle(particleX, particleY, particleWidth, particleHeight, r.SKYBLUE);
    r.DrawRectangle(particle2X, particle2Y, particle2Width, particle2Height, r.SKYBLUE);
}

function drawScanner() {
    r.DrawRectangle(scannerX, scannerY, scannerWidth, scannerHeight, scannerColor);
}

function isParticleDetected(scannerX, scannerWidth, particleX, particleWidth) {
    const scannerRange = scannerX + scannerWidth;
    const particleRange = particleX + particleWidth;

    return !(scannerRange < particleX || particleRange < scannerX)
}

function changeScannerColor(particleDetected) {
    scannerColor = particleDetected ? r.RED : r.WHITE;
}

function particleDetector() {
    const particleDetected = (isParticleDetected(scannerX, scannerWidth, particleX, particleWidth)
        || isParticleDetected(scannerX, scannerWidth, particle2X, particle2Width));
    changeScannerColor(particleDetected);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticleFields();
    drawScanner();
    particleDetector();

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
