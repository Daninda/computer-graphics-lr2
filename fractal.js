const width = 800;
const height = 800;
const minX = -1;
const maxX = 1;
const minY = -1;
const maxY = 1;
const maxN = 100;
const maxZ = 2;
const cX = 0.55;
const cY = 0.55;
var windoww = maxX - minX;
var v = (maxY + minY) / 2;
var h = (minX + maxX) / 2;
var mminX = minX, mmaxX = maxX, mminY = minY, mmaxY = mmaxY;

var slider = document.getElementById('scale');
slider.oninput = function() {
    windoww = (1 - this.value / 100) * (maxX - minX);
    setPixels();
}

var vertic = document.getElementById('vertic');
vertic.oninput = function() {
    v = (this.value / 100) * (maxY - minY) + minY;
    setPixels();
}

var horiz = document.getElementById('horiz');
horiz.oninput = function() {
    h = (this.value / 100) * (maxX - minX) + minX;
    setPixels();
}

slider.value = 1;
vertic.value = 50;
horiz.value = 50;

var button = document.getElementById('btn-succes');
button.onclick = function() {
    
}

var canvas = document.getElementById('fractal');
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext('2d');

setPixels();

var i, j, n, x, y, dx, dy;
function setPixels () {
    mminX = h - windoww / 2;
    mmaxX = h + windoww / 2;
    mminY = v + windoww / 2;
    mmaxY = v - windoww / 2;
    dx = (mmaxX - mminX) / width;
    dy = (mmaxY - mminY) / height;
    for(i = 0; i < width; i += 1) {
        for(j = 0; j < height; j += 1) {
            n = 0;
            x = i * dx + mminX;
            y = j * dy + mminY;
            while (n < maxN && Math.sqrt(x*x + y*y) < maxZ) {
                xx = Math.pow(x, 4) +  Math.pow(y, 4) - 6*Math.pow(x, 2)*Math.pow(y, 2) + cX;
                yy = 4*Math.pow(x, 3)*y - 4*x*Math.pow(y, 3) + cY;
                x = xx;
                y = yy;
                n++;
            }
            ctx.fillStyle = getColor(n);
            ctx.fillRect(i, j, 1, 1);
        }
    }
}

var c, r, g, b;
function getColor(n) {
    c = n / maxN * 255;
    r = 0;
    g = 0;
    b = 0;
    if (c < 36) {
        b = c / 35 * 255;
    }
    else if (c < 62) {
        g = (62 - c) / 25 * 255;
        b = 255;
    }
    else if (c < 108) {
        g = 255;
        b = 255 - (108 - c) / 35 * 255;
    }
    else if (c < 144) {
        g = 255;
        r = (144 - c) / 35 * 255;
    }
    else if (c < 180) {
        r = 255;
        g = 255 - (180 - c) / 35 * 255;
    }
    else if (c < 216) {
        r = 255;
        b = (216 - c) / 35 * 255;
    }
    else {
        b = 255;
        r = 255 - (255 - c) / 35 * 255;
    }
    return "rgb(" + r + ", " + g + ", " + b + ")";
}