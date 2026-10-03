const r = require("raylib");
const d = require("./detector.js");
const p = require("./particle.js");

function running() {
    return !r.WindowShouldClose();
}

function setup(width, height, title, fps, world) {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, height, title);
    r.SetTargetFPS(fps);

    world.d1 = d.createDetector(0, 50, width / 2, 0, -1, true);
    world.d2 = d.createDetector(width / 2, 50, width, width / 2, -2, true);
    world.d3 = d.createDetector(0, 50, height, 0, -1, false);

    world.particle1 = p.createParticle(200, 100, true);
    world.particle2 = p.createParticle(400, 30, true);
    world.particle3 = p.createParticle(230, 20, false);

}

function update(world) {
    world.d1 = d.update(world.d1, world.particle1, world.particle2);
    world.d2 = d.update(world.d2, world.particle1, world.particle2);
    world.d3 = d.update(world.d3, world.particle3);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    p.draw(world.particle1);
    p.draw(world.particle2);
    p.draw(world.particle3);

    d.draw(world.d1);
    d.draw(world.d2);
    d.draw(world.d3);

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
