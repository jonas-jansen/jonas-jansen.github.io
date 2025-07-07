// automaton.js

const patterns = {
  "Block": [[0, 0], [0, 1], [1, 0], [1, 1]],
  "Beehive": [[0, 1], [0, 2], [1, 0], [1, 3], [2, 1], [2, 2]],
  "Loaf": [[0, 1], [0, 2], [1, 0], [1, 3], [2, 1], [2, 3], [3, 2]],
  "Boat": [[0, 0], [0, 1], [1, 0], [1, 2], [2, 1]],
  "Tub": [[0, 1], [1, 0], [1, 2], [2, 1]],
  "Blinker": [[1, 0], [1, 1], [1, 2]],
  "Toad": [[1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2]],
  "Beacon": [[0, 0], [0, 1], [1, 0], [1, 1], [2, 2], [2, 3], [3, 2], [3, 3]],
  "Pulsar": [
    [2, 4], [2, 5], [2, 6], [2, 10], [2, 11], [2, 12],
    [4, 2], [5, 2], [6, 2], [4, 7], [5, 7], [6, 7],
    [4, 9], [5, 9], [6, 9], [4, 14], [5, 14], [6, 14],
    [7, 4], [7, 5], [7, 6], [7, 10], [7, 11], [7, 12],
    [9, 4], [9, 5], [9, 6], [9, 10], [9, 11], [9, 12],
    [10, 2], [11, 2], [12, 2], [10, 7], [11, 7], [12, 7],
    [10, 9], [11, 9], [12, 9], [10, 14], [11, 14], [12, 14],
    [14, 4], [14, 5], [14, 6], [14, 10], [14, 11], [14, 12]
  ],
  "Pentadecathlon": [[0, 1], [0, 2], [1, 0], [1, 3], [2, 1], [2, 2], [3, 1], [3, 2], [4, 0], [4, 3], [5, 1], [5, 2]],
  "Glider": [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
  "LWSS": [[0, 1], [0, 4], [1, 0], [2, 0], [2, 4], [3, 0], [3, 1], [3, 2], [3, 3]],
  "MWSS": [[0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [2, 0], [3, 0], [3, 4], [4, 1], [4, 4]],
  "HWSS": [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 0], [2, 0], [3, 0], [3, 5], [4, 1], [4, 5]],
  "R-pentomino": [[0, 1], [0, 2], [1, 0], [1, 1], [2, 1]],
  "Diehard": [[0, 6], [1, 0], [1, 1], [2, 1], [2, 5], [2, 6], [2, 7]],
  "Acorn": [[0, 1], [1, 3], [2, 0], [2, 1], [2, 4], [2, 5], [2, 6]],
  "Eureka": [[0, 1], [1, 1], [1, 2], [2, 2], [3, 2], [3, 3], [4, 3], [5, 3], [5, 4], [6, 4], [6, 5], [7, 5], [7, 6]],
  "Gosper Glider Gun": [[5,1],[5,2],[6,1],[6,2],[5,11],[6,11],[7,11],[4,12],[8,12],[3,13],[9,13],[3,14],[9,14],[6,15],
    [4,16],[8,16],[5,17],[6,17],[7,17],[6,18],[3,21],[4,21],[5,21],[3,22],[4,22],[5,22],[2,23],[6,23],
    [1,25],[2,25],[6,25],[7,25],[3,35],[4,35],[3,36],[4,36]]
};



class Conway {
  constructor(spaceHeight = 40, spaceWidth = 40,boundary = "Dirichlet") {
    this.height = spaceHeight;
    this.width = spaceWidth;
    this.boundary = boundary;

    this.grid = this.createEmptyGrid();
  }

  createEmptyGrid() {
    return Array.from({ length: this.height }, () => Array(this.width).fill(0));
  }



  getLiveNeighborCount(row, col) {
    let count = 0;
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    for (const [dr, dc] of directions) {
      const r = row + dr;
      const c = col + dc;
      if (r >= 0 && r < this.height && c >= 0 && c < this.width && this.boundary === "Dirichlet") {
        count += this.grid[r][c];
      } else if(this.boundary === "periodic") {
        const row = (r + this.height) % this.height;
        const col = (c + this.width) % this.width;
        count += this.grid[row][col];
      }
    }

    return count;
  }

  step() {
    const newGrid = this.createEmptyGrid();

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const alive = this.grid[row][col] === 1;
        const neighbors = this.getLiveNeighborCount(row, col);
        // if alive and 2 or 3 living neighbors => stay alive; if dead and 3 living neighbors => alive; else dead
        if (alive && (neighbors === 2 || neighbors === 3)) {
          newGrid[row][col] = 1;
        } else if (!alive && neighbors === 3) {
          newGrid[row][col] = 1;
        } else {
          newGrid[row][col] = 0;
        }
      }
    }

    this.grid = newGrid;
    return true;
  }

  reset() {
    this.grid = this.createEmptyGrid();
  }
}

class Renderer {
  constructor(canvas, automaton) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");


    this.automaton = automaton;

    this.hoverCell = null;
    this.animationFrameId = null;
    this.glowAlpha = 0.3;
    this.glowIncreasing = true;

    this.onResize();
    window.addEventListener("resize", () => this.onResize());

    canvas.addEventListener("mousemove", (e) => this.handleHover(e));
    canvas.addEventListener("mouseleave", () => this.handleMouseLeave());
  }

  onResize() {
    this.canvas.width = 1200;
    this.canvas.height = 1200;
    this.cellW = this.canvas.width / this.automaton.width;
    this.cellH = this.canvas.height / this.automaton.height;
    this.render();
  }

  handleHover(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newHover = this.getCell(x, y);

    // Only restart animation if hover cell changed
    if (!this.hoverCell || newHover.row !== this.hoverCell.row || newHover.col !== this.hoverCell.col) {
      this.hoverCell = newHover;
      this.startAnimation();
    }
  }

  handleMouseLeave() {
    this.hoverCell = null;
    this.stopAnimation();
    this.render();
  }

  getCell(x, y) {
    return {
      row: Math.floor(y / this.cellH),
      col: Math.floor(x / this.cellW)
    };
  }

  startAnimation() {
    if (this.animationFrameId === null) {
      this.animationLoop();
    }
  }

  stopAnimation() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  animationLoop() {
    // Update glow alpha (pulse effect)
    if (this.glowIncreasing) {
      this.glowAlpha += 0.01;
      if (this.glowAlpha >= 0.8) this.glowIncreasing = false;
    } else {
      this.glowAlpha -= 0.01;
      if (this.glowAlpha <= 0.4) this.glowIncreasing = true;
    }

    this.render();

    this.animationFrameId = requestAnimationFrame(() => this.animationLoop());
  }

  render() {
    const ctx = this.ctx;
    const { cellW, cellH } = this;

    // Background
    ctx.fillStyle = "rgb(20,20,20)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Grid lines
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    for (let i = 0; i < this.automaton.width; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellW, 0);
      ctx.lineTo(i * cellW, this.canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < this.automaton.height; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * cellH);
      ctx.lineTo(this.canvas.width, j * cellH);
      ctx.stroke();
    }

    // Cells
    ctx.fillStyle = "white";
    for (let t = 0; t < this.automaton.height; t++) {
      for (let x = 0; x < this.automaton.width; x++) {
        if (this.automaton.grid[t][x] === 1) {
          ctx.fillRect(x * cellW, t * cellH, cellW, cellH);
        }
      }
    }

    // Hover highlight with pulsing glow
    if (this.hoverCell) {
      const { row, col } = this.hoverCell;
      ctx.strokeStyle = `rgba(255,255,255,${this.glowAlpha.toFixed(2)})`;
      ctx.lineWidth = 3;

      // Shadow glow effect
      ctx.shadowColor = `rgba(255,255,255,${(this.glowAlpha / 2).toFixed(2)})`;
      ctx.shadowBlur = 8;

      ctx.strokeRect(col * cellW + 1.5, row * cellH + 1.5, cellW - 3, cellH - 3);

      // Clear shadow for next draw calls
      ctx.shadowBlur = 0;
    }
  }
}


class Controller {
  constructor(canvas, automaton, renderer, delay) {
    this.canvas = canvas;
    this.automaton = automaton;
    this.renderer = renderer;
    this.interval = null;
    this.delay = delay;
    this.isRunning = false;
    this.isPaused = false;

    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const { row, col } = renderer.getCell(x, y);
      automaton.grid[row][col] = automaton.grid[row][col] ? 0 : 1;
      renderer.render();
    });
  }

  start() {
    if (this.isRunning && !this.isPaused) return;

    this.isRunning = true;
    this.isPaused = false;
    this.interval = setInterval(() => {
      const running = this.automaton.step();
      this.renderer.render();
      if (!running) this.stop();
    }, this.delay);
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.isPaused = true;
    }
  }

  stop() {
    this.isRunning = false;
    this.isPaused = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  reset() {
    this.stop();
    this.automaton.reset();
    this.renderer.render();
  }

  toggle() {
    if (!this.isRunning) {
      this.start();
    } else if (this.isPaused) {
      this.start();
    } else {
      this.pause();
    }
  }
}

const canvas = document.getElementById("caCanvas");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const spaceHeight = 40;
const spaceWidth = 40;
const delay = 100;

const automaton = new Conway(spaceHeight,spaceWidth, "periodic");
const renderer = new Renderer(canvas, automaton);
const controller = new Controller(canvas, automaton, renderer,delay);

renderer.render();

startBtn.addEventListener("click", () => {
  controller.toggle();
  if (controller.isRunning && !controller.isPaused) {
    startBtn.classList.add("paused"); // Show pause icon
  } else {
    startBtn.classList.remove("paused"); // Show play icon
  }
});


resetBtn.onclick = () => {
  controller.reset();
  startBtn.classList.remove("paused"); // Show play icon
};

const boundarySelect = document.getElementById("boundarySelect");

boundarySelect.addEventListener("change", (e) => {
  automaton.boundary = e.target.value;
});


document.getElementById("loadPatternBtn").addEventListener("click", () => {
  const selected = document.getElementById("patternSelect").value;
  const pattern = patterns[selected];
  if (!pattern) return;

  automaton.reset(); // clear grid

  const offsetRow = Math.floor((automaton.height - getPatternSize(pattern).rows) / 2);
  const offsetCol = Math.floor((automaton.width - getPatternSize(pattern).cols) / 2);

  for (const [r, c] of pattern) {
    const row = r + offsetRow;
    const col = c + offsetCol;
    if (row >= 0 && row < automaton.height && col >= 0 && col < automaton.width) {
      automaton.grid[row][col] = 1;
    }
  }

  renderer.render();
});

function getPatternSize(pattern) {
  let maxR = 0, maxC = 0;
  for (const [r, c] of pattern) {
    if (r > maxR) maxR = r;
    if (c > maxC) maxC = c;
  }
  return { rows: maxR + 1, cols: maxC + 1 };
}