'use strict';
var React = require('react');


module.exports = React.createClass({
  render: function () {
    return <div>{this.props.data.brewery} {this.props.data.name}</div>;
  }
});
