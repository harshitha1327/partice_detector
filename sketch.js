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


let scanner1X = 0;
const scanner1Y = 0;

const scanner1Width = 50;
const scannerHeight = HEIGHT;

let scanner1Movement = 1;
let isScanner1End = 0;

const scanner1Start = 0;
const scanner1End = WIDTH / 2 - scanner1Width;
let scanner1Color = r.WHITE;

let scanner2X = WIDTH / 2;
const scanner2Y = 0;

const scanner2Width = 50;
const scanner2Height = HEIGHT;

let scanner2Movement = 2;
let isScanner2End = 0;

const scanner2Start = scanner2X;
const scanner2End = WIDTH - scanner2Width;
let scanner2Color = r.WHITE;

function update() {
    if (scanner1X === scanner1End && isScanner1End === 1) {
        isScanner1End = 0;
        scanner1Movement = -1;
    }
    if (scanner1X === scanner1Start && isScanner1End === 0) {
        isScanner1End = 1;
        scanner1Movement = 1;
    }
    scanner1X += scanner1Movement;

    if (scanner2X === scanner2End && isScanner2End === 1) {
        isScanner2End = 0;
        scanner2Movement = -2;
    }
    if (scanner2X === scanner2Start && isScanner2End === 0) {
        isScanner2End = 1;
        scanner2Movement = 2;
    }
    scanner2X += scanner2Movement;
}

const particle1X = 300;
const particle1Y = 0;

const particle1Width = 150;
const particle1Height = HEIGHT;

const particle2X = 600;
const particle2Y = 0;

const particle2Width = 15;
const particle2Height = HEIGHT;

function drawParticleFields() {
    r.DrawRectangle(particle1X, particle1Y, particle1Width, particle1Height, r.SKYBLUE);
    r.DrawRectangle(particle2X, particle2Y, particle2Width, particle2Height, r.SKYBLUE);
}

function drawScanners() {
    r.DrawRectangle(scanner1X, scanner1Y, scanner1Width, scannerHeight, scanner1Color);
    r.DrawRectangle(scanner2X, scanner2Y, scanner2Width, scanner2Height, scanner2Color);
    r.DrawRectangle(0, 0, WIDTH, 50, r.WHITE);
}

function isParticleDetected(scannerX, scannerWidth, particleX, particleWidth) {
    const scannerRange = scannerX + scannerWidth;
    const particleRange = particleX + particleWidth;

    return !(scannerRange < particleX || particleRange < scannerX)
}

function scannerColor(particleDetected) {
    return particleDetected ? r.RED : r.WHITE;
}

function particleDetector() {
    const particleDetected1 = isParticleDetected(scanner1X, scanner1Width, particle1X, particle1Width)
    scanner1Color = scannerColor(particleDetected1);

    const particleDetected2 = isParticleDetected(scanner2X, scanner2Width, particle2X, particle2Width);
    scanner2Color = scannerColor(particleDetected2);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticleFields();
    drawScanners();
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
