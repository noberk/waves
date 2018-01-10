var mViewWidth;
var mViewHeight;
var mLevelLine;
var mcanvasIDHeight = 80;
var mcanvasIDWidth = 200;
var mLeftSide;
var mMoveLen;
var SPEED = 1.7;
var mPointsList = [];
var isMeasured = false;
var bezierList = {};
var jqueryCanvasId = '#canvasID';
var HTMLCanvasId = 'canvasID';
var ctx = document.getElementById("canvasID").getContext('2d');
var BezierPoint = (function () {
    function BezierPoint() {
    }
    return BezierPoint;
}());
var Point = (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    return Point;
}());
document.onscroll = function () {
    $(jqueryCanvasId).css("bottom", -$(document).scrollTop() + "px");
};
window.onresize = function () {
    var bodyElement = $("body");
    var bodyWidth = bodyElement.css("width");
    var bodyHeight = bodyElement.css("height");
    var visibleWidth = $(window).width();
    if (visibleWidth <= $(".w").first().width()) {
        visibleWidth = $(".w").first().width();
    }
    $(jqueryCanvasId).attr("width", visibleWidth);
};
$(function () {
    renderByDefaultSize();
});
function renderByDefaultSize() {
    var visibleWidth = $(window).width();
    $(jqueryCanvasId).attr("width", visibleWidth);
}
function createWave(context, beginBezierPoint, times, canvasWidth, rise, pureColor) {
    if (pureColor === void 0) { pureColor = "red"; }
    context.beginPath();
    var d = -1;
    for (var i = 0; i < times; i++) {
        context.moveTo(beginBezierPoint.start.x + (canvasWidth * i), beginBezierPoint.start.y);
        if (i % 2 == 0) {
            beginBezierPoint.control.y = beginBezierPoint.start.y + rise;
        }
        else {
            beginBezierPoint.control.y = beginBezierPoint.start.y - rise;
        }
        context.quadraticCurveTo(beginBezierPoint.control.x + (canvasWidth * i), beginBezierPoint.control.y, beginBezierPoint.dest.x + (canvasWidth * i), beginBezierPoint.dest.y);
        if (i + 1 == times) {
            context.lineTo(beginBezierPoint.dest.x + (canvasWidth * i), context.canvas.height);
            context.lineTo(0, context.canvas.height);
            context.lineTo(0, beginBezierPoint.start.y);
        }
    }
    context.stroke();
    context.fillStyle = pureColor;
    context.fill();
}
var WaveColor;
(function (WaveColor) {
    WaveColor["Pure"] = "#99e5ff";
    WaveColor["DarkBlood"] = "#ea5a5a";
    WaveColor["LightBlood"] = "#dd6767";
    WaveColor["VeryLightBlood"] = "#eb8787";
})(WaveColor || (WaveColor = {}));
var waves = [
    { rise: 40, increment: 5, speed: 2.5, waveWidth: 600, waterLine: 300, material: WaveColor.DarkBlood },
    { rise: 60, increment: 6, speed: 4, waveWidth: 600, waterLine: 300, material: WaveColor.LightBlood },
    { rise: 90, increment: 7, speed: 6, waveWidth: 600, waterLine: 300, material: WaveColor.VeryLightBlood },
];
setInterval(function (water) {
    if (water === void 0) { water = waves; }
    var times = 500; //测试 需要优化
    var firstBzer = new BezierPoint();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    water.forEach(function (wave) {
        var bzer = new BezierPoint();
        wave.increment -= wave.speed;
        bzer.start = new Point(wave.increment, wave.waterLine);
        bzer.control = new Point(wave.waveWidth / 2 + wave.increment, wave.waterLine - wave.rise);
        bzer.dest = new Point(wave.waveWidth + wave.increment, wave.waterLine);
        createWave(ctx, bzer, times, wave.waveWidth, wave.rise, wave.material);
    });
}, 10);
