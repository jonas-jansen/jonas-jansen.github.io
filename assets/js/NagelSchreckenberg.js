// automaton.js

class NagelSchreckenberg {
  constructor(spaceSize = 120, maxTime = 100, vmax = 5, p = 0.3, density = 0.3) {
    this.spaceSize = spaceSize;
    this.maxTime = maxTime;
    this.vmax = vmax;
    this.p = p;
    this.density = density;
    this.carIDCounter = 0;

    this.grid = Array.from({ length: maxTime }, () => Array(spaceSize).fill(null));
    this.currentTime = 0;

    this.initializeGrid();
  }

  initializeGrid() {
    
    const firstRow = Array(this.spaceSize).fill(null);
    for (let i = 0; i < this.spaceSize; i++) {
      if (Math.random() < this.density) {
        const v = Math.floor(Math.random() * this.vmax);
        firstRow[i] = { id: this.carIDCounter++, speed: v };
      }
    }
    this.grid[0] = firstRow;
    console.log("Create automaton with Density", this.density, "and Trödelfaktor", this.p, "and speed", this.vmax, "and no. of cars", this.carIDCounter)
  }

  step() {
    if (this.currentTime >= this.maxTime - 1) return false;
    const prev = this.grid[this.currentTime];
    const next = Array(this.spaceSize).fill(null);

    for (let i = 0; i < this.spaceSize; i++) {
      const car = prev[i];
      if (!car) continue;

      // Acceleration
      let v = Math.min(car.speed + 1, this.vmax);

      // Check distance to next car
      let gap = 0;
      for (let d = 1; d <= v; d++) {
        if (prev[(i + d) % this.spaceSize]) break;
        gap++;
      }
      v = Math.min(v, gap);

      // Randomization
      if (v > 0 && Math.random() < this.p) v--;

      const newPos = (i + v) % this.spaceSize;
      next[newPos] = { id: car.id, speed: v };
    }

    this.currentTime++;
    this.grid[this.currentTime] = next;
    return true;
  }

  reset() {
    this.grid = Array.from({ length: this.maxTime }, () => Array(this.spaceSize).fill(null));
    this.currentTime = 0;
    this.carIDCounter = 0;
    this.initializeGrid();
  }
}

function getColor(value, max) {
  if (max <= 0) return 'hsl(0, 100%, 50%)';
  const hue = (value / max) * 120;
  return `hsl(${hue}, 100%, 50%)`;
}

class LiveRenderer {
  constructor(live_canvas, static_canvas, automaton, secondsPerStep = 0.5,cellSize = 12) {
    this.canvas = live_canvas;
    this.static_canvas = static_canvas;
    this.ctx = live_canvas.getContext("2d");
    this.static_ctx = static_canvas.getContext("2d");
    this.automaton = automaton;
    this.secondsPerStep = secondsPerStep;
    this.cellSize = cellSize;

    this.lastStepTime = null;
    this.progress = 0;
    this.prevState = automaton.grid[0];
    this.nextState = automaton.grid[1];

    this.animationFrameId = null;

    this.canvas.height = this.cellSize;
    this.canvas.width = automaton.spaceSize * this.cellSize;

    this.static_canvas.width = automaton.spaceSize * this.cellSize;
    this.static_canvas.height = automaton.maxTime * this.cellSize;
    this.initialize();
  }


  initialize() {
    const ctx = this.static_ctx;
    const ctx_live = this.ctx;
    const state = this.automaton.grid[0];
    const cellSize = this.cellSize;
    console.log("Update called");
  
    if (!state) return;

    console.log("Drawing row");
  
    for (let x = 0; x < this.automaton.spaceSize; x++) {
      const car = state[x];
      if (car) {
        ctx.fillStyle = getColor(car.speed, this.automaton.vmax);
        ctx.fillRect(x * cellSize, 0, cellSize, cellSize);
        ctx_live.fillStyle = getColor(car.speed, this.automaton.vmax);
        ctx_live.fillRect(x * cellSize, 0, cellSize, cellSize);
      }
    }
  }

  getPositionsById(state) {
    const map = new Map();
    for (let i = 0; i < state.length; i++) {
      const car = state[i];
      if (car) {
        map.set(car.id, { pos: i, speed: car.speed });
      }
    }
    return map;
  }

  update() {
    const ctx = this.static_ctx;
    const row = this.automaton.currentTime;
    const state = this.automaton.grid[row];
    const cellSize = this.cellSize;
    console.log("Update called");
  
    if (!state || row >= this.automaton.maxTime) return;

    console.log("Drawing row", row);
  
    for (let x = 0; x < this.automaton.spaceSize; x++) {
      const car = state[x];
      if (car) {
        ctx.fillStyle = getColor(car.speed, this.automaton.vmax);
        ctx.fillRect(x * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  draw(progress) {
    const ctx = this.ctx;
    const width = this.automaton.spaceSize;
    const prevMap = this.getPositionsById(this.prevState);
    const nextMap = this.getPositionsById(this.nextState);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (const [id, nextData] of nextMap.entries()) {
      const prevData = prevMap.get(id);
      if (!prevData) continue;

      const start = prevData.pos;
      const end = nextData.pos;
      const dx = (end - start + width) % width;
      const interpX = (start + progress * dx) % width;

      ctx.fillStyle = getColor(nextData.speed, this.automaton.vmax);
      ctx.fillRect(interpX * this.cellSize, 0, this.cellSize, this.cellSize);
    }
  }

  animate(timestamp) {
    if (!this.lastStepTime) this.lastStepTime = timestamp;
    const elapsed = (timestamp - this.lastStepTime) / 1000;

    this.progress = elapsed / this.secondsPerStep;

    if (this.progress >= 1) {
      if (!this.automaton.step()) return;
      this.lastStepTime = timestamp;
      this.prevState = this.nextState;
      this.nextState = this.automaton.grid[this.automaton.currentTime];
      this.progress = 0;
    }

    this.draw(this.progress);
    this.animationFrameId = requestAnimationFrame((ts) => this.animate(ts));
  }

  reset() {
    this.static_ctx.clearRect(0, 0, this.static_canvas.width, this.static_canvas.height);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    automaton = new NagelSchreckenberg(spaceSize, maxTime, parseInt(vInput.value), parseFloat(pSlider.value), parseFloat(densitySlider.value)); // updates global
    this.automaton = automaton;
    automaton.step();
    this.lastStepTime = null;
    this.progress = 0;
    this.prevState = this.automaton.grid[0];
    this.nextState = this.automaton.grid[1] ?? this.automaton.grid[0];
    this.initialize();
  }
}

// === MAIN ===
const cellSize = 12;

const densitySlider = document.getElementById("densitySlider");
const densityValue = document.getElementById("densityValue");
const pSlider = document.getElementById("pSlider");
const pValue = document.getElementById("pValue");
const vmaxValue = 15;
const spaceSize = 100;
const maxTime = 200;
const startPauseBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const vInput = document.getElementById("vInput");


let isRunning = false;
let animationId = null;

// Create automaton & renderers with initial values
let automaton = new NagelSchreckenberg(spaceSize, maxTime, parseInt(vInput.value), parseFloat(pSlider.value), parseFloat(densitySlider.value));
automaton.step();
const liveCanvas = document.getElementById("liveCanvas");
const timeCanvas = document.getElementById("caCanvas");

const liveRenderer = new LiveRenderer(liveCanvas, timeCanvas, automaton, 0.5, cellSize);

// Update slider display values
densityValue.textContent = densitySlider.value;
pValue.textContent = pSlider.value;

// Update slider labels on input
densitySlider.oninput = () => {
  densityValue.textContent = densitySlider.value;
};

pSlider.oninput = () => {
  pValue.textContent = pSlider.value;
};

// Function to stop animation cleanly
function stopAnimation() {
  isRunning = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

// Function to start animation
function startAnimation() {
  console.log("Start animation called");
  if (!isRunning) {
    isRunning = true;
    liveRenderer.lastStepTime = null; // reset timing to avoid jump
    animateLoop(performance.now());
  }
}

// Modified animate loop to control start/pause & update StaticRenderer
function animateLoop(timestamp) {
  if (!isRunning) return;

  if (!liveRenderer.lastStepTime) liveRenderer.lastStepTime = timestamp;
  const elapsed = (timestamp - liveRenderer.lastStepTime) / 1000;
  liveRenderer.progress = elapsed / liveRenderer.secondsPerStep;

  if (liveRenderer.progress >= 1) {
    liveRenderer.update();
    if (!automaton.step()) {
      stopAnimation(); // stop if finished maxTime
      return;
    }
    liveRenderer.lastStepTime = timestamp;
    liveRenderer.prevState = liveRenderer.nextState;
    liveRenderer.nextState = automaton.grid[automaton.currentTime];
    liveRenderer.progress = 0;

    // Update time-space canvas after step
    
  }

  liveRenderer.draw(liveRenderer.progress);

  animationId = requestAnimationFrame(animateLoop);
}

// Start/pause toggle handler
startPauseBtn.onclick = () => {
  if (isRunning) {
    stopAnimation();
    startPauseBtn.classList.remove("paused"); 
  } else {
    startAnimation();
    startBtn.classList.add("paused"); // Show play icon
  }
};

resetBtn.onclick = () => {
  stopAnimation();
  liveRenderer.reset();
  startBtn.classList.remove("paused"); // Show play icon
};
