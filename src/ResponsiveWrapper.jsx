import React, {Component} from 'react'
import ReactResizeDetector from 'react-resize-detector';

import './chart.css';

export default ChartComponent => (
  class ResponsiveChart extends Component {
    constructor(props) {
      super(props);

      this.state = {
        parentWidth: null,
        parentHeight: null
      };
    }

    fitParentContainer() {
      const {parentHeight, parentWidth} = this.state;
      const currentContainer = this.chartContainer
        .getBoundingClientRect();

      this.setState({
        parentWidth: currentContainer.width,
        parentHeight: currentContainer.height
      })

    }

    renderChart() {
      const {parentWidth, parentHeight} = this.state;
      return (
        <ChartComponent {...this.props} view={[parentWidth, parentHeight]}/>
      )
    }

    render() {
      const {containerWidth} = this.state;
      const shouldRenderChart = containerWidth !== null;

      return (
        <div
          ref={(el) => {
            this.chartContainer = el
          }}
          className="resposive-wrapper"
        >
          {shouldRenderChart && this.renderChart()}
          <ReactResizeDetector handleWidth handleHeight onResize={this.fitParentContainer}/>
        </div>
      )
    }
  }
)
