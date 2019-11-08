# Algovisio d3.js Canvas

This module creates a responsive, scroll- and pannable d3 canvas.

## Installation

To install this module simply run the following command in the project you would like to use it in.

```bash
npm install algovisio-d3-canvas
```

## Usage

```js
import React, {Component} from 'react';
import Canvas from 'algovisio-d3-canvas';

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
```

### new Canvas(canvasId, margin = defaultMargin, options = defaultOptions)

Creates a new Canvas

Arguments:
- canvasId: id of the svg
- margin: margin of the buttons to the border of the svg
- options: style of background, borderColor and borderWidth

### getCanvas()

Returns the zoom- and pannable canvas.

### getStaticCanvas()

Returns the overlaying static canvas.