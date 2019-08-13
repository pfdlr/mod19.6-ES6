class Stopwatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      running: false
    };
    this.handleClickSS = this.handleClickSS.bind(this);
    this.step = this.step.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleClickSS() {
    const element = document.getElementById("toggle");
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
  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  calculate() {
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

  render() {
    return (
      <>
        <button onClick={this.handleClickSS} className="button  green" id="toggle">
          {this.state.running ? "Stop" : "Start"}
        </button>
        <DisplayCounter show={format(this.state.times)} />
      </>
    );
  }
}

const DisplayCounter = props => {
  return <div className="stopwatch">{props.show}</div>;
};

const format = times => {
  return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
};

const pad0 = value => {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
};

ReactDOM.render(<Stopwatch />, document.getElementById("root"));
