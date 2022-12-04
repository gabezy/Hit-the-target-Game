const canvas = document.querySelector("canvas");
const pencil = canvas.getContext("2d");
const scoreboard = document.querySelector(".score");
const btn = document.querySelector("button");
const radius = 10;
let score = 0;

scoreboard.innerText = score;

const colorCanvas = () => {
  pencil.fillStyle = "lightgrey";
  pencil.fillRect(0, 0, 600, 400);
};

const clearCanvas = () => {
  pencil.clearRect(0, 0, 600, 400);
};

const drawCircle = (x, y, radius, color) => {
  pencil.fillStyle = color;
  pencil.beginPath();
  pencil.arc(x, y, radius, 0, 2 * Math.PI);
  pencil.fill();
};

const drawtarget = (x, y) => {
  drawCircle(x, y, radius + 20, "red");
  drawCircle(x, y, radius + 10, "white");
  drawCircle(x, y, radius, "red");
  canvas.addEventListener("click", shoot);
};

const raffleMax = (max) => {
  return Math.round(Math.random() * max);
};

let targetX = raffleMax(600);
let targetY = raffleMax(400);

function updateTarget() {
  targetX = raffleMax(600);
  targetY = raffleMax(400);
  drawtarget(targetX, targetY);
}

function shoot(e) {
  const x = e.x - canvas.offsetLeft;
  const y = e.y - canvas.offsetTop;

  const shootX = x > targetX - radius && x < targetX + radius;
  const shootY = y > targetY - radius && y < targetY + radius;
  if (shootX && shootY) {
    score++;
  }
}

setInterval(() => {
  clearCanvas();
  colorCanvas();
  updateTarget();
  scoreboard.innerText = score;
}, 1.5 * 1000);

colorCanvas();
updateTarget();

canvas.addEventListener("click", shoot);

const resetScore = (e) => {
  e.preventDefault();
  score = 0;
};

btn.addEventListener("click", resetScore);
