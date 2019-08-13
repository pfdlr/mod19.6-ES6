"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Stopwatch =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(props) {
    var _this;

    _classCallCheck(this, Stopwatch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Stopwatch).call(this, props));
    _this.state = {
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      running: false
    };
    _this.handleClickSS = _this.handleClickSS.bind(_assertThisInitialized(_this));
    _this.step = _this.step.bind(_assertThisInitialized(_this));
    _this.calculate = _this.calculate.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Stopwatch, [{
    key: "handleClickSS",
    value: function handleClickSS() {
      var element = document.getElementById("toggle");

      if (!this.state.running) {
        this.setState({
          running: true
        });
        element.classList.add("red");
        element.classList.remove("green");
        this.watch = setInterval(this.step, 10);
      } else {
        this.setState({
          running: false
        });
        element.classList.add("green");
        element.classList.remove("red");
        clearInterval(this.watch);
      }
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.state.running) return;
      this.calculate();
    }
  }, {
    key: "calculate",
    value: function calculate() {
      this.state.times.miliseconds += 1;

      if (this.state.times.miliseconds >= 100) {
        this.state.times.seconds += 1;
        this.state.times.miliseconds = 0;
      }

      if (this.state.times.seconds >= 60) {
        this.state.times.minutes += 1;
        this.state.times.seconds = 0;
      }

      this.setState({
        times: {
          minutes: this.state.times.minutes,
          seconds: this.state.times.seconds,
          miliseconds: this.state.times.miliseconds
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(React.Fragment, null, React.createElement("button", {
        onClick: this.handleClickSS,
        className: "button  green",
        id: "toggle"
      }, this.state.running ? "Stop" : "Start"), React.createElement(DisplayCounter, {
        show: format(this.state.times)
      }));
    }
  }]);

  return Stopwatch;
}(React.Component);

var DisplayCounter = function DisplayCounter(props) {
  return React.createElement("div", {
    className: "stopwatch"
  }, props.show);
};

var format = function format(times) {
  return "".concat(pad0(times.minutes), ":").concat(pad0(times.seconds), ":").concat(pad0(Math.floor(times.miliseconds)));
};

var pad0 = function pad0(value) {
  var result = value.toString();

  if (result.length < 2) {
    result = "0" + result;
  }

  return result;
};

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById("root"));
