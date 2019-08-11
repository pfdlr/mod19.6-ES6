"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
  function Stopwatch(display) {
    _classCallCheck(this, Stopwatch);

    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  _createClass(Stopwatch, [{
    key: "reset",
    value: function reset() {
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
        results.forEach(function (element, index) {
          return resultOutput.innerHTML += "<li>" + (index + 1) + " : " + element + "</li>";
        });
        this.times = {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        };
        this.print();
      }
    }
  }, {
    key: "print",
    value: function print() {
      this.display.innerText = this.format(this.times);
    }
  }, {
    key: "format",
    value: function format(times) {
      return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.running) return;
      this.calculate();
      this.print();
    }
  }, {
    key: "calculate",
    value: function calculate() {
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
  }, {
    key: "toggle",
    value: function toggle() {
      var _this = this;

      var element = document.getElementById("toggle");
      if (!this.running) {
        this.running = true;
        this.watch = setInterval(function () {
          return _this.step();
        }, 10);
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
      }
    }
  }]);

  return Stopwatch;
}();

var resetTable = function resetTable() {
  results.length = 0;
  resultOutput.innerHTML = "Wyniki";
};

var pad0 = function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
};

var stopwatch = new Stopwatch(document.querySelector(".stopwatch"));
var resultOutput = document.getElementById("results");
var results = [];

var toggleButton = document.getElementById("toggle");
toggleButton.addEventListener("click", function () {
  stopwatch.toggle();
  event.stopPropagation();
});

var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
  stopwatch.reset();
  event.stopPropagation();
});

var resetTableButton = document.getElementById("reset-tbl");
resetTableButton.addEventListener("click", function () {
  resetTable();
  event.stopPropagation();
});
