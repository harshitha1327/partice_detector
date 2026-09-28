const s = require("./screen.js");

let start = s.WIDTH / 2;
const width = 50;
let velocity = -2;
let hasDetected = false;
const lower = s.WIDTH / 2;
const upper = s.WIDTH;

module.exports = {
    start,
    width,
    velocity,
    hasDetected,
    lower,
    upper,
}