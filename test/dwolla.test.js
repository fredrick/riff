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
    accessToken = 'access_token',
    accountKey = '812-160-3226',
    pin = 1234,
    amount = 1.25;

function RequestSpy() {
  this.get = function(request) {
    return request;
  };
  this.post = function(request) {
    return request;
  };
}

vows.describe('Dwolla').addBatch({
  'when authenticating': {
    topic: new Dwolla(config).authenticate(),
    'returns OAuth permission uri': function(uri) {
      assert.equal(uri, 'http://uat.dwolla.com/oauth/v2/authenticate?client_id=key&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A9000&scope=AccountInfoFull%7CSend%7CRequest');
    },
  },
  'when logging out': {
    topic: new Dwolla(config, new RequestSpy()).logout(),
    'logs out': function(request) {
      assert.deepEqual(request, {
        uri: 'http://uat.dwolla.com/logout'
      });
    }
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
        },
        json: true
      });
    }
  },
  'when getting an avatar': {
    topic: new Dwolla(config).avatar(accountKey),
    'returns avatar uri': function(uri) {
      assert.equal(uri, 'http://uat.dwolla.com/avatars/' + accountKey);
    },
  },
  'when getting a balance': {
    topic: new Dwolla(config, new RequestSpy()).balance(accessToken),
    'requests balance with GET': function(request) {
      assert.deepEqual(request, {
          uri: 'http://uat.dwolla.com/oauth/rest/balance',
          qs: {
            oauth_token: accessToken
          },
          json: true
        });
    }
  },
  'when getting a user': {
    topic: new Dwolla(config, new RequestSpy()).user(accessToken),
    'requests user with GET': function(request) {
      assert.deepEqual(request, {
        uri: 'http://uat.dwolla.com/oauth/rest/users',
        qs: {
          oauth_token: accessToken
        },
        json: true
      });
    }
  },
  'when sending a transaction': {
    topic: new Dwolla(config, new RequestSpy()).send(accessToken, {
      pin: pin,
      destinationId: accountKey,
      amount: amount
    }),
    'requests send with POST': function(request) {
      assert.deepEqual(request, {
        uri: 'http://uat.dwolla.com/oauth/rest/transactions/send',
        body: JSON.stringify({
          pin: pin,
          destinationId: accountKey,
          amount: amount,
          oauth_token: accessToken
        }),
        json: true
      });
    }
  }
}).export(module);
