"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var d3 = _interopRequireWildcard(require("d3"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultOptions = {
  background: 'rgb(225, 225, 225)',
  borderWidth: 1,
  borderColor: 'rgb(200, 200, 200)'
};
var ZOOM_FACTOR = 2;

var Canvas =
/*#__PURE__*/
function () {
  function Canvas(canvasId) {
    var _this = this;

    var margin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      top: 20,
      left: 20
    };
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions;

    _classCallCheck(this, Canvas);

    _defineProperty(this, "zoomIn", function () {
      d3.event.preventDefault();

      _this.svg.transition().duration(_this.zoom.duration()).call(_this.zoom.scaleBy, ZOOM_FACTOR);
    });

    _defineProperty(this, "zoomOut", function () {
      d3.event.preventDefault();

      _this.svg.transition().duration(_this.zoom.duration()).call(_this.zoom.scaleBy, 1 / ZOOM_FACTOR);
    });

    this.svg = d3.select("svg#".concat(canvasId));
    this.svg.style('background', options.background || defaultOptions.background).style('border-width', options.borderWidth || defaultOptions.borderWidth).style('border-color', options.borderColor || defaultOptions.borderColor).style('border-style', 'solid');
    this.zoom = d3.zoom().on('zoom', function () {
      _this.canvas.attr('transform', d3.event.transform);
    });
    this.canvas = this.svg.call(this.zoom).append('g'); // Pan to center

    this.zoom.translateBy(this.svg, document.getElementById(canvasId).clientWidth / 2, document.getElementById(canvasId).clientHeight / 2);
    this.staticCanvas = this.svg.append('g').attr('transform', "translate(".concat(margin.left, ",").concat(margin.top, ")")); // Add zoom buttons

    var BUTTON_DIM = 35;
    var LINE_STRENGTH = 5;
    var LINE_PADDING = 7;
    var LINE_COLOR = '#555';
    var LINE_COLOR_HOVER = '#000'; // Plus

    var onMouseOverPlus = function onMouseOverPlus() {
      _this.staticCanvas.selectAll('rect.plus-line').attr('fill', LINE_COLOR_HOVER);
    };

    var onMouseOutPlus = function onMouseOutPlus() {
      _this.staticCanvas.selectAll('rect.plus-line').attr('fill', LINE_COLOR);
    };

    this.staticCanvas.append('rect').attr('width', BUTTON_DIM).attr('height', BUTTON_DIM).attr('fill', '#fff').attr('rx', 6).attr('ry', 6).on('mouseover', onMouseOverPlus).on('mouseout', onMouseOutPlus).on('click', this.zoomIn); // Plus vertical

    this.staticCanvas.append('rect').attr('class', 'plus-line').attr('width', LINE_STRENGTH).attr('height', BUTTON_DIM - 2 * LINE_PADDING).attr('x', (BUTTON_DIM - LINE_STRENGTH) / 2).attr('y', LINE_PADDING).attr('fill', LINE_COLOR).attr('rx', 2).attr('ry', 2).on('mouseover', onMouseOverPlus).on('mouseout', onMouseOutPlus).on('click', this.zoomIn); // Plus horizontal

    this.staticCanvas.append('rect').attr('class', 'plus-line').attr('width', BUTTON_DIM - 2 * LINE_PADDING).attr('height', LINE_STRENGTH).attr('x', LINE_PADDING).attr('y', (BUTTON_DIM - LINE_STRENGTH) / 2).attr('fill', LINE_COLOR).attr('rx', 2).attr('ry', 2).on('mouseover', onMouseOverPlus).on('mouseout', onMouseOutPlus).on('click', this.zoomIn); // Minus

    var onMouseOverMinus = function onMouseOverMinus() {
      _this.staticCanvas.selectAll('rect.minus-line').attr('fill', LINE_COLOR_HOVER);
    };

    var onMouseOutMinus = function onMouseOutMinus() {
      _this.staticCanvas.selectAll('rect.minus-line').attr('fill', LINE_COLOR);
    };

    this.staticCanvas.append('rect').attr('width', BUTTON_DIM).attr('height', BUTTON_DIM).attr('y', BUTTON_DIM + margin.top / 2).attr('fill', '#fff').attr('rx', 6).attr('ry', 6).on('mouseover', onMouseOverMinus).on('mouseout', onMouseOutMinus).on('click', this.zoomOut); // Minus horizontal

    this.staticCanvas.append('rect').attr('class', 'minus-line').attr('width', BUTTON_DIM - 2 * LINE_PADDING).attr('height', LINE_STRENGTH).attr('x', LINE_PADDING).attr('y', (BUTTON_DIM - LINE_STRENGTH) / 2 + BUTTON_DIM + margin.top / 2).attr('fill', LINE_COLOR).attr('rx', 2).attr('ry', 2).on('mouseover', onMouseOverMinus).on('mouseout', onMouseOutMinus).on('click', this.zoomOut);
  }

  _createClass(Canvas, [{
    key: "getCanvas",
    value: function getCanvas() {
      return this.canvas;
    }
  }, {
    key: "getStaticCanvas",
    value: function getStaticCanvas() {
      return this.staticCanvas;
    }
  }]);

  return Canvas;
}();

var _default = Canvas;
exports["default"] = _default;