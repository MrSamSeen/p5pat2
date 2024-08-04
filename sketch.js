let startD;
let pixels;
let pixelSize = 12;
let drawX = 0;
let drawY = 0;
let drawRed = 100;
let drawGreen = 100;
let drawBlue = 100;
let drawStep = 1.6;
let pixelDensity = 40;
function setup() {
  pixels = [];
  startD = false;
  frameRate(30);
  pixelDensity = gup('p');

  createCanvas(windowWidth, windowHeight);
  background(30);
  pixelSize = floor(Math.min(width, height) / pixelDensity);
  drawX = floor(width / 2 / pixelSize) * pixelSize;
  drawY = floor(height / 2 / pixelSize) * pixelSize;
  setTimeout(() => {
    startD = true;
  }, 500);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(30);
}

function gup(name) {
  name = RegExp('[?&]' + name.replace(/([[\]])/, '\\$1') + '=([^&#]*)');
  if (!window.location.href.match(name)) {
    return 40;
  }
  return (window.location.href.match(name) || ['', ''])[1];
}
function getNextX(curX) {
  curX += Math.round(random(-drawStep, drawStep)) * pixelSize;
  if (curX < 0) {
    curX = 0;
  }
  if (curX > width) {
    curX = Math.floor(width / pixelSize) * pixelSize;
  }
  return curX;
}

function getNextY(curY) {
  curY += Math.round(random(-drawStep, drawStep)) * pixelSize;
  if (curY < 0) {
    curY = 0;
  }
  if (curY > height) {
    curY = Math.floor(height / pixelSize) * pixelSize;
  }
  return curY;
}

function nextColor(curColor) {
  curColor += Math.round(random(-5, 5)) * 2;
  if (curColor < 50) {
    curColor = 50;
  }
  if (curColor > 255) {
    curColor = 255;
  }
  return curColor;
}

function draw() {
  if (!startD) {
    return;
  }

  pixels.push(new pixel(drawX = getNextX(drawX), drawY = getNextY(drawY), random(pixelSize / 5, pixelSize), drawRed = nextColor(drawRed), drawGreen = nextColor(drawGreen), drawBlue = nextColor(drawBlue)));

  if (frameCount % 2 == 0) {
    background(30);
    for (let i = 0; i < pixels.length; i++) {
      if (pixels[i].life <= 0) {
        pixels.splice(i, 1);
      } else {
        pixels[i].show();
      }
    }
  }
}

class pixel {

  constructor(x = 0, y = 0, s = 10, r = 0, g = 0, b = 0) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.s = s;
    this.life = 3000;
  }

  show() {

    if (this.life > 0) {
      this.life--;
      fill(this.r, this.g, this.b, this.opaque(this.life, 3000));
      stroke(this.bright(this.r), this.bright(this.g), this.bright(this.b), this.opaque(this.life, 3000));

      rect(this.x + (pixelSize - this.s) / 2, this.y + (pixelSize - this.s) / 2, this.s, this.s, abs(pixelSize - this.s * 1.5));
    }
  }
  bright(val) {
    return map(val, 0, 255, 50, 255);
  }
  opaque(val, max) {
    return map(val, 0, max, 50, 200);
  }
}