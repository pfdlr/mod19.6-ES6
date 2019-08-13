class Stopwatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      running: false,
      results: []
    };
    this.handleClickSS = this.handleClickSS.bind(this);
    this.step = this.step.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  
  handleClickSS() {
    const element = document.getElementById("toggle");
    if (!this.state.running) {
      this.setState({
        running: !this.state.running
      });
      element.classList.add("red");
      element.classList.remove("green");
      this.watch = setInterval(this.calculate, 10);
    } else {
      this.setState({
        running: !this.state.running
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
        minutes: this.state.minutes,
        seconds: this.state.seconds,
        miliseconds: this.state.miliseconds
      }
    })
  }
      
  
  /* 
  reset() {
    if (!this.state.times) {
      this.setState = {
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      };
    } else {
      this.setState = {
        results: results + this.state.times
      };
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
      this.print();
    }
  }
  resetTable() {
    results.length = 0;
    resultOutput.innerHTML = "Wyniki";
  } */

  render() {
    return (
      <React.Fragment>
        <nav className="controls">
          <a onClick={this.handleClickSS} className="button  green" id="toggle">
            {this.state.running ? "Stop" : "Start"}
          </a>
        </nav>
        <DisplayCounter show={format(this.state.times)} />
        <div className="reset">
          <a href="#" className="button red" id="reset">
            Reset
          </a>
        </div>

        <ResultTable results={this.state.results} />
        <div className="reset">
          <a href="#" class="button red" id="reset-tbl">
            Reset table
          </a>
        </div>
      </React.Fragment>
    );
  }
}

const DisplayCounter = props => {
  return <div className="stopwatch">{props.show}</div>;
};

const ResultTable = props => {
  return (
    <ul className="results" id="results">
      {props.results.map((result, index) => (
        <li>
          {index + 1} : {result}
        </li>
      ))}
    </ul>
  );
};

const format = (times) => {
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
