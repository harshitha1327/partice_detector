const sketch = require("./sketch");

function loop(world) {
    while (sketch.running(world)) {
        sketch.update(world);
        sketch.draw(world);
    }
}

function main() {
    const width = 600
    const height = 400;
    const title = "Particle Detector";
    const fps = 100;
    const world = {};
    sketch.setup(width, height, title, fps, world);
    loop(world);
    sketch.teardown();
}

main();