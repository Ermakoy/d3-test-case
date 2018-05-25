import React, {Component} from 'react';

import './Controls.css';
export class Controls extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  createRecord = item => (
    <div key={item.x} className="item">
      <p>{item.x}</p>
      <p><b>{item.y}</b></p>
      <button type="button" onClick={()=> {this.props.deleteItem(item)}}>Remove</button>
    </div>
  );
  addItem = () => {
    this.props.addData(this.input.current.value);
  };
  render() {
    return (
      <div className="controls" onSubmit={this.addItem}>
        <h3>Data</h3>
        <input type="number" ref={this.input}/>
        <button type="button" onClick={this.addItem}>Add data</button>
        <p>List of values</p>
        {this.props.data.map(this.createRecord)}
      </div>
    );
  }
}
