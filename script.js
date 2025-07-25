const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let moto = {
  x: 200,
  y: 300,
  angulo: 0,
  acelerando: false,
  freando: false
};

// Áudio (precisa do arquivo ronco.mp3 na pasta do projeto)
let ronco = new Audio("ronco.mp3");

function tocarRonco() {
  ronco.play();
  ronco.loop = true;
}

function pararRonco() {
  ronco.pause();
  ronco.currentTime = 0;
}

// Teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    moto.acelerando = true;
    tocarRonco();
  }
  if (e.key === "ArrowDown") {
    moto.freando = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") {
    moto.acelerando = false;
    pararRonco();
  }
  if (e.key === "ArrowDown") {
    moto.freando = false;
  }
});

// Botões de toque
document.getElementById("acelerar").addEventListener("touchstart", () => {
  moto.acelerando = true;
  tocarRonco();
});
document.getElementById("acelerar").addEventListener("touchend", () => {
  moto.acelerando = false;
  pararRonco();
});

document.getElementById("frear").addEventListener("touchstart", () => {
  moto.freando = true;
});
document.getElementById("frear").addEventListener("touchend", () => {
  moto.freando = false;
});

function desenharMoto() {
  ctx.save();
  ctx.translate(moto.x, moto.y);
  ctx.rotate(moto.angulo);
  ctx.fillStyle = "#0f0";
  ctx.fillRect(-30, -10, 60, 20);
  ctx.restore();
}

function atualizar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (moto.acelerando && moto.angulo < 0.5) {
    moto.angulo += 0.02;
  } else if (!moto.acelerando && moto.angulo > 0) {
    moto.angulo -= 0.02;
  }

  desenharMoto();
  requestAnimationFrame(atualizar);
}

atualizar();