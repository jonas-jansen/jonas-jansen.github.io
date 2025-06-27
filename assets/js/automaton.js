class CellularAutomaton {
  constructor(spaceSize = 40, maxTime = 100, ruleNumber = 30) {
    this.spaceSize = spaceSize;
    this.maxTime = maxTime;
    this.ruleNumber = ruleNumber;
    this.grid = Array.from({ length: maxTime }, () => Array(spaceSize).fill(0));
    this.rule = this.decodeRule(ruleNumber);
    this.currentTime = 0;
  }

  decodeRule(ruleNum) {
    const rule = [];
    for (let i = 0; i < 8; i++) {
      rule.push((ruleNum >> i) & 1);
    }
    return rule;
  }

  step() {
    if (this.currentTime >= this.maxTime - 1) return false;
    const prev = this.grid[this.currentTime];
    const next = Array(this.spaceSize).fill(0);

    for (let i = 0; i < this.spaceSize; i++) {
      const left = prev[(i - 1 + this.spaceSize) % this.spaceSize];
      const center = prev[i];
      const right = prev[(i + 1) % this.spaceSize];
      const neighborhood = (left << 2) | (center << 1) | right;
      next[i] = this.rule[neighborhood];
    }

    this.currentTime++;
    this.grid[this.currentTime] = next;
    return true;
  }

  setRuleNumber(ruleNum) {
    this.ruleNumber = ruleNum;
    this.rule = this.decodeRule(ruleNum);
  }

  reset() {
    this.grid = Array.from({ length: this.maxTime }, () => Array(this.spaceSize).fill(0));
    this.currentTime = 0;
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
    this.cellW = this.canvas.width / this.automaton.spaceSize;
    this.cellH = this.cellW;
    this.canvas.height = this.cellH * this.automaton.maxTime;
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
    for (let i = 0; i <= this.automaton.spaceSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellW, 0);
      ctx.lineTo(i * cellW, this.canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j <= this.automaton.maxTime; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * cellH);
      ctx.lineTo(this.canvas.width, j * cellH);
      ctx.stroke();
    }

    // Cells
    ctx.fillStyle = "white";
    for (let t = 0; t <= this.automaton.currentTime; t++) {
      for (let x = 0; x < this.automaton.spaceSize; x++) {
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
  constructor(canvas, automaton, renderer) {
    this.canvas = canvas;
    this.automaton = automaton;
    this.renderer = renderer;
    this.interval = null;
    this.delay = 100;
    this.isRunning = false;
    this.isPaused = false;

    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const { row, col } = renderer.getCell(x, y);
      if (row === 0) {
        automaton.grid[0][col] = automaton.grid[0][col] ? 0 : 1;
        renderer.render();
      }
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

// === MAIN ===
const canvas = document.getElementById("caCanvas");
const ruleInput = document.getElementById("ruleInput");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const rulePreview = document.getElementById("rulePreview");

const spaceSize = 40;
const maxTime = 40;

const automaton = new CellularAutomaton(spaceSize, maxTime, parseInt(ruleInput.value));
const renderer = new Renderer(canvas, automaton);
const controller = new Controller(canvas, automaton, renderer);

function updateRulePreview(ruleNum) {
  const container = document.getElementById("rulePreview");
  container.innerHTML = ""; // clear existing

  // Decode the rule into bits (length 8)
  let ruleBits = [];
  for (let i = 0; i < 8; i++) {
    ruleBits.push((ruleNum >> i) & 1);
  }

  // Helper: convert index to 3-bit array, e.g. 0 => [0,0,0], 7 => [1,1,1]
  function indexToBits(idx) {
    let bits = [];
    for (let b = 2; b >= 0; b--) {
      bits.push((idx >> b) & 1);
    }
    return bits;
  }

  // Neighborhoods from 000 (0) to 111 (7), left to right
  for (let i = 7; i > -1; i--) {
    const neighborhoodIdx = i;
    const neighborhoodBits = indexToBits(neighborhoodIdx);

    // Create container div for this pattern
    const patternDiv = document.createElement("div");
    patternDiv.style.display = "flex";
    patternDiv.style.flexDirection = "column";
    patternDiv.style.alignItems = "center";
    patternDiv.style.margin = "0 6px";

    // Top row: 3 squares for neighborhood bits, with bit numbers inside
    const topRow = document.createElement("div");
    topRow.style.display = "flex";
    topRow.style.gap = "4px";

    neighborhoodBits.forEach(bit => {
      const bitSquare = document.createElement("div");
      bitSquare.style.width = "24px";
      bitSquare.style.height = "24px";
      bitSquare.style.backgroundColor = bit ? "white" : "black";
      bitSquare.style.border = "1px solid white";
      bitSquare.style.boxSizing = "border-box";
      bitSquare.style.color = bit ? "black" : "white";
      bitSquare.style.fontSize = "14px";
      bitSquare.style.fontFamily = "monospace";
      bitSquare.style.display = "flex";
      bitSquare.style.justifyContent = "center";
      bitSquare.style.alignItems = "center";
      bitSquare.textContent = bit ? "1" : "0";
      topRow.appendChild(bitSquare);
    });

    // Bottom row: single square for output bit (clickable)
    const bottomRow = document.createElement("div");
    bottomRow.style.width = "24px";
    bottomRow.style.height = "24px";
    bottomRow.style.marginTop = "6px";
    bottomRow.style.cursor = "pointer";
    bottomRow.style.border = "1px solid white";
    bottomRow.style.backgroundColor = ruleBits[i] ? "white" : "black";

    // Toggle output bit on click
    bottomRow.addEventListener("click", () => {
      ruleBits[i] = ruleBits[i] ? 0 : 1;

      // Update color immediately
      bottomRow.style.backgroundColor = ruleBits[i] ? "white" : "black";

      // Calculate new rule number from bits
      let newRuleNum = 0;
      for (let j = 0; j < 8; j++) {
        if (ruleBits[j]) newRuleNum |= (1 << j);
      }

      // Update input field & automaton
      ruleInput.value = newRuleNum;
      automaton.setRuleNumber(newRuleNum);
      controller.reset();

      // Rebuild preview with new bits (to sync all)
      updateRulePreview(newRuleNum);
    });

    patternDiv.appendChild(topRow);
    patternDiv.appendChild(bottomRow);
    container.appendChild(patternDiv);
  }
}



renderer.render();
updateRulePreview(parseInt(ruleInput.value));

startBtn.addEventListener("click", () => {
  controller.toggle();
  if (controller.isRunning && !controller.isPaused) {
    startBtn.classList.add("paused"); // Show pause icon
  } else {
    startBtn.classList.remove("paused"); // Show play icon
  }
});

ruleInput.addEventListener("input", () => {
  const ruleNum = parseInt(ruleInput.value);
  if (!isNaN(ruleNum) && ruleNum >= 0 && ruleNum <= 255) {
    automaton.setRuleNumber(ruleNum);
    updateRulePreview(ruleNum);
    controller.reset();
    startBtn.classList.remove("paused"); // Show play icon
  }
});

resetBtn.onclick = () => {
  controller.reset();
  startBtn.classList.remove("paused"); // Show play icon
};

const randomBtn = document.getElementById("randomBtn");

randomBtn.addEventListener("click", () => {
  // Fill first row with random 0s and 1s
  for (let i = 0; i < automaton.spaceSize; i++) {
    automaton.grid[0][i] = Math.random() < 0.5 ? 0 : 1;
  }
  automaton.currentTime = 0;  // reset time so animation restarts fresh
  controller.stop();          // stop any running animation
  renderer.render();          // redraw the canvas
  startBtn.classList.remove("paused"); // ensure play icon shown
});