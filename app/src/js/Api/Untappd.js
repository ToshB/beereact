'use strict';
var UntappdAuth = require('./UntappdAuth');

var url = require('url');
var _ = require('lodash');
var http = require('http');
var q = require('q');
var querystring = require('querystring');

var Untappd = function () {
  var apiUrlBase = 'https://api.untappd.com/v4';
  var accessToken;

  function getRequestObj(path, params) {
    var query = querystring.stringify(_.extend({}, params, {
      access_token: accessToken
    }));
    return {
      host: 'api.untappd.com',
      path: '/v4' + path + '?' + query,
      withCredentials: false
    };
  }

  function request(path, queryObj) {
    var deferred = q.defer(),
      req = getRequestObj(path, queryObj);

    deferred.resolve({
      response: {
        beers: {
          items: [
            {brewery: {brewery_name: 'bryggeri'}, beer: {beer_name: 'pils'}},
            {brewery: {brewery_name: 'bryggeri'}, beer: {beer_name: 'pils'}},
            {brewery: {brewery_name: 'bryggeri'}, beer: {beer_name: 'pils'}},
            {brewery: {brewery_name: 'bryggeri'}, beer: {beer_name: 'pils'}},
            {brewery: {brewery_name: 'bryggeri'}, beer: {beer_name: 'pils'}}
          ]
        }
      }
    });
    //http.get(req, function (res) {
    //  var data = '';
    //  res.on('data', function (buf) {
    //    data += buf;
    //  });
    //
    //  res.on('end', function () {
    //    deferred.resolve(JSON.parse(data));
    //  });
    //});
    return deferred.promise;
  }

  function addAccessToken(params) {
    params['access_token'] = accessToken;
    return params;
  }

  Untappd.prototype.authenticate = function () {
    var authentication = new UntappdAuth();
    accessToken = authentication.authenticate();
  };


  Untappd.prototype.search = function (query) {
    return request('/search/beer', {q: query})
      .then(function (data) {
        return data.response.beers;
      })
  };

  Untappd.prototype.beerInfo = function (bid) {
    return request('/beer/info/' + bid)
      .then(function (data) {
        return data.response.beer;
      });
  };

  Untappd.prototype.getRecentCheckins = function () {
    return request('/user/checkins');
  };
};

module.exports = Untappd;
