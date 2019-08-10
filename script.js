class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  reset() {
    if (!this.times) {
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
      this.print();
    } else {
      results.push(this.format(this.times));
      /* let reversed = results.reverse() */
      resultOutput.innerHTML = "";
      results.forEach((element, index) => (resultOutput.innerHTML += `<li>${index + 1} : ${element}</li>`));
      document.getElementById("reset-tbl").style.visibility = "visible"
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
      this.print();
    }
  }
  print() {
    this.display.innerText = this.format(this.times);
  }
  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }
  /* start() {
    if (!this.running) {
        this.running = true;
        this.watch = setInterval(() => this.step(), 10);
    }
} */
  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }
  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }
  /* stop() {
    this.running = false;
    clearInterval(this.watch);
} */
  // toggle
  toggle() {
    var element = document.getElementById("toggle");
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
      element.innerHTML = "Stop";
      element.classList.add("red");
      element.classList.remove("green");
    } else {
      resetButton = document.getElementById("reset").disabled = true;
      this.running = false;
      clearInterval(this.watch);
      element.innerHTML = "Start";
      element.classList.add("green");
      element.classList.remove("red");
    }
  }
}
function resetTable() {
  results.length = 0;
  resultOutput.innerHTML = "Wyniki";
}
function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

const stopwatch = new Stopwatch(document.querySelector(".stopwatch"));
const resultOutput = document.getElementById("results");
const results = [];

/* let startButton = document.getElementById("start");
startButton.addEventListener("click", () => stopwatch.start());

let stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => stopwatch.stop()); */

let toggleButton = document.getElementById("toggle");
toggleButton.addEventListener("click", () => {
  stopwatch.toggle();
  event.stopPropagation();
});

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  stopwatch.reset();
  event.stopPropagation();
});

let resetTableButton = document.getElementById("reset-tbl");
resetTableButton.addEventListener("click", () => {
  resetTable();
  event.stopPropagation();
});
