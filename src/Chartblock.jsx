import React, {Component} from 'react';
import {Chart} from './Chart';
import {Controls} from './Controls';

import './chartblock.css';

export class Chartblock extends Component {
  constructor(props) {
    super(props);

    this.state = {data: window.localStorage.data || []}
  }

  addData = (value) => {
    this.setState((prevState) => ({data: [...prevState.data, {x: new Date().toString(), y: value}]}))
  };
  deleteItem = incomeItem => {
    this.setState(prevState => ({data: prevState.data.filter(item => item != incomeItem)}));
  };

  render() {
    const {props} = this;
    const view = [480, 320];
    const trbl = [0, 0, 0, 0];
    const horizontalAxisHeight = 30;
    const verticalAxisWidth = 42;
    return (
      <div className="chartblock">
        <Chart data={this.state.data.map(item => +item.y)} {...props} {...{
          view,
          trbl,
          horizontalAxisHeight,
          verticalAxisWidth
        }}/>
        <Controls addData={this.addData} data={this.state.data} deleteItem={this.deleteItem}/>
      </div>
    );
  }
}

