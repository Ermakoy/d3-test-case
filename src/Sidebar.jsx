import React, {Component} from 'react';
import classNames from 'classnames';

import './sidebar.css';

export class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {clicked: false};
  }

  handleClick = () => {
    this.setState({clicked: !this.state.clicked})
  };

  render() {
    const {left, right} = this.props;
    const {clicked} = this.state;

    const classes = classNames({
      sidebar: true,
      left: left,
      right: right && !left,
      clicked: clicked
    });
    const arrow = left ? (clicked ? '►' : '◄') :
      (clicked ? '◄' : '►')
    ;
    return (
      <div className={classes}>
        <p className={`arrow ${clicked ? 'arrow-clicked' : ''}`} onClick={this.handleClick}>{arrow}</p>
      </div>)
      ;
  }
}
