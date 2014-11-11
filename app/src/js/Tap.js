'use strict';
var React = require('react');
var Beer = require('./Beer');
var Untappd = require('./Api/Untappd');


var untappd = new Untappd();
module.exports = React.createClass({
  getInitialState: function () {
    return {
      beerSearch: []
    };
  },

  search: function (event) {
    var query = event.target.search.value,
      that = this;
    untappd.search(query)
      .then(function (beers) {
        console.log('setting state with ' + beers.count);
        that.setState({beerSearch: beers.items});
      });
    event.target.search.value = '';
    event.preventDefault();
  },

  updateBeer: function (beer) {
    this.setState({beerSearch: []});
    this.props.beer = beer;
  },

  render: function () {
    return (
      <div>
        <Beer data={this.props.beer}/>
        <form onSubmit={this.search}>
          <input name='search' type='search'/>
        </form>
        <ul>
        {this.state.beerSearch.map(function (beerData, i) {
          return (
            <li onClick={this.updateBeer.bind(this, beerData)} key={i}>
          {beerData.brewery.brewery_name}, {beerData.beer.beer_name}
            </li>
          );
        }, this)}
        </ul>
      </div>);
  }
});
