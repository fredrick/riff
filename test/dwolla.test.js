var vows = require('vows'),
    assert = require('assert');

var Dwolla = require('../lib/dwolla');

var config = {
  "dwolla": {
    "uri": "http://uat.dwolla.com",
    "key": "key",
    "secret": "secret",
    "scope": ["AccountInfoFull", "Send", "Request"],
    "redirect": "http://localhost:9000"
  }
};

var code = 'code',
    access_token = 'access_token';

function RequestSpy() {
  this.get = function(request) {
    return request;
  };
}

vows.describe('Dwolla').addBatch({
  'when authenticating': {
    topic: new Dwolla(config).authenticate(),
    'returns OAuth permission uri': function(uri) {
      assert.equal(uri, 'http://uat.dwolla.com/oauth/v2/authenticate?client_id=key&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A9000&scope=AccountInfoFull%7CSend%7CRequest');
    },
    'when getting a token': {
      topic: new Dwolla(config, new RequestSpy()).token(code),
      'requests token with GET': function(request) {
        assert.deepEqual(request, {
          uri: 'http://uat.dwolla.com/oauth/v2/token',
          qs: {
            client_id: config['dwolla']['key'],
            client_secret: config['dwolla']['secret'],
            grant_type: 'authorization_code',
            redirect_uri: config['dwolla']['redirect'],
            code: code
          }
        });
      }
    }
  }
}).export(module);
