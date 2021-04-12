import "./App.css";
import React from "react";
import _ from "lodash";

class App extends React.Component {
  state = {
    a: [10, 9, 8, 7],
    b: [],
    c: [],
    clicked: false,
    clickTrack: {},
    steps: 0,
  };

  itemClick = (val, container) => {
    console.log("container", container);
    const { clicked, clickTrack } = this.state;
    if (val) {
      const min = _.min(this.state[container]);
      if (val == min) {
      } else {
        alert("Select smaller value first");
      }
      this.setState({
        clicked: true,
        clickTrack: { source: container, value: val },
      });
    } else {
      if (!clicked) {
        alert("select value");
        return;
      }
      const min = _.min(this.state[container]);
      const val = clickTrack.value;
      const prevContainer = clickTrack.source;
      if (val > min) {
        alert("not able to drop");
      } else {
        const arr = this.state[prevContainer];
        const removed = _.remove(arr, (n) => {
          return n == val;
        });

        this.setState({
          [prevContainer]: arr,
          [container]: [...this.state[container], ...removed],
          steps: this.state.steps + 1,
        });
      }
    }
  };

  render() {
    console.log(this.state);
    const { a, b, c } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div
            className="col-4 border"
            onClick={(e) => {
              e.stopPropagation();
              this.itemClick(null, "a");
            }}
          >
            <strong>A</strong>
            <div className="d-flex flex-wrap">
              {a.map((val) => {
                return (
                  <div
                    key={val}
                    onClick={(e) => {
                      e.stopPropagation();
                      this.itemClick(val, "a");
                    }}
                    className="bg-primary p-2 text-white m-2"
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="col-4 border"
            onClick={(e) => {
              e.stopPropagation();
              this.itemClick(null, "b");
            }}
          >
            <strong>B</strong>
            <div className="d-flex flex-wrap">
              {b.map((val) => {
                return (
                  <div
                    key={val}
                    onClick={(e) => {
                      e.stopPropagation();
                      this.itemClick(val, "b");
                    }}
                    className="bg-primary p-2 text-white m-2"
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="col-4 border"
            onClick={(e) => {
              e.stopPropagation();
              this.itemClick(null, "c");
            }}
          >
            <strong>C</strong>
            <div className="d-flex flex-wrap">
              {c.map((val) => {
                return (
                  <div
                    key={val}
                    onClick={(e) => {
                      e.stopPropagation();
                      this.itemClick(val, "c");
                    }}
                    className="bg-primary p-2 text-white m-2"
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
            <strong>Steps : {this.state.steps}</strong>
      </div>
    );
  }
}

export default App;
