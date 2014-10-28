'use strict';
var React = require('react'),
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
  aliases = {
    'DoubleClick': 'dblclick'
  },
  toEventName = function(event) {
    return (aliases[event] || event).toLowerCase();
  },
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
        element.addEventListener(toEventName(event), capture, true);
      }
      if (bubble && typeof bubble === 'function') {
        element.addEventListener(toEventName(event), bubble, false);
      }
      if (stop === true) {
        element.addEventListener(toEventName(event), function (e) {
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