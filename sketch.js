let video;
let asciiDiv;
const density = ' .:-i|=+%O#@1W$abc+$@}'; // yoğunluk dizisini optimize ediyoruz

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(80, 60); // video boyutunu ASCII çıktısına daha uyumlu hale getiriyoruz
  video.hide(); // video öğesini gizleyerek sadece ASCII çıktısını gösteriyoruz
  asciiDiv = createDiv();
}

function draw() {
  background(220);

  if (video.loadedmetadata) {
    let asciiImage = "";
    video.loadPixels();
    for (let j = 0; j < video.height; j++) {
      for (let i = 0; i < video.width; i++) {
        const pixelIndex = (i + j * video.width) * 4;
        const r = video.pixels[pixelIndex];
        const g = video.pixels[pixelIndex + 1];
        const b = video.pixels[pixelIndex + 2];
        const avg = (r + g + b) / 3;
        const charIndex = floor(map(avg, 0, 255, 0, density.length));
        const c = density.charAt(charIndex);
        asciiImage += c === ' ' ? '&nbsp;' : c;
      }
      asciiImage += '<br/>';
    }
    asciiDiv.html(asciiImage);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
