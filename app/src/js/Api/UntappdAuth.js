'use strict';

var UntappdAuth = function () {
  var clientId = 'F96DBE045AC0A7578D404A1052C754CFE50CA477';
  var authenticationUrlBase = 'https://untappd.com/oauth/authenticate/';

  function getAccessToken() {
    var loc = window.location.href;
    var params = loc.split('#access_token=');
    if (params.length > 1) {
      // TODO: Remove hash from url
      return params[1];
    }
  }

  var accessToken = getAccessToken();
  if (accessToken) {
    console.log('Untappd authenticated with token: ' + accessToken);
  }
  else {
    console.log('Untappd is not authenticated');
  }

  UntappdAuth.prototype.authenticate = function () {
    if (accessToken) {
      return accessToken;
    }
    var url = authenticationUrlBase
      + '?client_id=' + clientId + '&'
      + 'response_type=token' + '&'
      + 'redirect_url=' + window.location;

    window.location.replace(url);
  };
};

module.exports = UntappdAuth;
