
/////////////////////////////////////////////////////// SOME VERY VERY USEFUL FUNCTIONS

const randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const rands = () => Math.random() < 0.5 ? -1 : 1;

/////////////////////////////////////////////////////// ELEMENTS

const horse = document.querySelector('#horse');
const horseSmokingReggie = document.querySelector('#horse-smoking-reggie');
const reggie = document.querySelector('#reggie');
const canvas = document.querySelector('canvas');

/////////////////////////////////////////////////////// VARIABLES

const c = canvas.getContext('2d');
const mouse = {};
const reggies = [];

/////////////////////////////////////////////////////// LOOP

const loop = () => {

  ///////////////////////////////////////////////////// CLEAR

  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);

  ///////////////////////////////////////////////////// ADD

  if (mouse.down) {
    reggies.push({
      x: mouse.x + 165,
      y: mouse.y - 110,
      r: Math.random() * Math.PI,
      s: 0.5 + Math.random() / 2,
      vx: Math.random() * rands() * 0.1,
      vy: -Math.random() * 2,
      vr: Math.random() * 0.1,
      vs: 0.01 + Math.random() * 0.1
    });
  }

  ///////////////////////////////////////////////////// ITERATE

  for (let i = reggies.length - 1; i >= 0; --i) {
    
    const r = reggies[i];

    r.x += r.vx;
    r.y += r.vy;
    r.r += r.vr;
    r.s -= r.vs;

    c.save();
    c.translate(r.x, r.y);
    c.rotate(r.r);
    c.scale(r.s, r.s);
    c.drawImage(reggie, -reggie.naturalWidth / 2, -reggie.naturalHeight / 2);
    c.restore();

    if (r.s < 0) reggies.splice(i, 1);
  }

  ///////////////////////////////////////////////////// DRAW THE HORSE

  c.drawImage(
    mouse.down ? horseSmokingReggie : horse,
    mouse.x - horse.naturalWidth,
    mouse.y - horse.naturalHeight,
    horse.naturalWidth * 2,
    horse.naturalHeight * 2
  );

  requestAnimationFrame(loop);
};

/////////////////////////////////////////////////////// EVENTS

addEventListener('load', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  c.imageSmoothingEnabled = false;
  requestAnimationFrame(loop);
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  c.imageSmoothingEnabled = false;
});

addEventListener('mousemove', ({x, y}) => {
  mouse.x = x;
  mouse.y = y;
});

addEventListener('mousedown', () => {
  mouse.down = true;
});

addEventListener('mouseup', () => {
  mouse.down = false;
});

addEventListener('touchmove', ({touches}) => {
  const t = touches[0];
  mouse.x = t.clientX;
  mouse.y = t.clientY;
});

addEventListener('touchstart', ({touches}) => {
  const t = touches[0];
  mouse.x = t.clientX;
  mouse.y = t.clientY;
  mouse.down = true;
});

addEventListener('touchend', ({}) => {
  mouse.down = false;
});