'use strict';
var React = require('react');
var Tap = require('./Tap');

module.exports = React.createClass({
  render: function () {
    var createTap = function (tap) {
      return <li key={tap.id}><Tap beer={tap.beer}/></li>
    };
    return <ul>{this.props.taps.map(createTap)}</ul>;
  }
});
