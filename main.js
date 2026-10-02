const sketch = require("./sketch");

function loop() {
    while (sketch.running()) {
        sketch.update();
        sketch.draw();
    }
}

function main() {
    const width = 600, height = 400, title = "Particle Detector", fps = 100;
    sketch.setup(width, height, title, fps);
    loop();
    sketch.teardown();
}

main();