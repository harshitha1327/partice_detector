const range = require("./range");
const r = require("raylib");

function createParticle(start, width) {
    return { start, width };
}

function draw(particle) {
    range.drawRange(particle, r.SKYBLUE);
}

module.exports = {
    createParticle,
    draw,
}