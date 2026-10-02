const r = require("raylib");

function isRangeOverlapped(range1, range2) {
    return range1.end > range2.start && range2.end > range1.start;
}

function drawRange(range, color) {
    r.DrawRectangle(range.start, 0, range.width, r.GetScreenHeight(), color);
}

module.exports = {
    isRangeOverlapped,
    drawRange,
}