const s = require("./screen.js");

const lower = 0;
const upper = s.HEIGHT;
let start = 0;
const height = 50;
let velocity = -1;
let hasDetected;

module.exports = {
    lower,
    upper,
    start,
    height,
    velocity,

};