var width = 300;
var height = 300;
var minX = -1;
var maxX = 1;
var minY = -1.2;
var maxY = 1.2;
var maxN = 1000;
var maxZ = 2;
var cX = 0.36;
var cY = 0.36;

var canvas = document.getElementById('fractal');
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext('2d');

setPixels();

function setPixels () {
    var dx = (maxX - minX) / width;
    var dy = (maxY - minY) / height;
    var n, x, y;
    for(var i = 0; i < width; i++) {
        for(var j = 0; j < height; j++) {
            n = 0;
            x = i * dx + minX;
            y = j * dy + minY;
            while (++n < maxN) {
                x2 = x*x - y*y;
                y2 = 2*x*y;
                x4 = x2*x2 - y2*y2;
                y4 = 2*x2*y2;
                x = x4 + cX;
                y = y4 + cY;
                if (Math.sqrt(x*x + y*y) > maxZ) break;
            }
            if (i == 50 && j == 50) alert(n);
            ctx.fillStyle = "rgb(" + n / maxN * 255 + ", " + n / maxN * 255 + ", " + n / maxN * 255 + ")";
            ctx.fillRect(i, j, 1, 1);
        }
    }
}