'use strict';
var React = require('react');
var tapData = require('./Api/tapData');
var Board = require('./Board');
var Untappd = require('./Api/Untappd.js');

var BeerApp = React.createClass({
  getInitialState: function () {
    var taps = [];
    return {
      taps: []
    };
  },
  componentDidMount: function (){
    var that = this;

    tapData.getData()
    .then(function (taps){
        if(that.isMounted()){
          that.setState({
            taps: taps
          });
        }
      })
  },

  render: function () {
    return (
      <div>
        <h1>Beer list</h1>
        <Board taps={this.state.taps} />
      </div>
    )
  }
});

var untappd = new Untappd();
untappd.authenticate();
React.render(<BeerApp />, document.getElementById('name'));
