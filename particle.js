const range = require("./range");
const r = require("raylib");

function createParticle(start, dimension, isHorizontal) {
    return isHorizontal ? { start, width: dimension, end: dimension + start, isHorizontal } : { start, height: dimension, end: dimension + start, isHorizontal };
}

function draw(particle) {
    range.drawRange(particle, r.SKYBLUE);
}

module.exports = {
    createParticle,
    draw,
}