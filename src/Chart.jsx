import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import ResponsiveWrapper from './ResponsiveWrapper';

import './chart.css';

class Chart extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    horizontalAxisHeight: PropTypes.number.isRequired,
    trbl: PropTypes.array.isRequired,
    verticalAxisWidth: PropTypes.number.isRequired,
    view: PropTypes.array.isRequired
  };

  buildLinePlot(data, containerView, containerTrbl, horizontalAxisHeight, verticalAxisWidth, xScale, yScale) {
    const trbl = [
      horizontalAxisHeight,
      verticalAxisWidth,
      horizontalAxisHeight,
      verticalAxisWidth
    ];
    const view = [
      containerView[0] - verticalAxisWidth * 2,
      containerView[1] - horizontalAxisHeight * 2
    ];
    return (
      <LinePlot {...{data, trbl, view, xScale, yScale}} />
    );
  }

  buildVerticalAxis(containerView, containerTrbl, horizontalAxisHeight, verticalAxisWidth, scale) {
    const view = [verticalAxisWidth, containerView[1] - horizontalAxisHeight * 2];
    const trbl = [horizontalAxisHeight, 0, 0, 0];
    const orientation = VerticalAxis.orientation.LEFT;
    const tickValues = scale.ticks();
    const labelFn = value => value;
    return (
      <VerticalAxis {...{scale, trbl, view, tickValues, orientation, labelFn}} />
    );
  }

  buildScale([domainMin, domainMax], range) {
    return d3.scaleLinear().domain([domainMin, domainMax]).range(range);
  }

  buildHorizontalAxis(containerView, containerTrbl, horizontalAxisHeight, verticalAxisWidth, scale) {
    const view = [containerView[0] - verticalAxisWidth * 2, horizontalAxisHeight];
    const trbl = [containerView[1] - horizontalAxisHeight, verticalAxisWidth, 0, verticalAxisWidth];
    const orientation = HorizontalAxis.orientation.BOTTOM;
    const tickValues = scale.ticks();
    const labelFn = value => value;
    return (
      <HorizontalAxis {...{scale, trbl, view, tickValues, orientation, labelFn}} />
    );
  }

  render() {
    const {view, trbl, data, horizontalAxisHeight, verticalAxisWidth} = this.props;
    const [domainXMin, domainXMax] = d3.extent(data, (value, index) => index);
    const xScale = this.buildScale([domainXMin, domainXMax], [0, view[0] - verticalAxisWidth * 2]);
    const yScale = this.buildScale(d3.extent(data), [view[1] - horizontalAxisHeight * 2, 0]);
    const viewBox = `0 0 ${view[0]} ${view[1]}`;
    const transform = `translate(${trbl[0]}, ${trbl[3]})`;
    return (
      <svg {...{viewBox}}>
        <g {...{transform}}>
          {this.buildHorizontalAxis(view, trbl, horizontalAxisHeight, verticalAxisWidth, xScale)}
          {this.buildVerticalAxis(view, trbl, horizontalAxisHeight, verticalAxisWidth, yScale)}
          {this.buildLinePlot(data, view, trbl, horizontalAxisHeight, verticalAxisWidth, xScale, yScale)}
        </g>
      </svg>
    );
  }
}

class HorizontalAxis extends React.Component {
  static propTypes = {
    labelFn: PropTypes.func.isRequired,
    orientation: PropTypes.string.isRequired,
    scale: PropTypes.func.isRequired,
    tickValues: PropTypes.array.isRequired,
    trbl: PropTypes.array.isRequired,
    view: PropTypes.array.isRequired
  };

  static orientation = {
    BOTTOM: 'horizontal-axis-bottom',
    TOP: 'horizontal-axis-top'
  };

  buildTicks(tickValues, scale, labelFn, trbl, view, orientation) {
    return tickValues.map((tickValue, key) => {
      const tickLength = view[1] / 6;
      const xPos = scale(tickValue);
      let y2 = view[1];
      let y1 = y2 - tickLength;
      if (orientation === HorizontalAxis.orientation.BOTTOM) {
        y1 = 0;
        y2 = tickLength;
      }
      const transform = `translate(${xPos}, 0)`;
      return (
        <g {...{transform, key}}>
          <line
            {...{y1, y2}}
            className="line-chart__axis-tick line-chart__axis-tick--horizontal"
            x1={0}
            x2={0}
          />
          <text
            dy={'1.4em'}
            className="line-chart__axis-text line-chart__axis-text--horizontal"
            textAnchor={'middle'}
            x={0}
            y={0}
          >{labelFn(tickValue)}</text>
        </g>
      );
    });
  }

  render() {
    const {scale, view, trbl, labelFn, tickValues, orientation} = this.props;
    let y1 = 0;
    if (orientation === HorizontalAxis.orientation.TOP) {
      y1 = view[1];
    }
    const transform = `translate(${trbl[3]}, ${trbl[0]})`;
    return (
      <g {...{transform}}>
        <line
          className="line-chart__axis-line line-chart__axis-line--horizontal"
          x1={0}
          y1={0}
          x2={view[0]}
          y2={0}
        />
        {this.buildTicks(tickValues, scale, labelFn, trbl, view, orientation)}
      </g>
    );
  }
}

class VerticalAxis extends React.Component {
  static propTypes = {
    labelFn: PropTypes.func.isRequired,
    orientation: PropTypes.string.isRequired,
    scale: PropTypes.func.isRequired,
    tickValues: PropTypes.array.isRequired,
    trbl: PropTypes.array.isRequired,
    view: PropTypes.array.isRequired
  };

  static orientation = {
    LEFT: 'horizontal-axis-left',
    RIGHT: 'horizontal-axis-right'
  };

  buildTicks(tickValues, scale, labelFn, trbl, view, orientation) {
    return tickValues.map((tickValue, key) => {
      const tickLength = view[0] / 6;
      const yPos = scale(tickValue);
      let x2 = view[0];
      let x1 = x2 - tickLength;
      let anchorPosition = 'end';
      let textXPos = x1 - tickLength;
      if (orientation === VerticalAxis.orientation.RIGHT) {
        x1 = 0;
        x2 = tickLength;
        anchorPosition = 'start';
      }
      const transform = `translate(0, ${yPos})`;
      return (
        <g {...{transform, key}}>
          <line
            {...{x1, x2}}
            className="line-chart__axis-tick line-chart__axis-tick--vertical"
            y1={0}
            y2={0}
          />
          <text
            dy={3}
            className="line-chart__axis-text line-chart__axis-text--vertical"
            textAnchor={anchorPosition}
            x={textXPos}
            y={0}
          >{labelFn(tickValue)}</text>
        </g>
      );
    });
  }

  render() {
    const {scale, view, trbl, labelFn, tickValues, orientation} = this.props;
    let x1 = view[0];
    if (orientation === VerticalAxis.orientation.RIGHT) {
      x1 = 0;
    }
    const x2 = x1;
    const transform = `translate(${trbl[3]}, ${trbl[0]})`;
    return (
      <g {...{transform}}>
        <line
          {...{x1, x2}}
          className="line-chart__axis-line line-chart__axis-line--vertical"
          y1={0}
          y2={view[1]}
        />
        {this.buildTicks(tickValues, scale, labelFn, trbl, view, orientation)}
      </g>
    );
  }
}

export class LinePlot extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    trbl: PropTypes.array.isRequired,
    view: PropTypes.array.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired
  };

  buildLinePlot(data, view, trbl, xScale, yScale) {
    const line = d3.line();
    line.x((value, index) => xScale(index));
    line.y(yScale);
    line.curve(d3.curveLinear);
    const d = line(data);
    const className = 'line-chart__area-plot';
    return (
      <path {...{className, d, fill: 'none'}} />
    );
  }

  render() {
    const {trbl, view, data, xScale, yScale} = this.props;
    const transform = `translate(${trbl[3]}, ${trbl[0]})`;
    return (
      <g {...{transform}}>
        {this.buildLinePlot(data, view, trbl, xScale, yScale)}
      </g>
    );
  }
}


export default ResponsiveWrapper(Chart);
