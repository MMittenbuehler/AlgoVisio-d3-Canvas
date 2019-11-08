import React, { Component } from 'react';
import Canvas from '../src/Canvas';

class Preview extends Component {
  componentDidMount() {
    this.canvas = new Canvas('vis-1');
    this.canvas.getCanvas().append('circle')
      .attr('r', 50)
      .attr('fill', 'red');
  }

  render() {
    return (
      <div>
        <svg id="vis-1" style={{ height: 600, width: '100%' }} />
      </div>
    );
  }
}

export default Preview;
