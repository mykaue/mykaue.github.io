const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let moto = {
  x: 200,
  y: 300,
  angulo: 0,
  acelerando: false,
  freando: false
};

let ronco = new Audio("ronco.mp3");

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    moto.acelerando = true;
    ronco.play();
    ronco.loop = true;
  }
  if (e.key === "ArrowDown") {
    moto.freando = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") {
    moto.acelerando = false;
    ronco.pause();
    ronco.currentTime = 0;
  }
  if (e.key === "ArrowDown") {
    moto.freando = false;
  }
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