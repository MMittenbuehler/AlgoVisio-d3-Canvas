import * as d3 from 'd3';

const defaultOptions = {
  background: 'rgb(225, 225, 225)',
  borderWidth: 1,
  borderColor: 'rgb(200, 200, 200)',
};

const ZOOM_FACTOR = 2;

class Canvas {
  constructor(canvasId, margin = { top: 20, left: 20 }, options = defaultOptions) {
    this.svg = d3.select(`svg#${canvasId}`);
    this.svg
      .style('background', options.background || defaultOptions.background)
      .style('border-width', options.borderWidth || defaultOptions.borderWidth)
      .style('border-color', options.borderColor || defaultOptions.borderColor)
      .style('border-style', 'solid');

    this.zoom = d3.zoom().on('zoom', () => {
      this.canvas.attr('transform', d3.event.transform);
    });
    this.canvas = this.svg.call(this.zoom).append('g');
    // Pan to center
    this.zoom.translateBy(
      this.svg,
      document.getElementById(canvasId).clientWidth / 2,
      document.getElementById(canvasId).clientHeight / 2,
    );

    this.staticCanvas = this.svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add zoom buttons
    const BUTTON_DIM = 35;
    const LINE_STRENGTH = 5;
    const LINE_PADDING = 7;
    const LINE_COLOR = '#555';
    const LINE_COLOR_HOVER = '#000';
    // Plus
    const onMouseOverPlus = () => {
      this.staticCanvas.selectAll('rect.plus-line')
        .attr('fill', LINE_COLOR_HOVER);
    };
    const onMouseOutPlus = () => {
      this.staticCanvas.selectAll('rect.plus-line')
        .attr('fill', LINE_COLOR);
    };
    this.staticCanvas.append('rect')
      .attr('width', BUTTON_DIM)
      .attr('height', BUTTON_DIM)
      .attr('fill', '#fff')
      .attr('rx', 6)
      .attr('ry', 6)
      .on('mouseover', onMouseOverPlus)
      .on('mouseout', onMouseOutPlus)
      .on('click', this.zoomIn);
    // Plus vertical
    this.staticCanvas.append('rect')
      .attr('class', 'plus-line')
      .attr('width', LINE_STRENGTH)
      .attr('height', BUTTON_DIM - 2 * LINE_PADDING)
      .attr('x', (BUTTON_DIM - LINE_STRENGTH) / 2)
      .attr('y', LINE_PADDING)
      .attr('fill', LINE_COLOR)
      .attr('rx', 2)
      .attr('ry', 2)
      .on('mouseover', onMouseOverPlus)
      .on('mouseout', onMouseOutPlus)
      .on('click', this.zoomIn);
    // Plus horizontal
    this.staticCanvas.append('rect')
      .attr('class', 'plus-line')
      .attr('width', BUTTON_DIM - 2 * LINE_PADDING)
      .attr('height', LINE_STRENGTH)
      .attr('x', LINE_PADDING)
      .attr('y', (BUTTON_DIM - LINE_STRENGTH) / 2)
      .attr('fill', LINE_COLOR)
      .attr('rx', 2)
      .attr('ry', 2)
      .on('mouseover', onMouseOverPlus)
      .on('mouseout', onMouseOutPlus)
      .on('click', this.zoomIn);
    // Minus
    const onMouseOverMinus = () => {
      this.staticCanvas.selectAll('rect.minus-line')
        .attr('fill', LINE_COLOR_HOVER);
    };
    const onMouseOutMinus = () => {
      this.staticCanvas.selectAll('rect.minus-line')
        .attr('fill', LINE_COLOR);
    };
    this.staticCanvas.append('rect')
      .attr('width', BUTTON_DIM)
      .attr('height', BUTTON_DIM)
      .attr('y', BUTTON_DIM + margin.top / 2)
      .attr('fill', '#fff')
      .attr('rx', 6)
      .attr('ry', 6)
      .on('mouseover', onMouseOverMinus)
      .on('mouseout', onMouseOutMinus)
      .on('click', this.zoomOut);
    // Minus horizontal
    this.staticCanvas.append('rect')
      .attr('class', 'minus-line')
      .attr('width', BUTTON_DIM - 2 * LINE_PADDING)
      .attr('height', LINE_STRENGTH)
      .attr('x', LINE_PADDING)
      .attr('y', (BUTTON_DIM - LINE_STRENGTH) / 2 + BUTTON_DIM + margin.top / 2)
      .attr('fill', LINE_COLOR)
      .attr('rx', 2)
      .attr('ry', 2)
      .on('mouseover', onMouseOverMinus)
      .on('mouseout', onMouseOutMinus)
      .on('click', this.zoomOut);
  }

  getCanvas() {
    return this.canvas;
  }

  getStaticCanvas() {
    return this.staticCanvas;
  }

  zoomIn = () => {
    d3.event.preventDefault();
    this.svg
      .transition()
      .duration(this.zoom.duration())
      .call(this.zoom.scaleBy, ZOOM_FACTOR);
  }

  zoomOut = () => {
    d3.event.preventDefault();
    this.svg
      .transition()
      .duration(this.zoom.duration())
      .call(this.zoom.scaleBy, 1 / ZOOM_FACTOR);
  }
}

export default Canvas;
