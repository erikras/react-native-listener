'use strict';
var React = require('react'),
  PropTypes = React.PropTypes,
  eventProps = [
    'onKeyDown',
    'onKeyPress',
    'onKeyUp',
    'onClick',
    'onDoubleClick',
    'onDrag',
    'onDragEnd',
    'onDragEnter',
    'onDragExit',
    'onDragLeave',
    'onDragOver',
    'onDragStart',
    'onDrop',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp'
  ],
  nativeEvents = [],
  forEach = function (fn) {
    var i;
    for (i = 0; i < eventProps.length; i++) {
      fn(eventProps[i], nativeEvents[i], i);
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

forEach(function (prop, native, index) {
  nativeEvents[index] = prop.substring(2).toLowerCase();
  propTypes[prop] = PropTypes.func;
});

NativeListener = React.createClass({
  propTypes: propTypes,
  componentDidMount: function () {
    var props = this.props,
      element = this.getDOMNode();
    forEach(function (prop, native) {
      var capture = props[prop + 'Capture'],
        bubble = props[prop];
      if (capture && typeof capture === 'function') {
        element.addEventListener(native, capture, true);
      }
      if (bubble && typeof bubble === 'function') {
        element.addEventListener(native, bubble, false);
      }
    });
  },
  render: function () {
    return this.props.children;
  }
});
module.exports = NativeListener;