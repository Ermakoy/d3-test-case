import React, {Component} from 'react';
import {Chart} from './Chart';
import {Controls} from './Controls';

import './chartblock.css';

export class Chartblock extends Component {
  constructor(props) {
    super(props);

    this.state = {data: JSON.parse(localStorage.getItem('data')) || []}
  }

  addData = (value) => {
    const newData = [...this.state.data,{x: new Date().toString(), y: value}];
    localStorage.setItem('data', JSON.stringify(newData));
    this.setState({data: newData});
  };
  deleteItem = incomeItem => {
    const newData = this.state.data.filter(item => item !== incomeItem);
    localStorage.setItem('data', JSON.stringify(newData));
    this.setState({data: newData});
  };

  render() {
    const {props} = this;
    const view = [1280, 720];
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

