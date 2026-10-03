const r = require("raylib");

function isRangeOverlapped(range1, range2) {
    if (range1 === undefined || range2 === undefined) return;

    return range1.end > range2.start && range2.end > range1.start;
}

function drawRange(range, color) {
    return (range.isHorizontal) ? r.DrawRectangle(range.start, 0, range.width, r.GetScreenHeight(), color) : r.DrawRectangle(0, range.start, r.GetScreenWidth(), range.height, color);
}

module.exports = {
    isRangeOverlapped,
    drawRange,
}