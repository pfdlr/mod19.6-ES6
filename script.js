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
      resultOutput.innerHTML = "";
      results.forEach((element, index) => (resultOutput.innerHTML += `<li>${index + 1} : ${element}</li>`));
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

  toggle() {
    const element = document.getElementById("toggle");
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
      element.innerHTML = "Stop";
      element.classList.add("red");
      element.classList.remove("green");
      resetButton.disabled = true; 
    } else {
      this.running = false;
      clearInterval(this.watch);
      element.innerHTML = "Start";
      element.classList.add("green");
      element.classList.remove("red");
      resetButton.disabled = true; 
    }
  }
}

const resetTable = () => {
  results.length = 0;
  resultOutput.innerHTML = "Wyniki";
}

const pad0 = (value) => {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

const stopwatch = new Stopwatch(document.querySelector(".stopwatch"));
const resultOutput = document.getElementById("results");
const results = [];

const toggleButton = document.getElementById("toggle");
toggleButton.addEventListener("click", () => {
  stopwatch.toggle();
  event.stopPropagation();
});

const resetButton = document.getElementById("reset");
resetButton.disabled = true; 
resetButton.addEventListener("click", () => {
  stopwatch.reset();
  event.stopPropagation();
});

const resetTableButton = document.getElementById("reset-tbl");
resetTableButton.addEventListener("click", () => {
  resetTable();
  event.stopPropagation();
});
