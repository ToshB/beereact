'use strict';
var q = require('q');

module.exports = {
  getData: function (){
    var deferred = q.defer();
    deferred.resolve([
      {id: 1, beer: {brewery: {brewery_name: 'bryggeri'}, beer: {beer_name: 'pils'}}},
      {id: 2, beer: {brewery: {brewery_name: 'bryggeri'}, beer: {beer_name: 'pils'}}},
      {id: 3, beer: {brewery: {brewery_name: 'bryggeri'}, beer: {beer_name: 'pils'}}}
    ])
    return deferred.promise;
  }
}
