'use strict';
var React = require('react'),
  PropTypes = React.PropTypes,
  events = [
    'KeyDown',
    'KeyPress',
    'KeyUp',
    'Click',
    'ContextMenu',
    'DoubleClick',
    'Drag',
    'DragEnd',
    'DragEnter',
    'DragExit',
    'DragLeave',
    'DragOver',
    'DragStart',
    'Drop',
    'MouseDown',
    'MouseEnter',
    'MouseLeave',
    'MouseMove',
    'MouseOut',
    'MouseOver',
    'MouseUp'
  ],
  forEach = function (fn) {
    var i;
    for (i = 0; i < events.length; i++) {
      fn(events[i], i);
    }
  },
  propTypes = {
    children: function (props, propName) {
      if (props[propName].length) {
        return new Error('NativeListener can only wrap one element');
      }
    }
  },
  NativeListener;

NativeListener = React.createClass({
  propTypes: propTypes,
  componentDidMount: function () {
    var props = this.props,
      element = this.getDOMNode();
    forEach(function (event) {
      var capture = props['on' + event + 'Capture'],
        bubble = props['on' + event],
        stop = props['stop' + event];
      if (capture && typeof capture === 'function') {
        element.addEventListener(event.toLowerCase(), capture, true);
      }
      if (bubble && typeof bubble === 'function') {
        element.addEventListener(event.toLowerCase(), bubble, false);
      }
      if (stop === true) {
        element.addEventListener(event.toLowerCase(), function (e) {
          e.stopPropagation();
        }, false);
      }
    });
  },
  render: function () {
    return this.props.children;
  }
});
module.exports = NativeListener;