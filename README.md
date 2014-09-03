react-native-listener
=====================

> A utility component to allow easy access to browser native events.

## Why?

React's uses [event delegation](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#under-the-hood-autobinding-and-event-delegation)
with a single event listener on `document`. While this is great if your entire application is inside React,
it's not so great if your React component is inserted into a page containing other event listeners. If an
event happens inside your React component, _**your component will be the last to hear of the event**_. The
event will first propagate to all its ancestor elements on the page.
[Here is a JsFiddle to demonstrate](http://jsfiddle.net/erikras/bL5br9nb/).

If your problem is that you need to stop events leaking out of your React component to the rest of the page,
`<NativeListener>` is the solution.

## Installation

In your project dir:

```shell
npm install --save react-native-listener
```

## Usage

In your JSX file, simply wrap the element (only one!) you want to listen to with `<NativeListener>` and
put your event listener properties (e.g. `onClick`, `onKeyDown`) on `<NativeListener>` instead of on your element.

So, instead of this...

```jsx
/** @jsx React.DOM */
var MyComponent = React.createClass({
  onButtonClick: function(event) {
    // do something (event is React's SyntheticEvent)
  },
  render: function() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Click Me!</button>
      </div>
      );
  }
});
```
...do this:

```jsx
/** @jsx React.DOM */
var NativeListener = require('react-native-listener');
var MyComponent = React.createClass({
  onButtonClick: function(event) {
    // do something (event is native browser event)
  },
  render: function() {
    return (
      <div>
        <NativeListener onClick={this.onButtonClick}>
          <button>Click Me!</button>
        </NativeListener>
      </div>
      );
  }
});
```

**IMPORTANT:** The event passed to your function is the native browser event, _NOT
React's [SyntheticEvent](https://facebook.github.io/react/docs/events.html)!!_

### Convenience Properties

If all you want to do is stop the propagation of an event, there are convenience properties to do that.
`stopClick`, `stopKeyDown`. For example, say you wanted to allow normal hyperlinks to work, but your
component is inside some element that JQuery is calling `event.preventDefault()` for clicks...

```jsx
/** @jsx React.DOM */
var NativeListener = require('react-native-listener');
var MyComponent = React.createClass({
  render: function() {
    return (
      <div>
        <NativeListener stopClick>
          <a href="https://github.com/erikras/react-native-listener">Check out this awesome code!</a>
        </NativeListener>
      </div>
      );
  }
});
```

**IMPORTANT:** You cannot just put a `<NativeListener stopClick>` surrounding your whole component and
expect regular React events to work inside it. That will also prevent the clicks from bubbling up to
React's event system listening on the document. If you block an event, you must use `<NativeListener>`
to listen to that event everywhere inside the `<NativeListener>` element that is blocking the event.

## Advanced Usage

By default, the `onClick`, `onKeyDown` event listeners fire on _bubble_. If you understand [the
difference between _bubble_ and _capture_](http://www.quirksmode.org/js/events_order.html) and
you really need to listen on _capture_, you can simply append `Capture` to your event property.
e.g. `onClickCapture`, `onKeyDownCapture`.

---

Module submitted by [Erik Rasmussen](https://www.npmjs.org/~erikras) [@erikras](https://twitter.com/erikras)