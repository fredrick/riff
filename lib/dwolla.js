(function() {
  "use strict";

  var util = require('util'),
      querystring = require('querystring'),
      request = require('request');

  function Dwolla(config, req) {
    this.config = config;

    if (!req) {
      req = request;
    }
    this.req = req;

    this.authenticate = function() {
      return util.format('%s/oauth/v2/authenticate?%s',
        config['dwolla']['uri'],
        querystring.stringify({
          client_id: config['dwolla']['key'],
          response_type: "code",
          redirect_uri: config['dwolla']['redirect'],
          scope: config['dwolla']['scope'].join('|')
        })
      );
    }

    this.logout = function(callback) {
      return req.get({
        uri: util.format('%s/logout', config['dwolla']['uri'])
      }, callback);
    }

    this.token = function(code, callback) {
      return req.get({
        uri: util.format('%s/oauth/v2/token', config['dwolla']['uri']),
        qs: {
          client_id: config['dwolla']['key'],
          client_secret: config['dwolla']['secret'],
          grant_type: 'authorization_code',
          redirect_uri: config['dwolla']['redirect'],
          code: code
        },
        json: true
      }, callback);
    }
  }

  if (typeof window !== 'undefined') {
    window.Dwolla = (typeof window.Dwolla === 'undefined' ? {} : window.Dwolla);
    window.Dwolla = Dwolla;
  }
  else {
    exports = module.exports = Dwolla;
  }
})();
