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
const scanner1Start = 0;
const scanner1End = WIDTH / 2 - scanner1Width;
let scanner1Color = r.WHITE;


let scanner2X = WIDTH / 2;
const scanner2Y = 0;

const scanner2Width = 50;
const scanner2Height = HEIGHT;

let scanner2Movement = 2;
const scanner2Start = scanner2X;
const scanner2End = WIDTH - scanner2Width;
let scanner2Color = r.WHITE;


const scanner3X = 0;
let scanner3Y = 0;

const scanner3Width = WIDTH;
const scanner3Height = 50;

let scanner3Movement = 1;
const scanner3Start = 0;
const scanner3End = HEIGHT - scanner3Height;
let scanner3Color = r.WHITE;

function update() {
    if (scanner1X === scanner1End) {
        scanner1Movement = -1;
    }
    if (scanner1X === scanner1Start) {
        scanner1Movement = 1;
    }
    scanner1X += scanner1Movement;

    if (scanner2X === scanner2End) {
        scanner2Movement = -2;
    }
    if (scanner2X === scanner2Start) {
        scanner2Movement = 2;
    }
    scanner2X += scanner2Movement;

    if (scanner3Y === scanner3End) {
        scanner3Movement = -1;
    }
    if (scanner3Y === scanner3Start) {
        scanner3Movement = 1;
    }
    scanner3Y += scanner3Movement;
}

const particleColor = r.BLUE;
const particle1X = 300;
const particle1Y = 0;

const particle1Width = 150;
const particle1Height = HEIGHT;

const particle2X = 600;
const particle2Y = 0;

const particle2Width = 15;
const particle2Height = HEIGHT;

const particle3X = 0;
const particle3Y = 230;

const particle3Width = WIDTH;
const particle3Height = 20;

function drawParticleFields() {
    r.DrawRectangle(particle1X, particle1Y, particle1Width, particle1Height, particleColor);
    r.DrawRectangle(particle2X, particle2Y, particle2Width, particle2Height, particleColor);
    r.DrawRectangle(particle3X, particle3Y, particle3Width, particle3Height, particleColor);
}

function drawScanners() {
    r.DrawRectangle(scanner1X, scanner1Y, scanner1Width, scannerHeight, scanner1Color);
    r.DrawRectangle(scanner2X, scanner2Y, scanner2Width, scanner2Height, scanner2Color);
    r.DrawRectangle(scanner3X, scanner3Y, scanner3Width, scanner3Height, scanner3Color);
}

function isParticleDetected(scannerCoordinate, scannerDimension, particleCoordinate, particleDimension) {
    const scannerRange = scannerCoordinate + scannerDimension;
    const particleRange = particleCoordinate + particleDimension;

    return !(scannerRange < particleCoordinate || particleRange < scannerCoordinate)
}

function scannerColor(particleDetected) {
    return particleDetected ? r.RED : r.WHITE;
}

function particleDetector() {
    const particleDetected1 = isParticleDetected(scanner1X, scanner1Width, particle1X, particle1Width)
    scanner1Color = scannerColor(particleDetected1);

    const particleDetected2 = isParticleDetected(scanner2X, scanner2Width, particle2X, particle2Width);
    scanner2Color = scannerColor(particleDetected2);

    const particleDetected3 = isParticleDetected(scanner3Y, scanner3Height, particle3Y, particle3Height);
    scanner3Color = scannerColor(particleDetected3);
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
