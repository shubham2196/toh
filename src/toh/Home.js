import _ from "lodash";
import React, { Component } from "react";
import POLE from "../imgs/pole.png";
import "./home.css";

export default class Home extends Component {
  state = {
    layers: null,
    baseWidth: 100,
    baseHeight: 20,
    a: null,
    b: [],
    c: [],
    steps: [],
  };
  steps = [];

  getTotalCount = (layer) => {
    let res = 2;
    for (let i = 1; i < layer; i++) {
      res = res * 2;
    }
    return res - 1;
  };

  solveToh = (source, destination, halt, n, totLayer) => {
    const { steps } = this.state;
    if (n <= 0) {
      if (totLayer == this.steps.length) {
        // this.setState({ steps: this.steps });
        let s = 0;
        let id = setInterval(() => {
          if (s == totLayer) clearInterval(id);
          this.startAnimation(this.steps[s]);
          s++;
        }, 1000);
      }
      return;
    }

    this.solveToh(source, halt, destination, n - 1, totLayer);

    this.steps.push(`${source} to ${destination}`);

    this.solveToh(halt, destination, source, n - 1, totLayer);
  };

  startAnimation = (step) => {
    if (step) {
      const temp = {
        ...this.state,
      };
      const dest = step.substr(5, 1);
      const src = step.substr(0, 1);
      temp[dest].push(temp[src].pop());
      this.setState({ a: temp.a, b: temp.b, c: temp.c });
    }
  };

  onChange = (e) => {
    this.setState({ layers: e.target.value });
  };

  createDisks = () => {
    let { layers, baseWidth, baseHeight, a } = this.state;
    const arr = [];
    for (let i = 0; i < layers; i++) {
      const ref = React.createRef();
      baseWidth += 50;
      const div = (
        <div
          ref={ref}
          key={i}
          className="disk mt-1"
          style={{ width: baseWidth + "px", height: baseHeight + "px" }}
        ></div>
      );
      arr.push(div);
    }
    arr.reverse();
    this.setState({ a: arr, b: [], c: [] });
  };

  render() {
    const { a, b, c, layers } = this.state;
    return (
      <div>
        <div className="d-block container">
          <div className="row">
            <input
              onChange={this.onChange}
              type="number"
              className="form-control col-6"
              placeholder="Enter No of layer"
              name="number"
            />
            <div className="col-6 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.createDisks}
              >
                Render TOH
              </button>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-4">
              <img width="100%" src={POLE} />
              <div className="disk-container">{a}</div>
            </div>
            <div className="col-4">
              <img width="100%" src={POLE} />
              <div className="disk-container">{b}</div>
            </div>
            <div className="col-4">
              <img width="100%" src={POLE} />
              <div className="disk-container">{c}</div>
            </div>
          </div>
          <button
            onClick={(e) => {
              this.steps = [];
              this.solveToh("a", "c", "b", layers, this.getTotalCount(layers));
            }}
            className="btn btn-primary"
          >
            Move to C
          </button>
          <button
            onClick={(e) => {
              this.steps = [];
              this.solveToh("a", "b", "c", layers, this.getTotalCount(layers));
            }}
            className="ml-3 btn btn-primary"
          >
            Move to B
          </button>
        </div>
      </div>
    );
  }
}
