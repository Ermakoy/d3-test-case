import React, {Component} from 'react';
import classNames from 'classnames';

import './sidebar.css';

const Triangle = props => <div className={`triangle triangle-${props.side}`} />;

const TriangleRight = Triangle({side: 'right'});
const TriangleLeft = Triangle({side: 'left'});

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
    const arrow = left ? (clicked ? 'right' : 'left') :
      (clicked ? 'left' : 'right')
    ;
    return (
      <div className={classes}>
        <div className={`triangle triangle-${arrow}`} onClick={this.handleClick} />
      </div>)
      ;
  }
}
