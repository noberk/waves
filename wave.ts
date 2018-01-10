
var mViewWidth: number;
var mViewHeight: number;
var mLevelLine: number;
var mcanvasIDHeight: number = 80;
var mcanvasIDWidth: number = 200;
var mLeftSide: number;
var mMoveLen: number;
var SPEED: number = 1.7;
var mPointsList = [];
var isMeasured: boolean = false;
var bezierList = {};
var jqueryCanvasId = '#canvasID';
var HTMLCanvasId = 'canvasID';
var ctx: CanvasRenderingContext2D = (document.getElementById("canvasID") as HTMLCanvasElement).getContext('2d');


class BezierPoint {
    start: Point;
    control: Point;
    dest: Point;
}
class Point {
    constructor(public x: number = 0, public y: number = 0) { }
}



document.onscroll = function () {

    $(jqueryCanvasId).css("bottom", -$(document).scrollTop() + "px");
}
window.onresize = function () {
    var bodyElement = $("body");
    var bodyWidth = bodyElement.css("width");
    var bodyHeight = bodyElement.css("height");
    var visibleWidth = $(window).width();

    if (visibleWidth <= $(".w").first().width()) {
        visibleWidth = $(".w").first().width();
    }
    $(jqueryCanvasId).attr("width", visibleWidth);

}

$(function () {

    renderByDefaultSize();

});
function renderByDefaultSize(): void {
    var visibleWidth = $(window).width();
    $(jqueryCanvasId).attr("width", visibleWidth);
}

function createWave(context: CanvasRenderingContext2D, beginBezierPoint: BezierPoint, times: number, canvasWidth: number, rise: number, pureColor: WaveMaterial = "red"): void {

    context.beginPath();
    var d = -1;
    for (var i = 0; i < times; i++) {
        context.moveTo(beginBezierPoint.start.x + (canvasWidth * i), beginBezierPoint.start.y);

        if (i % 2 == 0) {
            beginBezierPoint.control.y = beginBezierPoint.start.y + rise;
        } else {
            beginBezierPoint.control.y = beginBezierPoint.start.y - rise;
        }
        context.quadraticCurveTo(beginBezierPoint.control.x + (canvasWidth * i), beginBezierPoint.control.y,
            beginBezierPoint.dest.x + (canvasWidth * i), beginBezierPoint.dest.y);

        if (i + 1 == times) {
            context.lineTo(beginBezierPoint.dest.x + (canvasWidth * i), context.canvas.height);
            context.lineTo(0, context.canvas.height);
            context.lineTo(0, beginBezierPoint.start.y);
        }
    }

    context.stroke();
    context.fillStyle = pureColor;
    context.fill()



}
enum WaveColor {
    Pure = '#99e5ff',
    DarkBlood ='#ea5a5a',
    LightBlood ='#dd6767',
    VeryLightBlood='#eb8787',
}
type WaveMaterial = string | CanvasGradient | CanvasPattern ;
interface WaveOption {
    rise: number;
    increment: number;
    speed: number;
    waveWidth: number;
    waterLine: number;
    material?: WaveMaterial;
}

var waves: Array<WaveOption> = [
    { rise: 40, increment: 5, speed: 2.5, waveWidth: 600, waterLine: 300, material: WaveColor.DarkBlood },
    { rise: 60, increment: 6, speed: 4, waveWidth: 600, waterLine: 300, material: WaveColor.LightBlood },
    { rise: 90, increment: 7, speed: 6, waveWidth: 600, waterLine: 300, material: WaveColor.VeryLightBlood},
]


setInterval((water: WaveOption[] = waves) => {

    var times = 500; //测试 需要优化
    let firstBzer = new BezierPoint();

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    water.forEach(wave => {
        let bzer = new BezierPoint();

        wave.increment -= wave.speed;

        bzer.start = new Point(wave.increment, wave.waterLine);
        bzer.control = new Point(wave.waveWidth / 2 + wave.increment, wave.waterLine - wave.rise)
        bzer.dest = new Point(wave.waveWidth + wave.increment, wave.waterLine)

        createWave(ctx, bzer, times, wave.waveWidth, wave.rise, wave.material)
    })

}, 10);



